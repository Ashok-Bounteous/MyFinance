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
  profileForm!: FormGroup;

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

    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
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
        this.router.navigateByUrl('/profile', { replaceUrl: true });
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



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastController, AlertController, LoadingController } from '@ionic/angular';
// import { AuthService } from 'src/app/services/userauth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
// })
// export class SignupPage implements OnInit {
//   signupForm!: FormGroup;
//   profileForm!: FormGroup;
//   bankAccountForm!: FormGroup;
//   activeStep = 0;
//   user: import("@angular/fire/auth").UserCredential |any;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private toastController: ToastController,
//     private alertController: AlertController,
//     private loadingController: LoadingController,
//     private authService: AuthService,
//   ) {}

//   ngOnInit() {
//     this.signupForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
//     });

//     this.profileForm = this.fb.group({
//       name: ['', [Validators.required]],
//       phone: ['', [Validators.required]],
//       address: ['', [Validators.required]],
//     });

//     this.bankAccountForm = this.fb.group({
//       accountNumber: ['', [Validators.required]],
//       bankName: ['', [Validators.required]],
//     });
//   }

//   async register(nextCallback: Function) {
//     if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
//       this.showAlert('Password Mismatch', 'Passwords do not match!');
//       return;
//     }

//     const loading = await this.loadingController.create();
//     await loading.present();

//     try {
//       const { email, password } = this.signupForm.value;
//       this.user = await this.authService.register({ email, password });
//       await loading.dismiss();

//       if (this.user) {
//         await this.showToast('Registration successful!');
//         nextCallback(); // Progress to next step
//       } else {
//         this.showAlert('Registration failed', 'Please try again!');
//       }
//     } catch (error) {
//       await loading.dismiss();
//       this.showAlert('Registration failed', `${error}`);
//     }
//   }

//   async getProfileDetails(nextCallback: Function) {
//     const loading = await this.loadingController.create();
//     await loading.present();

//     try {
//       const profile = this.profileForm.value;
//       const profileData: any = await this.authService.storeUserProfile(this.user.uid,profile);
//       await loading.dismiss();

//       if (profileData) {
//         await this.showToast('Profile details saved successfully!');
//         nextCallback(); // Progress to next step
//       } else {
//         this.showAlert('Failed to save profile', 'Please try again!');
//       }
//     } catch (error) {
//       await loading.dismiss();
//       this.showAlert('Failed to save profile', `${error}`);
//     }
//   }

//   async addBankAccount() {
//     const loading = await this.loadingController.create();
//     await loading.present();

//     try {
//       const bankAccount = this.bankAccountForm.value;
//       const bankAccountData:any = await this.authService.addBankAccount(bankAccount);
//       await loading.dismiss();

//       if (bankAccountData) {
//         await this.showToast('Bank account added successfully!');
//         // Add further logic if needed, like navigating to a different page
//       } else {
//         this.showAlert('Failed to add bank account', 'Please try again!');
//       }
//     } catch (error) {
//       await loading.dismiss();
//       this.showAlert('Failed to add bank account', `${error}`);
//     }
//   }

//   async showToast(message: string) {
//     const toast = await this.toastController.create({
//       message,
//       duration: 2000,
//       position: 'top',
//       color: 'success',
//     });
//     await toast.present();
//   }

//   async showAlert(header: string, message: string) {
//     const alert = await this.alertController.create({
//       header,
//       message,
//       buttons: ['OK'],
//     });
//     await alert.present();
//   }
// }
