// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage {
//   email: string = '';
//   password: string = '';
//   confirmPassword: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   signup() {
//     if (this.password !== this.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     const signupData = {
//       email: this.email,
//       password: this.password,
//     };

//     this.http.post('https://public-api.example.com/signup', signupData).subscribe(
//       (response) => {
//         console.log(response);
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.showAlert('Password Mismatch', 'Passwords do not match!');
      return;
    }

    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const { email, password } = this.signupForm.value;
      const user = await this.authService.register({ email, password });
      await loading.dismiss();

      if (user) {
        await this.showToast('Registration successful!');
        this.router.navigateByUrl('/task-manager', { replaceUrl: true });
      } else {
        this.showAlert('Registration failed', 'Please try again!');
      }
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Registration failed', `${error}`);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
