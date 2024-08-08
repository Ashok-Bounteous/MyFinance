import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.page.html',
  styleUrls: ['./add-bank-account.page.scss'],
})
export class AddBankAccountPage implements OnInit {
  bankAccountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.bankAccountForm = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(2)]],
      bankName: ['', [Validators.required, Validators.minLength(2)]],
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
      ifscCode: ['', [Validators.required, Validators.minLength(11), Validators.pattern('^[A-Za-z]{4}[a-zA-Z0-9]{7}$')]],
      branch: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async onSubmit() {
    if (this.bankAccountForm.invalid) {
      this.showToast('Please fill out all fields correctly');
      return;
    }

    const loading = await this.loadingController.create();
    await loading.present();

    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const uid = user.uid;
        const bankAccount = this.bankAccountForm.value;
        await this.db.list(`users/bankHistory/${uid}`).push(bankAccount);
        await loading.dismiss();
        this.showToast('Bank account added successfully');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        await loading.dismiss();
        this.showToast('User not authenticated');
      }
    } catch (error) {
      await loading.dismiss();
      this.showToast(`Error: ${error}`);
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
}


// if (uid) {
//   this.db.list(`users/bankHistory/${uid}`).push(this.bankAccountForm.value)
//     .then(() => {
//       console.log('Bank account added successfully');
//       this.router.navigate(['/some-other-page']); // Navigate to another page if needed
//     })
//     .catch(error => {
//       console.error('Error adding bank account: ', error);
//     });