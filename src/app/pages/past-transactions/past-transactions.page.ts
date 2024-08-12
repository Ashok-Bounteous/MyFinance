// import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import { AuthService } from 'src/app/services/userauth.service';
// import { TransactionService } from 'src/app/services/transaction.service';
// import { Transaction } from 'src/app/store/models/transaction.model';
// import { Subscription } from 'rxjs';
// import { Chart, registerables, ChartType } from 'chart.js';
// import { Router } from '@angular/router';
// import { percentage } from '@angular/fire/storage';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-past-transactions',
//   templateUrl: './past-transactions.page.html',
//   styleUrls: ['./past-transactions.page.scss'],
// })
// export class PastTransactionsPage implements OnInit, OnDestroy, AfterViewInit {
//     statuses: any[] = [
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
//   transactions: Transaction[] = [];
//   filteredTransactions: Transaction[] = [];
//   selectedStatus: any[] = [];
//   selectedTransactionTypes: any[] = [];
//   selectedDateRange: { lower: Date, upper: Date } = {
//     lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
//     upper: new Date(),
//   };
//   selectedTimeline: string = 'month';
//   segment: string = 'table';
//   selectedFilters: string[] = [];
//   authSubscription!: Subscription;

//   // private barChart: Chart<'bar', number[], string> | undefined;
//   // private pieChart: Chart<'pie', number[], string> | undefined;
//   // private doughnutChart: Chart<'doughnut', number[], string> | undefined;
//   // private radarChart: Chart<'radar', number[], string> | undefined;
//   private barChart: Chart | any;//undefined;
//   private pieChart: Chart<'pie', number[], string> | any;//undefined;
//   private doughnutChart: Chart<'doughnut', number[], string> | any;//undefined;
//   private radarChart: Chart | any;//undefined;

//   constructor(
//     private authService: AuthService,
//     private transactionService: TransactionService,
//     private router: Router
//   ) {}

  
//   ngOnInit() {
//     this.authSubscription = this.authService.getUserProfile().subscribe((user) => {
//       if (user) {
//         this.loadTransactions(user.uid);
//       } else {
//         console.error('User not authenticated');
//       }
//     });
//   }
  
//   // ngAfterViewInit() {
//   //   // Ensure charts are created after the view has been initialized
//   //   this.updateCharts();
//   // }


//   ngAfterViewInit() {
//     this.createCharts();
//   }

//   createCharts() {
//     const barCanvas = document.getElementById('transactionBarChart') as HTMLCanvasElement;
//     const pieCanvas = document.getElementById('transactionPieChart') as HTMLCanvasElement;
//     const doughnutCanvas = document.getElementById('transactionDoughnutChart') as HTMLCanvasElement;
//     const radarCanvas = document.getElementById('transactionRadarChart') as HTMLCanvasElement;

//     if (barCanvas?.getContext('2d') && pieCanvas?.getContext('2d') && doughnutCanvas?.getContext('2d') && radarCanvas?.getContext('2d')) {
//       new Chart(barCanvas.getContext('2d')!, { /* Bar Chart Config */ });
//       new Chart(pieCanvas.getContext('2d')!, { /* Pie Chart Config */ });
//       new Chart(doughnutCanvas.getContext('2d')!, { /* Doughnut Chart Config */ });
//       new Chart(radarCanvas.getContext('2d')!, { /* Radar Chart Config */ });
//     } else {
//       console.error('Failed to acquire context from the given item.');
//     }
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

//   // async applyFilters() {
//   //   this.updateSelectedFilters();

//   //   this.filteredTransactions = this.transactions.filter((transaction) => {
//   //     const matchesStatus = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
//   //     const matchesType = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
//   //     const matchesDateRange =
//   //       new Date(transaction.transactionDate) >= new Date(this.selectedDateRange.lower) &&
//   //       new Date(this.selectedDateRange.upper) >= new Date(transaction.transactionDate);

//   //     return matchesStatus && matchesType && matchesDateRange;
//   //   });
//   //   console.log("Filetered list : ",this.filteredTransactions)
//   //   this.updateCharts();
//   //   // this.updateSelectedFilters();
//   // }

