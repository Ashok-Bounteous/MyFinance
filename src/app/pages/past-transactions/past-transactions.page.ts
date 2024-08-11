// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { AuthService } from 'src/app/services/userauth.service';
// // import { TransactionService } from 'src/app/services/transaction.service';
// // import { Transaction } from 'src/app/store/models/transaction.model';
// // import { Subscription } from 'rxjs';
// // import { Router } from '@angular/router';
// // import { Chart, registerables, ChartType } from 'chart.js';
// // // import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

// // interface AutoCompleteCompleteEvent {
// //   originalEvent: Event;
// //   query: string;
// // }

// // Chart.register(...registerables);

// // @Component({
// //   selector: 'app-past-transactions',
// //   templateUrl: './past-transactions.page.html',
// //   styleUrls: ['./past-transactions.page.scss'],
// // })
// // export class PastTransactionsPage implements OnInit, OnDestroy {
// //   transactions: Transaction[] = [];
// //   filteredTransactions: Transaction[] = [];
// //   statuses: any[] = [
// //     { label: 'Pending', value: 'Pending' },
// //     { label: 'Completed', value: 'Completed' },
// //     { label: 'Failed', value: 'Failed' },
// //     { label: 'All', value: 'all'},
// //   ];
// //   transactionTypes: any[] = [
// //     { label: 'Income', value: 'income' },
// //     { label: 'Expense', value: 'expense' },
// //     { label: 'Transfer', value: 'transfer' },
// //     { label: 'Investment', value: 'investment' },
// //     { label: 'Savings', value: 'savings' },
// //     { label: 'Debt Payment', value: 'debt payment' },
// //     { label: 'All', value: 'all'},
// //   ];
// //   selectedStatus: any[] = [];
// //   selectedTransactionTypes: any[] = [];
// //   selectedDateRange: { lower: Date, upper: Date } = { lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), upper: new Date() };
// //   selectedTimeline: string = 'month';
// //   segment: string = 'table';
// //   selectedFilters: string[] = [];
// //   authSubscription!: Subscription;

// //   private pieChart: Chart<'pie', number[], string> | undefined;
// //   private barChart: Chart<'bar', number[], string> | undefined;

// //   constructor(
// //     private authService: AuthService,
// //     private transactionService: TransactionService,
// //     private router: Router
// //   ) {}

// //   ngOnInit() {
// //     this.authSubscription = this.authService.getUserProfile().subscribe(user => {
// //       if (user) {
// //         this.loadTransactions(user.uid);
// //       } else {
// //         console.error('User not authenticated');
// //       }
// //     });
// //   }

// //   ngOnDestroy() {
// //     if (this.authSubscription) {
// //       this.authSubscription.unsubscribe();
// //     }
// //     this.destroyCharts();
// //   }

// //   loadTransactions(uid: string) {
// //     this.transactionService.getTransactions(uid).subscribe((data) => {
// //       this.transactions = data;
// //       this.applyFilters();
// //     });
// //   }

// //   applyFilters() {
// //     this.filteredTransactions = this.transactions.filter(transaction => {
// //       const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
// //       const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
// //       const matchesDateRange = new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) && new Date(this.selectedDateRange.upper) >= new Date(transaction.transactionDate);

// //       return matchesStatus && matchesType && matchesDateRange;
// //     });

// //     this.updateCharts();
// //     this.updateSelectedFilters();
// //   }

// //   updateSelectedFilters() {
// //     this.selectedFilters = [];

// //     if (this.selectedStatus.length > 0) {
// //       this.selectedFilters.push(...this.selectedStatus.map(status => `Status: ${status}`));
// //     }

// //     if (this.selectedTransactionTypes.length > 0) {
// //       this.selectedFilters.push(...this.selectedTransactionTypes.map(type => `Type: ${type}`));
// //     }

// //     if (this.selectedDateRange.lower && this.selectedDateRange.upper) {
// //       this.selectedFilters.push(`Date Range: ${this.selectedDateRange.lower.toLocaleDateString()} - ${this.selectedDateRange.upper.toLocaleDateString()}`);
// //     }

// //     if (this.selectedFilters.length === 0) {
// //       this.selectedFilters.push('No filters applied');
// //     }
// //   }

// //   updateCharts() {
// //     this.destroyCharts();

// //     const chartData = this.getChartData();

