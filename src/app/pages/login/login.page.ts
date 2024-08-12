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
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
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