//   applyFilters() {
//     this.filteredTransactions = this.transactions;
  
//     // Filter by Status
//     if (this.selectedStatus && this.selectedStatus.length > 0) {
//       this.filteredTransactions = this.filteredTransactions.filter(transaction =>
//         this.selectedStatus.includes(transaction.status)
//       );
//     }
  
//     // Filter by Transaction Type
//     if (this.selectedTransactionTypes && this.selectedTransactionTypes.length > 0) {
//       this.filteredTransactions = this.filteredTransactions.filter(transaction =>
//         this.selectedTransactionTypes.includes(transaction.transactionType)
//       );
//     }
  
//     // Filter by Date Range
//     if (this.selectedDateRange) {
//       const startDate: any = this.selectedDateRange.lower, endDate: any = this.selectedDateRange.upper;
//       this.filteredTransactions = this.filteredTransactions.filter(transaction =>
//         new Date(transaction.transactionDate) >= startDate && new Date(transaction.transactionDate) <= endDate
//       );
//     }
  
//     console.log('Filtered list : ', this.filteredTransactions);
//   }
  
//   updateSelectedFilters() {
//     this.selectedFilters = [];

//     if (this.selectedStatus.length > 0) {
//       this.selectedFilters.push(...this.selectedStatus.map((status) => `Status: ${status}`));
//     }

//     if (this.selectedTransactionTypes.length > 0) {
//       this.selectedFilters.push(...this.selectedTransactionTypes.map((type) => `Type: ${type}`));
//     }

//     if (this.selectedDateRange.lower && this.selectedDateRange.upper) {
//       this.selectedFilters.push(`Date Range: ${this.selectedDateRange.lower.toLocaleDateString()} - ${this.selectedDateRange.upper.toLocaleDateString()}`);
//     }

//     if (this.selectedFilters.length === 0) {
//       this.selectedFilters.push('No filters applied');
//     }

//     console.log("Selected filters : ",this.selectedFilters)
//   }

//   private updateCharts() {

//     this.destroyCharts();

//     const chartData = this.getChartData();

//     // Creating all charts after the view is ready
//     setTimeout(() => {
//       this.createBarChart(chartData);
//       this.createPieChart(chartData);
//       this.createDoughnutChart(chartData);
//       this.createRadarChart(chartData);
//     });
//   }

//   private destroyCharts() {
//     if (this.barChart) {
//       this.barChart.destroy();
//     }
//     if (this.pieChart) {
//       this.pieChart.destroy();
//     }
//     if (this.doughnutChart) {
//       this.doughnutChart.destroy();
//     }
//     if (this.radarChart) {
//       this.radarChart.destroy();
//     }
//   }

//   private getChartData() {
//     const labels: string[] = [];
//     const data: number[] = [];

//     const groupedTransactions = this.groupTransactionsByTimeline();

//     Object.keys(groupedTransactions).forEach((key) => {
//       labels.push(key);
//       const totalAmount = groupedTransactions[key].reduce((sum, transaction) => sum + transaction.amount, 0);
//       data.push(totalAmount);
//     });

//     return { labels, data };
//   }

//   private groupTransactionsByTimeline() {
//     const groupedTransactions: { [key: string]: Transaction[] } = {};

//     this.filteredTransactions.forEach((transaction) => {
//       let key = '';
//       if (this.selectedTimeline === 'year') {
//         key = new Date(transaction.transactionDate).getFullYear().toString();
//       } else if (this.selectedTimeline === 'month') {
//         key = new Date(transaction.transactionDate).toLocaleString('default', { month: 'short', year: 'numeric' });
//       } else {
//         key = new Date(transaction.transactionDate).toLocaleDateString();
//       }

//       if (!groupedTransactions[key]) {
//         groupedTransactions[key] = [];
//       }
//       groupedTransactions[key].push(transaction);
//     });

//     return groupedTransactions;
//   }