// //     this.barChart = new Chart<'bar', number[], string>('transactionBarChart', {
// //       type: 'bar',
// //       data: {
// //         labels: chartData.labels,
// //         datasets: [{
// //           data: chartData.data,
// //           backgroundColor:[
// //             'rgba(255, 26, 104, 0.2)',
// //             'rgba(54, 162, 235, 0.2)',
// //             'rgba(255, 206, 86, 0.2)',
// //             'rgba(75, 192, 192, 0.2)',
// //             'rgba(153, 102, 255, 0.2)',
// //             'rgba(255, 159, 64, 0.2)',
// //             'rgba(0, 0, 0, 0.2)'
// //           ],
// //           borderColor: [
// //             'rgba(255, 26, 104, 1)',
// //             'rgba(54, 162, 235, 1)',
// //             'rgba(255, 206, 86, 1)',
// //             'rgba(75, 192, 192, 1)',
// //             'rgba(153, 102, 255, 1)',
// //             'rgba(255, 159, 64, 1)',
// //             'rgba(0, 0, 0, 1)'
// //           ],
// //           // borderColor: 'rgba(54, 162, 235, 1)',
// //           borderWidth: 1
// //         }]
// //       },
// //       options: {
// //         responsive: true,
// //         plugins: {
// //           tooltip: {
// //             callbacks: {
// //               label: (tooltipItem) => {
// //                 const totalAmount = this.filteredTransactions
// //                   .filter(transaction => transaction.transactionType === tooltipItem.label)
// //                   .reduce((sum, transaction) => sum + transaction.amount, 0);
// //                 return `${tooltipItem.label}: $${totalAmount.toFixed(2)}`;
// //               }
// //             }
// //           }
// //         }
// //       }
// //     });

// //     this.pieChart = new Chart<'pie', number[], string>('transactionPieChart', {
// //       type: 'pie',
// //       data: {
// //         labels: chartData.labels,
// //         datasets: [{
// //           data: chartData.data.map(val => (val / chartData.data.reduce((a, b) => a + b, 0)) * 100),
// //           backgroundColor: [
// //             'rgba(255, 26, 104, 0.2)',
// //             'rgba(54, 162, 235, 0.2)',
// //             'rgba(255, 206, 86, 0.2)',
// //             'rgba(75, 192, 192, 0.2)',
// //             'rgba(153, 102, 255, 0.2)',
// //             'rgba(255, 159, 64, 0.2)',
// //             'rgba(0, 0, 0, 0.2)'
// //           ],
// //           borderColor: [
// //             'rgba(255, 26, 104, 1)',
// //             'rgba(54, 162, 235, 1)',
// //             'rgba(255, 206, 86, 1)',
// //             'rgba(75, 192, 192, 1)',
// //             'rgba(153, 102, 255, 1)',
// //             'rgba(255, 159, 64, 1)',
// //             'rgba(0, 0, 0, 1)'
// //           ],
// //           borderWidth: 1
// //         }]
// //       },
// //       options: {
// //         responsive: true,
// //         plugins: {
// //           legend: {
// //             position: 'top',
// //           },
// //           tooltip: {
// //             callbacks: {
// //               label: (tooltipItem) => {
// //                 // Cast tooltipItem.raw to number
// //                 const percentage = tooltipItem.raw as number;
// //                 return `${tooltipItem.label}: ${percentage.toFixed(2)}%`;
// //               }
// //               // (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`
// //             }
// //           }
// //         }
// //       }
// //     });
// //   }

// //   getChartData() {
// //     const transactionTypeCounts = this.filteredTransactions.reduce((acc, transaction) => {
// //       acc[transaction.transactionType] = (acc[transaction.transactionType] || 0) + 1;
// //       return acc;
// //     }, {} as { [key: string]: number });

// //     return {
// //       labels: Object.keys(transactionTypeCounts),
// //       data: Object.values(transactionTypeCounts)
// //     };
// //   }

// //   destroyCharts() {
// //     if (this.pieChart) {
// //       this.pieChart.destroy();
// //     }
// //     if (this.barChart) {
// //       this.barChart.destroy();
// //     }
// //   }

// //   async deleteTransaction(id: string | undefined) {
// //     if (id) {
// //       const user = await this.authService.getUserProfile().toPromise();
// //       if (user) {
// //         this.transactionService.deleteTransaction(id, user.uid).then(() => {
// //           this.loadTransactions(user.uid);
// //         });
// //       }
// //     }
// //   }

// //   // search(event: any) {
// //   //   // Implement search logic for p-autoComplete here.
// //   //   const query = event.query.toLowerCase();

