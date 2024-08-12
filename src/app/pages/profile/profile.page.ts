import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/userauth.service'; // Adjust import path as needed

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any = {
    name: '',
    age: '',
    dob: '',
    address: '',
    bankAccounts: []
  };
  totalBalance: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const userProfile = this.authService.getUserProfile();
      console.log("User profile : ",userProfile)
      this.profile = userProfile;
      this.totalBalance = this.calculateTotalBalance();
    } catch (error) {
      console.error('Error loading profile', error);
    }
  }

  calculateTotalBalance() {
    return this.profile.bankAccounts.reduce((sum: number, account: any) => sum + account.balance, 0);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
