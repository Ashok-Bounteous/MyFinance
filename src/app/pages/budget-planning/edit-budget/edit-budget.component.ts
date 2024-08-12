// import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js/auto';
// import { AuthService } from 'src/app/services/userauth.service'; // Adjust path as needed
// import { BudgetService } from 'src/app/services/budget.service'; // Adjust path as needed

// @Component({
//   selector: 'app-edit-budget',
//   templateUrl: './edit-budget.component.html',
//   styleUrls: ['./edit-budget.component.scss'],
// })
// export class EditBudgetComponent implements OnInit {
//   budgetAmount: number = 0;
//   budgetCategories = [
//     { name: 'Income', amount: 0 },
//     { name: 'Expense', amount: 0 },
//     { name: 'Investment', amount: 0 },
//     { name: 'Savings', amount: 0 },
//     { name: 'debt payment', amount: 0},
//     { name: 'transfer', amount: 0},
//     { name: 'Others', amount: 0 } ];
//   availableYears: number[] = [];
//   availableMonths: string[] = [];
//   selectedYear: number | null = null;
//   selectedMonth: string | null = null;
//   private editBudgetChart: Chart | any;
//   private userId: string | null = null;

//   loading: boolean = false;

//   constructor(
//     private authService: AuthService,
//     private budgetService: BudgetService
//   ) {
//     Chart.register(...registerables);
//   }

//   ngOnInit() {
//     this.loadAvailableYearsAndMonths();
//     this.authService.getUserProfile().subscribe((user: { uid: string }) => {
//       console.log("User : ",user)
//       if (user) {
//         this.userId = user.uid;
//         this.fetchBudgetData();
//       } else {
//         console.error('User not authenticated');
//         this.loading = false;
//       }
//     });
//   }

//   loadAvailableYearsAndMonths() {
//     // Populate availableYears and availableMonths
//     const currentYear = new Date().getFullYear();
//     this.availableYears = [currentYear, currentYear + 1, currentYear + 2];
//     this.availableMonths = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//   }

//   // loading: boolean = false; // Add a loading flag

//   fetchBudgetData() {
//     if (this.userId && this.selectedYear && this.selectedMonth) {
//       this.loading = true; // Start loading
  
//       const path = `users/budgetHistory/${this.userId}/${this.selectedYear}/${this.selectedMonth}`;
//       this.budgetService.getBudget(this.userId, this.selectedYear.toString(), this.selectedMonth)
//         .subscribe((data: any) => {
//           if (data) {
//             this.budgetAmount = data.total;
//             this.budgetCategories = data.categories;
//             this.createChart();
//           }
//           this.loading = false; // Stop loading after data is fetched
//         }, error => {
//           console.error('Error fetching budget data:', error);
//           this.loading = false; // Stop loading in case of an error
//         });
//     }
//   }
  

//   onPeriodChange() {
//     this.fetchBudgetData();
//   }

//   onCategoryChange() {
//     this.updateChart();
//   }

//   onSubmit() {
//     if (this.userId && this.selectedYear && this.selectedMonth) {
//       const path = `users/budgetHistory/${this.userId}/${this.selectedYear}/${this.selectedMonth}`;
//       this.budgetService.saveBudget(this.userId, this.selectedYear.toString(), this.selectedMonth, {
//         total: this.budgetAmount,
//         categories: this.budgetCategories,
//       }).then(() => {
//         console.log('Budget updated successfully');
//       });
//     }
//   }

//   private createChart() {
//     const canvas = document.getElementById('editBudgetChart') as HTMLCanvasElement;
//     if (canvas) {
//       const data = this.budgetCategories.map(category => category.amount);
//       const labels = this.budgetCategories.map(category => category.name);

//       this.editBudgetChart = new Chart(canvas, {
//         type: 'doughnut',
//         data: {
//           labels: labels,
//           datasets: [
//             {
//               data: data,
//               backgroundColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
//               borderColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//             tooltip: {
//               callbacks: {
//                 label: (tooltipItem) => `$${tooltipItem.raw}`,
//               },
//             },
//           },
//         },
//       });
//     } else {
//       console.error('Canvas element with id "editBudgetChart" not found.');
//     }
//   }