// //   //   // Filter statuses
// //   //   if (event.targetElement.placeholder === 'Select Status') {
// //   //     this.selectedStatus = this.statuses.filter(status => status.label.toLowerCase().includes(query));
// //   //     console.log("SelSta : ",this.selectedStatus)
// //   //   }

// //   //   // Filter transaction types
// //   //   if (event.targetElement.placeholder === 'Select Type') {
// //   //     this.selectedTransactionTypes = this.transactionTypes.filter(type => type.label.toLowerCase().includes(query));
// //   //     console.log("SelType : ",this.selectedTransactionTypes)

// //   //   }
// //   // }
// //   search(event: AutoCompleteCompleteEvent, field: string) {
// //     const query = event.query.toLowerCase();
  
// //     if (field === 'status') {
// //       this.selectedStatus = this.statuses.filter(status => status.label.toLowerCase().includes(query));
// //     } else if (field === 'type') {
// //       this.selectedTransactionTypes = this.transactionTypes.filter(type => type.label.toLowerCase().includes(query));
// //     }
// //   }
  
// // }



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from 'src/app/services/userauth.service';
// import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/store/models/transaction.model';
// import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
// import { Chart, registerables, ChartType } from 'chart.js';

// interface AutoCompleteCompleteEvent {
//   originalEvent: Event;
//   query: string;
// }

// Chart.register(...registerables);

// @Component({
//   selector: 'app-past-transactions',
//   templateUrl: './past-transactions.page.html',
//   styleUrls: ['./past-transactions.page.scss'],
// })
// export class PastTransactionsPage implements OnInit, OnDestroy {
//   transactions: Transaction[] = [];
//   filteredTransactions: Transaction[] = [];
//   statuses: any[] = [
//     { label: 'Pending', value: 'Pending' },
//     { label: 'Completed', value: 'Completed' },
//     { label: 'Failed', value: 'Failed' }
//   ];
//   transactionTypes: any[] = [
//     { label: 'Income', value: 'income' },
//     { label: 'Expense', value: 'expense' },
//     { label: 'Transfer', value: 'transfer' },
//     { label: 'Investment', value: 'investment' },
//     { label: 'Savings', value: 'savings' },
//     { label: 'Debt Payment', value: 'debt payment' }
//   ];
//   selectedStatus: any[] = []; // Initialize with empty array
//   selectedTransactionTypes: any[] = []; // Initialize with empty array
//   selectedDateRange: { lower: Date, upper: Date } = { lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), upper: new Date() };
//   selectedTimeline: string = 'month';
//   segment: string = 'table';
//   selectedFilters: string[] = [];
//   authSubscription!: Subscription;

//   private pieChart: Chart<'pie', number[], string> | undefined;
//   private barChart: Chart<'bar', number[], string> | undefined;

//   constructor(
//     private authService: AuthService,
//     private transactionService: TransactionService,
//     private router: Router
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
//     this.destroyCharts();
//   }

//   loadTransactions(uid: string) {
//     this.transactionService.getTransactions(uid).subscribe((data) => {
//       this.transactions = data;
//       this.applyFilters();
//     });
//   }

//   applyFilters() {
//     this.filteredTransactions = this.transactions.filter(transaction => {
//       const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
//       const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
//       const matchesDateRange = new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) && new Date(this.selectedDateRange.upper) >= new Date(transaction.transactionDate);

//       return matchesStatus && matchesType && matchesDateRange;
//     });

//     this.updateCharts();
//     this.updateSelectedFilters();
//   }

//   updateSelectedFilters() {
//     this.selectedFilters = [];

//     if (this.selectedStatus.length > 0) {
//       this.selectedFilters.push(...this.selectedStatus.map(status => `Status: ${status.label}`));
//     }

//     if (this.selectedTransactionTypes.length > 0) {
//       this.selectedFilters.push(...this.selectedTransactionTypes.map(type => `Type: ${type.label}`));
//     }

//     if (this.selectedDateRange.lower && this.selectedDateRange.upper) {
//       this.selectedFilters.push(`Date Range: ${this.selectedDateRange.lower.toLocaleDateString()} - ${this.selectedDateRange.upper.toLocaleDateString()}`);
//     }

//     if (this.selectedFilters.length === 0) {
//       this.selectedFilters.push('No filters applied');
//     }
//   }

//   updateCharts() {
//     this.destroyCharts();

//     const chartData = this.getChartData();

