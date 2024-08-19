// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/store/models/transaction.model';
// import { BankAccount } from 'src/app/store/models/bank-account.model';
// import { AuthService } from 'src/app/services/userauth.service';
// import { Subscription, firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-transactions',
//   templateUrl: './transactions.page.html',
//   styleUrls: ['./transactions.page.scss'],
// })
// export class TransactionsPage implements OnInit, OnDestroy {
//   transactions: Transaction[] = [];
//   bankAccounts: BankAccount[] = [];
//   transactionForm!: FormGroup;
//   transactionTypes = ['income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'];
//   expenseCategories = ['Utilities', 'Rent/Mortgage Payments', 'Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Insurance', 'Education', 'Healthcare', 'Clothing and Personal Care', 'Subscriptions', 'Loans'];
//   incomeCategories = ['Salary/Wages', 'Bonuses', 'Interest Income', 'Dividends', 'Rental Income', 'Freelance/Consulting Income', 'Investment Returns'];
//   transferCategories = ['Internal Transfer', 'External Transfer'];
//   investmentCategories = ['Stock Purchases', 'Stock Sales', 'Mutual Fund Investments', 'Real Estate Investments', 'Cryptocurrency Transactions'];
//   savingsCategories = ['Savings Deposit', 'Savings Withdrawal'];
//   debtCategories = ['Credit Card Payment', 'Loan Repayment', 'Mortgage Payment'];
//   authSubscription!: Subscription;

//   constructor(
//     private transactionService: TransactionService,
//     private authService: AuthService,
//     private fb: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.transactionForm = this.fb.group({
//       accountId: ['', Validators.required],
//       transactionDate: ['', Validators.required],
//       transactionType: ['', Validators.required],
//       category: ['', Validators.required],
//       amount: ['', [Validators.required, Validators.min(0)]],
//       description: [''],
//       tags: [''],
//       recurring: [false],
//       status: ['Pending', Validators.required]
//     });

//     this.authSubscription = this.authService.getUserProfile().subscribe(user => {
//       if (user) {
//         this.loadTransactions(user.uid);
//         this.loadBankAccounts(user.uid);
//       } else {
//         console.error('User not authenticated');
//       }
//     });
//   }

//   ngOnDestroy() {
//     if (this.authSubscription) {
//       this.authSubscription.unsubscribe();
//     }
//   }

//   loadTransactions(uid: string) {
//     this.transactionService.getTransactions(uid).subscribe((data) => {
//       this.transactions = data;
//     });
//   }

//   loadBankAccounts(uid: string) {
//     this.transactionService.getBankAccounts(uid).subscribe((data) => {
//       this.bankAccounts = data;
//     });
//   }

//   async onSubmit() {
//     console.log("Came to onSubmit! Transaction form valid state:", this.transactionForm.valid);
//     if (this.transactionForm.valid) {
//       try {
//         const user = await firstValueFrom(this.authService.getUserProfile());
//         console.log("User:", user);
//         if (user) {
//           const newTransaction: Transaction = {
//             ...this.transactionForm.value,
//             tags: this.transactionForm.value.tags.split(',').map((tag: string) => tag.trim())
//           };
//           console.log("Transaction to add:", newTransaction);
//           await this.transactionService.addTransaction(newTransaction, user.uid);
//           console.log("Transaction added successfully.");
//           this.transactionForm.reset();
//           this.loadTransactions(user.uid);
//         } else {
//           console.error("User is not authenticated.");
//         }
//       } catch (error) {
//         console.error("Error during transaction submission:", error);
//       }
//     }
//   }

//   async deleteTransaction(id: string) {
//     try {
//       const user = await firstValueFrom(this.authService.getUserProfile());
//       if (user) {
//         await this.transactionService.deleteTransaction(id, user.uid);
//         this.loadTransactions(user.uid);
//       }
//     } catch (error) {
//       console.error("Error during transaction deletion:", error);
//     }
//   }

