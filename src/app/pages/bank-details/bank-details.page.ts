import { Component, OnInit } from '@angular/core';
import { BankAccountService } from 'src/app/services/bank-account.service'; // Adjust the path as needed
import { AuthService } from 'src/app/services/userauth.service'; // Adjust the path as needed
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit {
  accounts: any[] = []; // Replace `any` with the appropriate interface/type for your account data

  constructor(private bankAccountService: BankAccountService, private authService: AuthService) {}

  ngOnInit() {
    this.loadBankAccounts();
  }

  loadBankAccounts() {
    this.authService.getUserProfile().subscribe(user => {
      if (user && user.uid) {
        this.bankAccountService.getBankAccountDetails(user.uid).subscribe(data => {
          this.accounts = data;
        });
      } else {
        console.error('User not authenticated');
      }
    });
  }

  editAccount(account: any) {
    // Logic to edit account details
    console.log('Edit account:', account);
  }
}
