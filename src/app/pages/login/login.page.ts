// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { ToastController } from '@ionic/angular';
// import { LoginState } from 'src/app/store/models/LoginState';
// import { login, recoverEmailPassword } from '../../store/actions/auth.actions';
// import { show, hide } from '../../store/actions/loading.actions';
// import { selectAuthError, selectIsLoggedIn, selectIsLoggingIn } from '../../store/selectors/auth.selectors';
// import { selectIsLoading } from '../../store/selectors/loading.selectors';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {
//   loginForm: FormGroup;
//   errorMessage$: Observable<string>;
//   isLoggedIn$: Observable<boolean>;
//   isLoggingIn$: Observable<boolean>;
//   isLoading$: Observable<boolean>;

//   constructor(
//     private fb: FormBuilder,
//     private store: Store<{ auth: LoginState }>,
//     private router: Router,
//     private toastController: ToastController
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });

//     this.errorMessage$ = this.store.select(selectAuthError);
//     this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
//     this.isLoggingIn$ = this.store.select(selectIsLoggingIn);
//     this.isLoading$ = this.store.select(selectIsLoading);
//   }

//   ngOnInit() {
//     this.errorMessage$.subscribe((error) => {
//       if (error) {
//         console.log("Error: ", error);
//         this.presentToast(error, 'danger');
//         this.store.dispatch(hide());
//       }
//     });

//     this.isLoggedIn$.subscribe((isLoggedIn) => {
//       if (isLoggedIn) {
//         console.log("Login successful");
//         this.presentToast('Login successful', 'success');
//         setTimeout(() => {
//           this.router.navigate(['/company-data']); // navigate to the desired page
//           this.store.dispatch(hide());
//         }, 3000); // stop spinner after 3 seconds
//       }
//     });

//     this.isLoggingIn$.subscribe((isLoggingIn) => {
//       if (isLoggingIn) {
//         this.store.dispatch(show());
//       }
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       this.store.dispatch(login({ email, password }));
//     } else {
//       this.presentToast('Please enter valid login details', 'warning');
//     }
//   }

//   recoverPassword() {
//     const email = this.loginForm.get('email')?.value;
//     if (email) {
//       this.store.dispatch(show());
//       this.store.dispatch(recoverEmailPassword({ email }));
//       this.presentToast('Password recovery email sent', 'info');
//     } else {
//       this.presentToast('Please enter a valid email', 'warning');
//     }
//   }

//   async presentToast(message: string, color: string) {
//     const toast = await this.toastController.create({
//       message,
//       color,
//       duration: 2000,
//     });
//     toast.present();
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/userauth.service';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private platform: Platform
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Configure the keyboard settings only on mobile devices
    if (this.platform.is('hybrid')) {
      Keyboard.setAccessoryBarVisible({ isVisible: true });
      Keyboard.setScroll({ isDisabled: false });
    }
  }

  register() {
    this.router.navigate(['signup']);
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user = await this.authService.login(this.loginForm.value);
      await loading.dismiss();

      if (user) {
        await this.showToast('Login successful!');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Login failed', 'Please try again!');
      }
    } catch (error) {
      await loading.dismiss();
      this.showAlert('Login failed', `${error}`);
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

  recoverPassword() {
    // Implement password recovery logic here
  }
}