//   private createBarChart(chartData: { labels: string[]; data: number[] }) {
//     const canvas = document.getElementById('transactionBarChart') as HTMLCanvasElement;
//     if (canvas) {
//     this.barChart = new Chart(canvas, {
//       type: 'bar',
//       data: {
//         labels: chartData.labels,
//         datasets: [
//           {
//             data: chartData.data,
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) => {
//                 const totalAmount = this.filteredTransactions
//                   .filter((transaction) => transaction.transactionType === tooltipItem.label)
//                   .reduce((sum, transaction) => sum + transaction.amount, 0);
//                 return `${tooltipItem.label}: $${totalAmount.toFixed(2)}`;
//               },
//             },
//           },
//         },
//       },
//     });
//   }
//   }

//   private createPieChart(chartData: { labels: string[]; data: number[] }) {
//     const canvas = document.getElementById('transactionPieChart') as HTMLCanvasElement;
//     if (canvas) {
//     this.pieChart = new Chart<'pie', number[], string>(canvas, {
//       type: 'pie',
//       data: {
//         labels: chartData.labels,
//         datasets: [
//           {
//             data: chartData.data,
//             backgroundColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
//             borderColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
//             },
//           },
//         },
//       },
//     });
//   }
// }

//   private createDoughnutChart(chartData: { labels: string[]; data: number[] }) {
//     const canvas = document.getElementById('transactionPieChart') as HTMLCanvasElement;
//     if (canvas) {
//     this.doughnutChart = new Chart<'doughnut', number[], string>(canvas, {
//       type: 'doughnut',
//       data: {
//         labels: chartData.labels,
//         datasets: [
//           {
//             data: chartData.data,
//             backgroundColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
//             borderColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
//             borderWidth: 1,
//           },
//         ],
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
//                 const percentage = tooltipItem.raw as number;
//                 return `${tooltipItem.label}: $${percentage.toFixed(2)}`;
//               },
//             },
//           },
//         },
//       },
//     });
//   }
// }

//   private createRadarChart(chartData: { labels: string[]; data: number[] }) {
//     this.radarChart = new Chart<'radar', number[], string>('transactionRadarChart', {
//       type: 'radar',
//       data: {
//         labels: chartData.labels,
//         datasets: [
//           {
//             data: chartData.data,
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           r: {
//             beginAtZero: true,
//           },
//         },
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           tooltip: {
//             callbacks: {
//               label: (tooltipItem) => {
//                 const percentage = tooltipItem.raw as number;
//                 return `${tooltipItem.label}: $${percentage.toFixed(2)}`;
//               }
//             },
//           },
//         },
//       },
//     });
//   }

//   onSegmentChanged(event: any) {
//     this.segment = event.detail.value;
//   }
// }









// import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { Chart, registerables } from 'chart.js';
// import { TransactionService } from 'src/app/services/transaction.service'; // Update the import path based on your project
// import { AuthService } from 'src/app/services/userauth.service';// Update the import path based on your project

// Chart.register(...registerables);

// @Component({
//   selector: 'app-past-transactions',
//   templateUrl: './past-transactions.page.html',
//   styleUrls: ['./past-transactions.page.scss']
// })
// export class PastTransactionsPage implements OnInit, OnDestroy, AfterViewInit {
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

//   transactions: any[] = [];
//   filteredTransactions: any[] = [];
//   selectedStatus: any[] = [];
//   selectedTransactionTypes: any[] = [];
//   selectedDateRange: { lower: Date, upper: Date } = {
//     lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
//     upper: new Date(),
//   };
//   selectedTimeline: string = 'month';
//   segment: string = 'table';
//   selectedFilters: string[] = [];
//   private transactionsSubscription!: Subscription;
//   private authSubscription!: Subscription;

//   constructor(
//     private transactionService: TransactionService,
//     private authService: AuthService
//   ) { }

//   ngOnInit(): void {
//     console.log('Past Transactions initialized');
//     this.loadUserProfile();
//   }

//   ngOnDestroy(): void {
//     if (this.transactionsSubscription) {
//       this.transactionsSubscription.unsubscribe();
//     }
//     if (this.authSubscription) {
//       this.authSubscription.unsubscribe();
//     }
//   }

//   loadUserProfile() {
//     console.log('Loading user profile');

//     this.authSubscription = this.authService.getUserProfile().subscribe((user) => {
//       if (user) {
//         console.log('User profile loaded:', user);
//         this.loadTransactions(user.uid);
//       } else {
//         console.error('User not authenticated');
//       }
//     }, (error) => {
//       console.error('Error loading user profile:', error);
//     });
//   }

//   // loadTransactions(userId: string) {
//   //   console.log('Loading transactions for user ID:', userId);

//   //   this.transactionsSubscription = this.transactionService.getTransactions(userId).subscribe(
//   //     (data) => {
//   //       console.log('Transactions loaded:', data);
//   //       this.transactions = data;
//   //       this.applyFilters();
//   //     },
//   //     (error) => {
//   //       console.error('Error loading transactions:', error);
//   //     }
//   //   );
//   // }

//   // applyFilters() {
//   //   console.log('Applying filters to transactions');

//   //   // Apply date range filter
//   //   this.filteredTransactions = this.transactions.filter(transaction => {
//   //     const transactionDate = new Date(transaction.date);
//   //     return transactionDate >= this.selectedDateRange.lower && transactionDate <= this.selectedDateRange.upper;
//   //   });

//   //   // Apply status filter
//   //   if (this.selectedStatus.length) {
//   //     this.filteredTransactions = this.filteredTransactions.filter(transaction =>
//   //       this.selectedStatus.includes(transaction.status)
//   //     );
//   //   }

//   //   // Apply transaction type filter
//   //   if (this.selectedTransactionTypes.length) {
//   //     this.filteredTransactions = this.filteredTransactions.filter(transaction =>
//   //       this.selectedTransactionTypes.includes(transaction.type)
//   //     );
//   //   }

//   //   console.log('Filtered transactions:', this.filteredTransactions);
//   //   this.updateCharts(); // Update charts after filters are applied
//   // }

//   // updateCharts() {
//   //   console.log('Updating charts with filtered data');

//   //   // Get contexts for all canvases
//   //   const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
//   //   const pieCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
//   //   const doughnutCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
//   //   const radarCanvas = document.getElementById('radarChart') as HTMLCanvasElement;

//   //   if (barCanvas && pieCanvas && doughnutCanvas && radarCanvas) {
//   //     this.createBarChart(barCanvas);
//   //     this.createPieChart(pieCanvas);
//   //     this.createDoughnutChart(doughnutCanvas);
//   //     this.createRadarChart(radarCanvas);
//   //   } else {
//   //     console.error('One or more canvas elements not found');
//   //   }
//   // }


//   loadTransactions(userId: string) {
//     console.log(`Loading transactions for user ID: ${userId}`);
//     this.transactionService.getTransactions(userId).subscribe(transactions => {
//       this.transactions = transactions;
//       console.log('Transactions loaded:', this.transactions);
//       this.applyFilters(); // Apply filters after loading transactions
//     });
//   }

//   // applyFilters() {
//   //   console.log('Applying filters to transactions');
//   //   this.filteredTransactions = this.transactions.filter(transaction => {

//   //     console.log("Transaction is : ",transaction);
//   //     //accountId:"11111111111"
//   //     // amount:2000
//   //     // category:"Rent/Mortgage Payments"
//   //     // description:"Weekly purchase"
//   //     // recurring:false
//   //     // status:"Completed"
//   //     // tags:['']
//   //     // transactionDate:"2024-08-07T21:17:00"
//   //     // transactionType: "expense"
//   //         // Convert transactionDate to Date object
//   //   const transactionDate = new Date(transaction.transactionDate);

//   //   // Ensure the transactionDate is a valid date
//   //   if (isNaN(transactionDate.getTime())) {
//   //     console.warn(`Invalid date format for transaction: ${transaction.transactionDate}`);
//   //     return false;
//   //   }

//   //     const statusMatch = this.selectedStatus.length === 0 || this.selectedStatus.includes(transaction.status);
//   //     const typeMatch = this.selectedTransactionTypes.length === 0 || this.selectedTransactionTypes.includes(transaction.transactionType);
//   //     // const dateMatch = (transaction.transactionDate >= this.selectedDateRange.lower && transaction.transactionDate <= this.selectedDateRange.upper);
//   //     const dateMatch = (transactionDate >= this.selectedDateRange.lower && transactionDate <= this.selectedDateRange.upper);

//   //     console.log('Selected Status:', this.selectedStatus, " and status : ",statusMatch, 'tran sta : ',transaction.status);
//   //     console.log('Selected Transaction Types:', this.selectedTransactionTypes, ' and typematch : ',typeMatch, 'and the tra type : ', transaction.transactionType);
//   //     console.log('Date Range:', this.selectedDateRange.lower, this.selectedDateRange.upper, ' and datematch : ',dateMatch);
//   //     console.log(" And the transaction date is : ",transaction.transactionDate)


//   //     return statusMatch && typeMatch && dateMatch;
//   //   });

//   //   console.log('Filtered transactions:', this.filteredTransactions);
//   //   this.updateCharts(); // Update charts after filtering
//   // }

//   applyFilters() {
//     console.log('Applying filters to transactions');
  
//     this.filteredTransactions = this.transactions.filter(transaction => {
//       console.log("Transaction:", transaction);
  
//       // Convert transactionDate to Date object
//       const transactionDate = new Date(transaction.transactionDate);
//       console.log("Transaction date:", transactionDate);
  
//       // Ensure the transactionDate is a valid date
//       if (isNaN(transactionDate.getTime())) {
//         console.warn(`Invalid date format for transaction: ${transaction.transactionDate}`);
//         return false;
//       }
  
//       // Extract values for comparison
//       const transactionStatus = transaction.status;
//       const transactionType = transaction.transactionType;
  
//       // Match status against selectedStatus
//       const statusMatch = this.selectedStatus.length === 0 || 
//                            this.selectedStatus.some(status => status.value === transactionStatus);
//       // Match type against selectedTransactionTypes
//       const typeMatch = this.selectedTransactionTypes.length === 0 || 
//                          this.selectedTransactionTypes.some(type => type.value === transactionType);
  
//       // Match date against selectedDateRange
//       const dateMatch = (transactionDate >= this.selectedDateRange.lower && transactionDate <= this.selectedDateRange.upper);
  
//       // Logging for debugging
//       console.log('Selected Status:', this.selectedStatus, "Status Match:", statusMatch, "Transaction Status:", transactionStatus);
//       console.log('Selected Transaction Types:', this.selectedTransactionTypes, "Type Match:", typeMatch, "Transaction Type:", transactionType);
//       console.log('Date Range:', this.selectedDateRange.lower, this.selectedDateRange.upper, "Date Match:", dateMatch);
  
//       return statusMatch && typeMatch && dateMatch;
//     });
  
//     console.log('Filtered transactions:', this.filteredTransactions);
//     this.updateCharts(); // Update charts after filtering
//   }

  
//   // updateCharts() {
//   //   console.log('Updating charts with filtered data');

//   //   const barCanvas = document.getElementById('transactionBarChart') as HTMLCanvasElement | null;
//   //   const pieCanvas = document.getElementById('transactionPieChart') as HTMLCanvasElement | null;
//   //   const doughnutCanvas = document.getElementById('transactionDoughnutChart') as HTMLCanvasElement | null;
//   //   const radarCanvas = document.getElementById('transactionRadarChart') as HTMLCanvasElement | null;

//   //   if (!barCanvas || !pieCanvas || !doughnutCanvas || !radarCanvas) {
//   //     console.error('One or more canvas elements not found');
//   //     console.log("the charts are : ", barCanvas,'\n',pieCanvas)
//   //     return;
//   //   }

//   //   if (this.filteredTransactions.length === 0) {
//   //     console.warn('No transactions available for charting');
//   //     return;
//   //   }

//   //   this.createBarChart(barCanvas);
//   //   this.createPieChart(pieCanvas);
//   //   this.createDoughnutChart(doughnutCanvas);
//   //   this.createRadarChart(radarCanvas);
//   // }

//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.updateCharts();
//     }, 100); // 100ms delay, adjust as needed
//     // Ensure the charts are updated only after the view is initialized
//     console.log("In view init")
//     this.updateCharts();
//   }

//   updateCharts() {
//     console.log('Updating charts with filtered data');

//     // Get canvas elements
//     const barCanvas = document.getElementById('transactionBarChart') as HTMLCanvasElement | null;
//     const pieCanvas = document.getElementById('transactionPieChart') as HTMLCanvasElement | null;
//     const doughnutCanvas = document.getElementById('transactionDoughnutChart') as HTMLCanvasElement | null;
//     const radarCanvas = document.getElementById('transactionRadarChart') as HTMLCanvasElement | null;

//     if (!barCanvas || !pieCanvas || !doughnutCanvas || !radarCanvas) {
//       console.error('One or more canvas elements not found');
//       console.log("Canvas elements:", {
//         barCanvas,
//         pieCanvas,
//         doughnutCanvas,
//         radarCanvas
//       });
//       return;
//     }

//     if (this.filteredTransactions.length === 0) {
//       console.warn('No transactions available for charting');
//       return;
//     }

//     // Create charts
//     this.createBarChart(barCanvas);
//     this.createPieChart(pieCanvas);
//     this.createDoughnutChart(doughnutCanvas);
//     this.createRadarChart(radarCanvas);
//   }

  

//   createBarChart(barCanvas: HTMLCanvasElement) {
//     console.log('Creating Bar Chart');

//     const incomeExpenseData = {
//       labels: ['Income', 'Expense'],
//       datasets: [
//         {
//           label: 'Amount',
//           data: [
//             this.filteredTransactions
//               .filter(transaction => transaction.transactionType == 'income')
//               .reduce((sum, transaction) => sum + transaction.amount, 0),
//             this.filteredTransactions
//               .filter(transaction => transaction.transactionType === 'expense')
//               .reduce((sum, transaction) => sum + transaction.amount, 0)
//           ],
//           backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//           borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//           borderWidth: 1
//         }
//       ]
//     };

//     new Chart(barCanvas.getContext('2d')!, {
//       type: 'bar',
//       data: incomeExpenseData,
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }

//   createPieChart(pieCanvas: HTMLCanvasElement) {
//     console.log('Creating Pie Chart');

//     const categoryAmounts = this.filteredTransactions.reduce((acc: any, transaction) => {
//       if (!acc[transaction.category]) {
//         acc[transaction.category] = 0;
//       }
//       acc[transaction.category] += transaction.amount;
//       return acc;
//     }, {});

//     const pieData = {
//       labels: Object.keys(categoryAmounts),
//       datasets: [
//         {
//           data: Object.values(categoryAmounts),
//           backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
//           borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
//           borderWidth: 1
//         }
//       ]
//     };

//     new Chart(pieCanvas.getContext('2d')!, {
//       type: 'pie',
//       data: pieData,
//       options: {
//         responsive: true
//       }
//     });
//   }

//   createDoughnutChart(doughnutCanvas: HTMLCanvasElement) {
//     console.log('Creating Doughnut Chart');
  
//     // Define categoryAmounts as a Record with string keys and number values
//     const categoryAmounts: Record<string, number> = this.filteredTransactions.reduce((acc: Record<string, number>, transaction: any) => {
//       if (!acc[transaction.category]) {
//         acc[transaction.category] = 0;
//       }
//       acc[transaction.category] += transaction.amount;
//       return acc;
//     }, {});
  
//     // Calculate totalAmount as a number
//     const totalAmount: number = Object.values(categoryAmounts).reduce((sum: number, amount: number) => sum + amount, 0);
  
//     // Define doughnutData with labels and datasets
//     const doughnutData = {
//       labels: Object.keys(categoryAmounts),
//       datasets: [
//         {
//           data: Object.values(categoryAmounts).map((amount: number) => (amount / totalAmount) * 100),
//           backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
//           borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
//           borderWidth: 1
//         }
//       ]
//     };
  
//     new Chart(doughnutCanvas.getContext('2d')!, {
//       type: 'doughnut',
//       data: doughnutData,
//       options: {
//         responsive: true
//       }
//     });
//   }
  

//   createRadarChart(radarCanvas: HTMLCanvasElement) {
//     console.log('Creating Radar Chart');

//     const years = Array.from(new Set(this.filteredTransactions.map(transaction => transaction.year)));
//     const categoryData = years.reduce((acc: any, year: string) => {
//       acc[year] = this.filteredTransactions
//         .filter(transaction => transaction.year === year)
//         .reduce((catAcc: any, transaction) => {
//           if (!catAcc[transaction.category]) {
//             catAcc[transaction.category] = 0;
//           }
//           catAcc[transaction.category] += transaction.amount;
//           return catAcc;
//         }, {});
//       return acc;
//     }, {});

//     const radarData = {
//       labels: years,
//       datasets: Object.keys(categoryData).map((category: string) => ({
//         label: category,
//         data: years.map(year => categoryData[year][category] || 0),
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }))
//     };

