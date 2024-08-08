// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from 'src/app/services/userauth.service';
// import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/store/models/transaction.model';
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-past-transactions',
//   templateUrl: './past-transactions.page.html',
//   styleUrls: ['./past-transactions.page.scss'],
// })
// export class PastTransactionsPage implements OnInit, OnDestroy {
//   transactions: Transaction[] = [];
//   filteredTransactions: Transaction[] = [];
//   statuses = ['Pending', 'Completed', 'Failed'];
//   transactionTypes = ['income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'];
//   selectedStatus: string[] = [];
//   selectedTransactionTypes: string[] = [];
//   selectedDateRange: { lower: Date, upper: Date } = { lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), upper: new Date() };
//   selectedChips: string[] = [];
//   authSubscription!: Subscription;

//   // Chart related properties
//   chartData: any[] = [];
//   chartLabels: string[] = [];
//   chartOptions: any = {
//     responsive: true,
//   };
//   chartColors: any[] = [
//     { backgroundColor: 'rgba(30, 136, 229, 0.6)' },
//     { backgroundColor: 'rgba(255, 87, 34, 0.6)' }
//   ];
//   chartLegend: boolean = true;
//   chartType: string = 'bar';

//   constructor(
//     private authService: AuthService,
//     private transactionService: TransactionService,
//     private router : Router
//   ) {}

//   ngOnInit() {
//     this.authSubscription = this.authService.getUserProfile().subscribe(user => {
//       if (user) {
//         this.loadTransactions(user.uid);
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
//       this.filteredTransactions = data;
//       this.updateChart();
//     });
//   }

//   filterTransactions() {
//     this.filteredTransactions = this.transactions.filter(transaction => {
//       const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
//       const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
//       const matchesDateRange = new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) && new Date(transaction.transactionDate) <= new Date(this.selectedDateRange.upper);

//       return matchesStatus && matchesType && matchesDateRange;
//     });

//     this.updateChart();
//   }

//   removeChip(chip: string) {
//     const index = this.selectedChips.indexOf(chip);
//     if (index >= 0) {
//       this.selectedChips.splice(index, 1);
//       this.filterTransactions();
//     }
//   }

//   updateChart() {
//     const incomeTransactions = this.filteredTransactions.filter(transaction => transaction.transactionType === 'income');
//     const expenseTransactions = this.filteredTransactions.filter(transaction => transaction.transactionType === 'expense');

//     const incomeAmounts = incomeTransactions.map(transaction => transaction.amount);
//     const expenseAmounts = expenseTransactions.map(transaction => transaction.amount);

//     const totalIncome = incomeAmounts.reduce((acc, value) => acc + value, 0);
//     const totalExpenses = expenseAmounts.reduce((acc, value) => acc + value, 0);

//     this.chartData = [
//       { data: incomeAmounts, label: 'Income' },
//       { data: expenseAmounts, label: 'Expenses' }
//     ];

//     this.chartLabels = this.filteredTransactions.map(transaction => transaction.transactionDate.toString());
//   }

//   async deleteTransaction(id: string) {
//     const user = await this.authService.getUserProfile().toPromise();
//     if (user) {
//       this.transactionService.deleteTransaction(id, user.uid).then(() => {
//         this.loadTransactions(user.uid);
//       });
//     }
//   }

//   openTransactionForm() {
//     // Navigate to the TransactionsFormPage
//     // This can be done using Angular Router or Ionic NavController
//   this.router.navigate(['/transactions-form']);
//   }
// }



import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/userauth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/store/models/transaction.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.page.html',
  styleUrls: ['./past-transactions.page.scss'],
})
export class PastTransactionsPage implements OnInit, OnDestroy, OnChanges {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  statuses = ['Pending', 'Completed', 'Failed'];
  transactionTypes = ['income', 'expense', 'transfer', 'investment', 'savings', 'debt payment'];
  selectedStatus: string[] = [];
  selectedTransactionTypes: string[] = [];
  selectedDateRange: { lower: Date, upper: Date } = { lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), upper: new Date() };
  selectedChips: string[] = [];
  authSubscription!: Subscription;

  // Chart related properties
  private chart: Chart | undefined;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService.getUserProfile().subscribe(user => {
      if (user) {
        this.loadTransactions(user.uid);
      } else {
        console.error('User not authenticated');
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.destroyChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredTransactions']) {
      this.updateChart();
    }
  }

  loadTransactions(uid: string) {
    this.transactionService.getTransactions(uid).subscribe((data) => {
      this.transactions = data;
      this.filteredTransactions = data;
      this.updateChart();
    });
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
      const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
      const matchesDateRange = new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) && new Date(this.selectedDateRange.upper) >= new Date(transaction.transactionDate);

      return matchesStatus && matchesType && matchesDateRange;
    });

    this.updateChart();
  }

  removeChip(chip: string) {
    const index = this.selectedChips.indexOf(chip);
    if (index >= 0) {
      this.selectedChips.splice(index, 1);
      this.filterTransactions();
    }
  }

  updateChart() {
    const incomeTransactions = this.filteredTransactions.filter(transaction => transaction.transactionType === 'income');
    const expenseTransactions = this.filteredTransactions.filter(transaction => transaction.transactionType === 'expense');

    const incomeAmounts = incomeTransactions.map(transaction => transaction.amount);
    const expenseAmounts = expenseTransactions.map(transaction => transaction.amount);

    const dates = this.filteredTransactions.map(transaction => new Date(transaction.transactionDate));

    this.destroyChart();

    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Income',
            data: incomeAmounts,
            backgroundColor: 'rgba(30, 136, 229, 0.6)',
          },
          {
            label: 'Expenses',
            data: expenseAmounts,
            backgroundColor: 'rgba(255, 87, 34, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: this.getTimeSeriesUnit(dates),
              displayFormats: {
                day: 'MMM dd, yyyy',
                week: 'MMM dd, yyyy',
                month: 'MMM dd, yyyy',
                quarter: 'MMM dd, yyyy',
                year: 'MMM dd, yyyy'
              },
              tooltipFormat: 'PP',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Value',
            },
            beginAtZero: false,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Transaction History',
          },
        },
      },
    });
  }

  getTimeSeriesUnit(dates: Date[]): 'day' | 'week' | 'month' | 'quarter' | 'year' {
    if (dates.length < 2) return 'day';

    const timeDiff = dates[1].getTime() - dates[0].getTime();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay; // Approximation
    const oneYear = 365 * oneDay; // Approximation

    if (timeDiff <= oneDay) return 'day';
    if (timeDiff <= oneWeek) return 'week';
    if (timeDiff <= oneMonth) return 'month';
    if (timeDiff <= oneYear) return 'quarter';

    return 'year';
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }

  async deleteTransaction(id: string | undefined) {
    if (id) {
      const user = await this.authService.getUserProfile().toPromise();
      if (user) {
        this.transactionService.deleteTransaction(id, user.uid).then(() => {
          this.loadTransactions(user.uid);
        });
      }
    } else {
      console.error('Transaction id is undefined');
    }
  }

  openTransactionForm() {
    this.router.navigate(['/transactions-form']);
  }
}