//     this.barChart = new Chart<'bar', number[], string>('transactionBarChart', {
//       type: 'bar',
//       data: {
//         labels: chartData.labels,
//         datasets: [{
//           data: chartData.data,
//           backgroundColor: [
//             'rgba(255, 26, 104, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(0, 0, 0, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 26, 104, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(0, 0, 0, 1)'
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) => {
//                 const totalAmount = this.filteredTransactions
//                   .filter(transaction => transaction.transactionType === tooltipItem.label)
//                   .reduce((sum, transaction) => sum + transaction.amount, 0);
//                 return `${tooltipItem.label}: $${totalAmount.toFixed(2)}`;
//               }
//             }
//           }
//         }
//       }
//     });

//     this.pieChart = new Chart<'pie', number[], string>('transactionPieChart', {
//       type: 'pie',
//       data: {
//         labels: chartData.labels,
//         datasets: [{
//           data: chartData.data.map(val => (val / chartData.data.reduce((a, b) => a + b, 0)) * 100),
//           backgroundColor: [
//             'rgba(255, 26, 104, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(0, 0, 0, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 26, 104, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//             'rgba(0, 0, 0, 1)'
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) => {
//                 // Cast tooltipItem.raw to number
//                 const percentage = tooltipItem.raw as number;
//                 return `${tooltipItem.label}: ${percentage.toFixed(2)}%`;
//               }
//             }
//           }
//         }
//       }
//     });
//   }

//   getChartData() {
//     const transactionTypeCounts = this.filteredTransactions.reduce((acc, transaction) => {
//       acc[transaction.transactionType] = (acc[transaction.transactionType] || 0) + 1;
//       return acc;
//     }, {} as { [key: string]: number });

//     return {
//       labels: Object.keys(transactionTypeCounts),
//       data: Object.values(transactionTypeCounts)
//     };
//   }

//   destroyCharts() {
//     if (this.pieChart) {
//       this.pieChart.destroy();
//     }
//     if (this.barChart) {
//       this.barChart.destroy();
//     }
//   }

//   search(event: AutoCompleteCompleteEvent) {
//     const query = event.query.toLowerCase();
//     const filteredStatuses = this.statuses.filter(status => status.label.toLowerCase().includes(query));
//     const filteredTransactionTypes = this.transactionTypes.filter(type => type.label.toLowerCase().includes(query));
    
//     this.statuses = filteredStatuses;
//     this.transactionTypes = filteredTransactionTypes;
//   }
// }


import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/userauth.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/store/models/transaction.model';
import { Subscription } from 'rxjs';
import { Chart, registerables, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { percentage } from '@angular/fire/storage';

Chart.register(...registerables);

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.page.html',
  styleUrls: ['./past-transactions.page.scss'],
})
export class PastTransactionsPage implements OnInit, OnDestroy, AfterViewInit {
    statuses: any[] = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Failed', value: 'Failed' }
  ];
  transactionTypes: any[] = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Transfer', value: 'transfer' },
    { label: 'Investment', value: 'investment' },
    { label: 'Savings', value: 'savings' },
    { label: 'Debt Payment', value: 'debt payment' }
  ];
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedStatus: any[] = [];
  selectedTransactionTypes: any[] = [];
  selectedDateRange: { lower: Date, upper: Date } = {
    lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    upper: new Date(),
  };
  selectedTimeline: string = 'month';
  segment: string = 'table';
  selectedFilters: string[] = [];
  authSubscription!: Subscription;

  // private barChart: Chart<'bar', number[], string> | undefined;
  // private pieChart: Chart<'pie', number[], string> | undefined;
  // private doughnutChart: Chart<'doughnut', number[], string> | undefined;
  // private radarChart: Chart<'radar', number[], string> | undefined;
  private barChart: Chart | any;//undefined;
  private pieChart: Chart<'pie', number[], string> | any;//undefined;
  private doughnutChart: Chart<'doughnut', number[], string> | any;//undefined;
  private radarChart: Chart | any;//undefined;

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  
  ngOnInit() {
    this.authSubscription = this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        this.loadTransactions(user.uid);
      } else {
        console.error('User not authenticated');
      }
    });
  }
  
  ngAfterViewInit() {
    // Ensure charts are created after the view has been initialized
    this.updateCharts();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.destroyCharts();
  }

  loadTransactions(uid: string) {
    this.transactionService.getTransactions(uid).subscribe((data) => {
      this.transactions = data;
      this.applyFilters();
    });
  }

  async applyFilters() {
    this.updateSelectedFilters();

    this.filteredTransactions = this.transactions.filter((transaction) => {
      const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
      const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
      const matchesDateRange =
        new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) &&
        new Date(this.selectedDateRange.upper) >= new Date(transaction.transactionDate);

      return matchesStatus && matchesType && matchesDateRange;
    });
    console.log("Filetered list : ",this.filteredTransactions)
    this.updateCharts();
    // this.updateSelectedFilters();
  }

  updateSelectedFilters() {
    this.selectedFilters = [];

    if (this.selectedStatus.length > 0) {
      this.selectedFilters.push(...this.selectedStatus.map((status) => `Status: ${status}`));
    }

    if (this.selectedTransactionTypes.length > 0) {
      this.selectedFilters.push(...this.selectedTransactionTypes.map((type) => `Type: ${type}`));
    }

    if (this.selectedDateRange.lower && this.selectedDateRange.upper) {
      this.selectedFilters.push(`Date Range: ${this.selectedDateRange.lower.toLocaleDateString()} - ${this.selectedDateRange.upper.toLocaleDateString()}`);
    }

    if (this.selectedFilters.length === 0) {
      this.selectedFilters.push('No filters applied');
    }

    console.log("Selected filters : ",this.selectedFilters)
  }

  private updateCharts() {
    // this.destroyCharts();

    // const chartData = this.getChartData();
    // this.createBarChart(chartData);
    // this.createPieChart(chartData);
    // this.createDoughnutChart(chartData);
    // this.createRadarChart(chartData);

    this.destroyCharts();

    const chartData = this.getChartData();

    // Creating all charts after the view is ready
    setTimeout(() => {
      this.createBarChart(chartData);
      this.createPieChart(chartData);
      this.createDoughnutChart(chartData);
      this.createRadarChart(chartData);
    });
  }

  private destroyCharts() {
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
    if (this.radarChart) {
      this.radarChart.destroy();
    }
  }

  private getChartData() {
    const labels: string[] = [];
    const data: number[] = [];

    const groupedTransactions = this.groupTransactionsByTimeline();

    Object.keys(groupedTransactions).forEach((key) => {
      labels.push(key);
      const totalAmount = groupedTransactions[key].reduce((sum, transaction) => sum + transaction.amount, 0);
      data.push(totalAmount);
    });

    return { labels, data };
  }

  private groupTransactionsByTimeline() {
    const groupedTransactions: { [key: string]: Transaction[] } = {};

    this.filteredTransactions.forEach((transaction) => {
      let key = '';
      if (this.selectedTimeline === 'year') {
        key = new Date(transaction.transactionDate).getFullYear().toString();
      } else if (this.selectedTimeline === 'month') {
        key = new Date(transaction.transactionDate).toLocaleString('default', { month: 'short', year: 'numeric' });
      } else {
        key = new Date(transaction.transactionDate).toLocaleDateString();
      }

      if (!groupedTransactions[key]) {
        groupedTransactions[key] = [];
      }
      groupedTransactions[key].push(transaction);
    });

    return groupedTransactions;
  }

  private createBarChart(chartData: { labels: string[]; data: number[] }) {
    const canvas = document.getElementById('transactionBarChart') as HTMLCanvasElement;
    if (canvas) {
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const totalAmount = this.filteredTransactions
                  .filter((transaction) => transaction.transactionType === tooltipItem.label)
                  .reduce((sum, transaction) => sum + transaction.amount, 0);
                return `${tooltipItem.label}: $${totalAmount.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  }
  }

  private createPieChart(chartData: { labels: string[]; data: number[] }) {
    const canvas = document.getElementById('transactionPieChart') as HTMLCanvasElement;
    if (canvas) {
    this.pieChart = new Chart<'pie', number[], string>(canvas, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
            borderColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
            },
          },
        },
      },
    });
  }
}

  private createDoughnutChart(chartData: { labels: string[]; data: number[] }) {
    const canvas = document.getElementById('transactionPieChart') as HTMLCanvasElement;
    if (canvas) {
    this.doughnutChart = new Chart<'doughnut', number[], string>(canvas, {
      type: 'doughnut',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
            borderColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const percentage = tooltipItem.raw as number;
                return `${tooltipItem.label}: $${percentage.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  }
}

  private createRadarChart(chartData: { labels: string[]; data: number[] }) {
    this.radarChart = new Chart<'radar', number[], string>('transactionRadarChart', {
      type: 'radar',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const percentage = tooltipItem.raw as number;
                return `${tooltipItem.label}: $${percentage.toFixed(2)}`;
              }
            },
          },
        },
      },
    });
  }

  onSegmentChanged(event: any) {
    this.segment = event.detail.value;
  }
}