//   private updateChart() {
//     if (this.editBudgetChart) {
//       const data = this.budgetCategories.map(category => category.amount);
//       this.editBudgetChart.data.datasets[0].data = data;
//       this.editBudgetChart.update();
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { AuthService } from 'src/app/services/userauth.service'; // Adjust path as needed
import { BudgetService } from 'src/app/services/budget.service'; // Adjust path as needed

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.scss'],
})
export class EditBudgetComponent implements OnInit {
  budgetAmount: number = 0;
  budgetCategories = [
    { name: 'Income', amount: 0 },
    { name: 'Expense', amount: 0 },
    { name: 'Investment', amount: 0 },
    { name: 'Savings', amount: 0 },
    { name: 'Debt Payment', amount: 0 },
    { name: 'Transfer', amount: 0 },
    { name: 'Others', amount: 0 }
  ];
  availableYears: number[] = [];
  availableMonths: string[] = [];
  selectedYear: number | null = null;
  selectedMonth: string | null = null;
  chartData: any = {}; // Chart data
  chartOptions: any = {}; // Chart options
  private userId: string | null = null;

  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private budgetService: BudgetService
  ) {}

  ngOnInit() {
    this.loadAvailableYearsAndMonths();
    this.setDefaultDate();
    this.authService.getUserProfile().subscribe((user: { uid: string }) => {
      if (user) {
        this.userId = user.uid;
        this.fetchBudgetData();
      } else {
        console.error('User not authenticated');
        this.loading = false;
      }
    });
  }

  loadAvailableYearsAndMonths() {
    const currentYear = new Date().getFullYear();
    this.availableYears = [currentYear, currentYear + 1, currentYear + 2];
    this.availableMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  setDefaultDate() {
    const today = new Date();
    this.selectedYear = today.getFullYear();
    this.selectedMonth = this.availableMonths[today.getMonth()];
    console.log("year , month : ",this.selectedYear, this.selectedMonth)
  }

  fetchBudgetData() {
    if (this.userId && this.selectedYear && this.selectedMonth) {
      this.loading = true; // Start loading

      const path = `users/budgetHistory/${this.userId}/${this.selectedYear}/${this.selectedMonth}`;
      this.budgetService.getBudget(this.userId, this.selectedYear.toString(), this.selectedMonth)
        .subscribe((data: any) => {
          if (data) {
            this.budgetAmount = data.total;
            this.budgetCategories = data.categories;
            this.createChart();
          }
          this.loading = false; // Stop loading after data is fetched
        }, error => {
          console.error('Error fetching budget data:', error);
          this.loading = false; // Stop loading in case of an error
        });
    }
  }

  onPeriodChange() {
    this.fetchBudgetData();
  }

  onCategoryChange() {
    this.updateChart();
  }

  onSubmit() {
    if (this.userId && this.selectedYear && this.selectedMonth) {
      const path = `users/budgetHistory/${this.userId}/${this.selectedYear}/${this.selectedMonth}`;
      this.budgetService.saveBudget(this.userId, this.selectedYear.toString(), this.selectedMonth, {
        total: this.budgetAmount,
        categories: this.budgetCategories,
      }).then(() => {
        console.log('Budget updated successfully');
      });
    }
  }

  private createChart() {
    this.chartData = {
      labels: this.budgetCategories.map(category => category.name),
      datasets: [
        {
          data: this.budgetCategories.map(category => category.amount),
          backgroundColor: this.budgetCategories.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
          borderColor: this.budgetCategories.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
          borderWidth: 1,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: { raw: any; }) => `₹${tooltipItem.raw}`, // Indian Rupee symbol
          },
        },
      },
    };
  }

  private updateChart() {
    this.chartData = {
      labels: this.budgetCategories.map(category => category.name),
      datasets: [
        {
          data: this.budgetCategories.map(category => category.amount),
          backgroundColor: this.budgetCategories.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
          borderColor: this.budgetCategories.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
          borderWidth: 1,
        },
      ],
    };
  }
}