//     new Chart(radarCanvas.getContext('2d')!, {
//       type: 'radar',
//       data: radarData,
//       options: {
//         responsive: true,
//         scales: {
//           r: {
//             angleLines: {
//               display: false
//             },
//             suggestedMin: 0,
//             suggestedMax: 100
//           }
//         }
//       }
//     });
//   }
// }



import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from 'src/app/services/transaction.service';
import { AuthService } from 'src/app/services/userauth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-past-transactions',
  templateUrl: './past-transactions.page.html',
  styleUrls: ['./past-transactions.page.scss']
})
export class PastTransactionsPage implements OnInit, OnDestroy, AfterViewInit{
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

  transactions: any[] = [];
  filteredTransactions: any[] = [];
  selectedStatus: any[] = [];
  selectedTransactionTypes: any[] = [];
  // selectedDateRange: { lower: Date, upper: Date } = {
  //   lower: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  //   upper: new Date(),
  // };
  selectedDateRange: Date[] = [
    new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Start date (one year ago)
    new Date() // End date (today)
  ];
  
  selectedTimeline: string = 'month';
  segment: string = 'table';
  selectedFilters: string[] = [];
  private transactionsSubscription!: Subscription;
  private authSubscription!: Subscription;

  // Track chart instances
  private barChart: Chart | any;//undefined;
  private pieChart: Chart | any;//undefined;
  private doughnutChart: Chart | any;//undefined;
  private radarChart: Chart | any;//undefined;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Past Transactions initialized');
    this.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.destroyCharts(); // Clean up charts on component destroy
  }

  loadUserProfile() {
    console.log('Loading user profile');

    this.authSubscription = this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        console.log('User profile loaded:', user);
        this.loadTransactions(user.uid);
      } else {
        console.error('User not authenticated');
      }
    }, (error) => {
      console.error('Error loading user profile:', error);
    });
  }

  loadTransactions(userId: string) {
    console.log(`Loading transactions for user ID: ${userId}`);
    this.transactionService.getTransactions(userId).subscribe(transactions => {
      this.transactions = transactions;
      console.log('Transactions loaded:', this.transactions);
      this.applyFilters(); // Apply filters after loading transactions
    });
  }

  applyFilters() {
    console.log('Applying filters to transactions');
    this.filteredTransactions = this.transactions.filter(transaction => {
      console.log("Transaction:", transaction);

      const transactionDate = new Date(transaction.transactionDate);
      console.log("Transaction date:", transactionDate);

      if (isNaN(transactionDate.getTime())) {
        console.warn(`Invalid date format for transaction: ${transaction.transactionDate}`);
        return false;
      }

      const transactionStatus = transaction.status;
      const transactionType = transaction.transactionType;

      const statusMatch = this.selectedStatus.length === 0 || 
                           this.selectedStatus.some(status => status.value === transactionStatus);
      const typeMatch = this.selectedTransactionTypes.length === 0 || 
                         this.selectedTransactionTypes.some(type => type.value === transactionType);

      const dateMatch = (transactionDate >= this.selectedDateRange[0] && transactionDate <= this.selectedDateRange[1]);

      console.log('Selected Status:', this.selectedStatus, "Status Match:", statusMatch, "Transaction Status:", transactionStatus);
      console.log('Selected Transaction Types:', this.selectedTransactionTypes, "Type Match:", typeMatch, "Transaction Type:", transactionType);
      console.log('Date Range:', this.selectedDateRange[0], this.selectedDateRange[1], "Date Match:", dateMatch);

      return statusMatch && typeMatch && dateMatch;
    });

    console.log('Filtered transactions:', this.filteredTransactions);
    this.updateCharts(); // Update charts after filtering
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); 
    setTimeout(() => {
      if (this.segment === 'chart') {
      this.updateCharts();}
    }, 100); // 100ms delay, adjust as needed
    console.log("In view init");
    // this.updateCharts();
  }


  updateCharts() {
    if (this.segment === 'chart') {
      setTimeout(() => {

    console.log('Updating charts with filtered data');
    this.destroyCharts(); // Destroy existing charts before creating new ones

    const barCanvas = document.getElementById('transactionBarChart') as HTMLCanvasElement | null;
    const pieCanvas = document.getElementById('transactionPieChart') as HTMLCanvasElement | null;
    const doughnutCanvas = document.getElementById('transactionDoughnutChart') as HTMLCanvasElement | null;
    const radarCanvas = document.getElementById('transactionRadarChart') as HTMLCanvasElement | null;

    if (!barCanvas || !pieCanvas || !doughnutCanvas || !radarCanvas) {
      console.error('One or more canvas elements not found');
      return;
    }

    if (this.filteredTransactions.length === 0) {
      console.warn('No transactions available for charting');
      return;
    }

    this.createBarChart(barCanvas);
    this.createPieChart(pieCanvas);
    this.createDoughnutChart(doughnutCanvas);
    this.createRadarChart(radarCanvas);
           
  }, 100); // 100ms delay, adjust as needed
}
  }

  destroyCharts() {
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = undefined;
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = undefined;
    }
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
      this.doughnutChart = undefined;
    }
    if (this.radarChart) {
      this.radarChart.destroy();
      this.radarChart = undefined;
    }
  }

  createBarChart(barCanvas: HTMLCanvasElement) {
    console.log('Creating Bar Chart');

    const incomeExpenseData = {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Amount',
          data: [
            this.filteredTransactions
              .filter(transaction => transaction.transactionType == 'income')
              .reduce((sum, transaction) => sum + transaction.amount, 0),
            this.filteredTransactions
              .filter(transaction => transaction.transactionType === 'expense')
              .reduce((sum, transaction) => sum + transaction.amount, 0)
          ],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }
      ]
    };

    this.barChart = new Chart(barCanvas.getContext('2d')!, {
      type: 'bar',
      data: incomeExpenseData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart(pieCanvas: HTMLCanvasElement) {
    console.log('Creating Pie Chart');

    const categoryAmounts = this.filteredTransactions.reduce((acc: any, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

    const pieData = {
      labels: Object.keys(categoryAmounts),
      datasets: [
        {
          data: Object.values(categoryAmounts),
          backgroundColor: ['rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }
      ]
    };

    this.pieChart = new Chart(pieCanvas.getContext('2d')!, {
      type: 'pie',
      data: pieData,
      options: {
        responsive: true
      }
    });
  }

  createDoughnutChart(doughnutCanvas: HTMLCanvasElement) {
    console.log('Creating Doughnut Chart');

    const categoryAmounts = this.filteredTransactions.reduce((acc: any, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

    const doughnutData = {
      labels: Object.keys(categoryAmounts),
      datasets: [
        {
          data: Object.values(categoryAmounts),
          backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }
      ]
    };

    this.doughnutChart = new Chart(doughnutCanvas.getContext('2d')!, {
      type: 'doughnut',
      data: doughnutData,
      options: {
        responsive: true
      }
    });
  }

  createRadarChart(radarCanvas: HTMLCanvasElement) {
    console.log('Creating Radar Chart');

    const labels = [...new Set(this.filteredTransactions.map(transaction => transaction.category))];
    const categoryAmounts = labels.map(label => 
      this.filteredTransactions
        .filter(transaction => transaction.category === label)
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    const radarData = {
      labels: labels,
      datasets: [
        {
          label: 'Expenses by Category',
          data: categoryAmounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    this.radarChart = new Chart(radarCanvas.getContext('2d')!, {
      type: 'radar',
      data: radarData,
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0
          }
        }
      }
    });
  }
}