//   getCategoryOptions() {
//     switch (this.transactionForm.value.transactionType) {
//       case 'income':
//         return this.incomeCategories;
//       case 'expense':
//         return this.expenseCategories;
//       case 'transfer':
//         return this.transferCategories;
//       case 'investment':
//         return this.investmentCategories;
//       case 'savings':
//         return this.savingsCategories;
//       case 'debt payment':
//         return this.debtCategories;
//       default:
//         return [];
//     }
//   }
// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/store/models/transaction.model';
import { BankAccount } from 'src/app/store/models/bank-account.model';
import { AuthService } from 'src/app/services/userauth.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { TreeNode } from 'primeng/api';  // Import TreeNode for org chart

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  bankAccounts: BankAccount[] = [];
  transactionForm!: FormGroup;
  transactionTypes = ['income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'];
  statusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Failed', value: 'Failed' }
  ];
    // transactionTypes = ['income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'];
  expenseCategories = ['Utilities', 'Rent/Mortgage Payments', 'Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Insurance', 'Education', 'Healthcare', 'Clothing and Personal Care', 'Subscriptions', 'Loans'];
  incomeCategories = ['Salary/Wages', 'Bonuses', 'Interest Income', 'Dividends', 'Rental Income', 'Freelance/Consulting Income', 'Investment Returns'];
  transferCategories = ['Internal Transfer', 'External Transfer'];
  investmentCategories = ['Stock Purchases', 'Stock Sales', 'Mutual Fund Investments', 'Real Estate Investments', 'Cryptocurrency Transactions'];
  savingsCategories = ['Savings Deposit', 'Savings Withdrawal'];
  debtCategories = ['Credit Card Payment', 'Loan Repayment', 'Mortgage Payment'];
  authSubscription!: Subscription;
  categoryOptions: any[] = [];  // Updated to dynamic categories
  categoryTree: TreeNode[] = [];  // For org chart
  // authSubscription!: Subscription;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      transactionDate: ['', Validators.required],
      transactionType: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      tags: [''],
      recurring: [false],
      status: ['Pending', Validators.required]
    });

    this.authSubscription = this.authService.getUserProfile().subscribe(user => {
      if (user) {
        this.loadTransactions(user.uid);
        this.loadBankAccounts(user.uid);
        this.setupCategoryTree();
      } else {
        console.error('User not authenticated');
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  loadTransactions(uid: string) {
    this.transactionService.getTransactions(uid).subscribe((data) => {
      this.transactions = data;
    });
  }

  loadBankAccounts(uid: string) {
    this.transactionService.getBankAccounts(uid).subscribe((data) => {
      this.bankAccounts = data;
    });
  }

  async onSubmit() {
    if (this.transactionForm.valid) {
      try {
        const user = await firstValueFrom(this.authService.getUserProfile());
        if (user) {
          const newTransaction: Transaction = {
            ...this.transactionForm.value,
            tags: this.transactionForm.value.tags.split(',').map((tag: string) => tag.trim())
          };
          await this.transactionService.addTransaction(newTransaction, user.uid);
          this.transactionForm.reset();
          this.loadTransactions(user.uid);
        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error during transaction submission:", error);
      }
    }
  }

  async deleteTransaction(id: string) {
    try {
      const user = await firstValueFrom(this.authService.getUserProfile());
      if (user) {
        await this.transactionService.deleteTransaction(id, user.uid);
        this.loadTransactions(user.uid);
      }
    } catch (error) {
      console.error("Error during transaction deletion:", error);
    }
  }

  getCategoryOptions() {
    switch (this.transactionForm.value.transactionType) {
      case 'income':
        return this.incomeCategories;
      case 'expense':
        return this.expenseCategories;
      case 'transfer':
        return this.transferCategories;
      case 'investment':
        return this.investmentCategories;
      case 'savings':
        return this.savingsCategories;
      case 'debt payment':
        return this.debtCategories;
      default:
        return [];
    }
  }

  updateCategoryOptions() {
    this.categoryOptions = this.getCategoryOptions().map(cat => ({ label: cat, value: cat }));
  }

  setupCategoryTree() {
    this.categoryTree = [
      {
        label: 'Transaction Types',
        expanded: false,
        children: [
          {
            label: 'Expenses',
            expanded: false,
            children: this.expenseCategories.map(cat => ({ label: cat }))
          },
          {
            label: 'Income',
            expanded: false,
            children: this.incomeCategories.map(cat => ({ label: cat }))
          },
          {
            label: 'Transfer',
            expanded: false,
            children: this.transferCategories.map(cat => ({ label: cat }))
          },
          {
            label: 'Investment',
            expanded: false,
            children: this.investmentCategories.map(cat => ({ label: cat }))
          },
          {
            label: 'Savings',
            expanded: false,
            children: this.savingsCategories.map(cat => ({ label: cat }))
          },
          {
            label: 'Debt Payment',
            expanded: false,
            children: this.debtCategories.map(cat => ({ label: cat }))
          }
        ]
      },
      
    ];
  }
}
