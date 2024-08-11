// import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js/auto';

// @Component({
//   selector: 'app-edit-budget',
//   templateUrl: './edit-budget.component.html',
//   styleUrls: ['./edit-budget.component.scss'],
// })
// export class EditBudgetComponent implements OnInit {
//   budgetAmount: number = 0;
//   budgetCategories = [
//     { name: 'Food', amount: 0 },
//     { name: 'Rent', amount: 0 },
//     { name: 'Utilities', amount: 0 },
//     // Add more categories as needed
//   ];
//   private editBudgetChart: Chart | any;

//   constructor() {Chart.register(...registerables);}

//   ngOnInit() {
//     this.loadBudget();
//     this.createChart();
//   }

//   loadBudget() {
//     // Load the existing budget data for the current month or future months
//     // Replace this with actual service call to fetch data
//     this.budgetAmount = 1500;
//     this.budgetCategories = [
//       { name: 'Food', amount: 300 },
//       { name: 'Rent', amount: 900 },
//       { name: 'Utilities', amount: 300 },
//       // Load other categories as needed
//     ];
//     this.updateChart();
//   }

//   onCategoryChange() {
//     this.updateChart();
//   }

//   onSubmit() {
//     // Handle the updating of the budget
//     console.log('Budget updated:', {
//       total: this.budgetAmount,
//       categories: this.budgetCategories,
//     });
//     // You can add the logic to update this data to a backend or local storage
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
    { name: 'debt payment', amount: 0},
    { name: 'transfer', amount: 0},
    { name: 'Others', amount: 0 } ];
  availableYears: number[] = [];
  availableMonths: string[] = [];
  selectedYear: number | null = null;
  selectedMonth: string | null = null;
  private editBudgetChart: Chart | any;
  private userId: string | null = null;

  constructor(
    private authService: AuthService,
    private budgetService: BudgetService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadAvailableYearsAndMonths();
    this.authService.getUserProfile().subscribe((user: { uid: string }) => {
      if (user) {
        this.userId = user.uid;
        this.fetchBudgetData();
      } else {
        console.error('User not authenticated');
      }
    });
  }

  loadAvailableYearsAndMonths() {
    // Populate availableYears and availableMonths
    const currentYear = new Date().getFullYear();
    this.availableYears = [currentYear, currentYear + 1, currentYear + 2];
    this.availableMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  fetchBudgetData() {
    if (this.userId && this.selectedYear && this.selectedMonth) {
      const path = `users/budgetHistory/${this.userId}/${this.selectedYear}/${this.selectedMonth}`;
      this.budgetService.getBudget(this.userId, this.selectedYear.toString(), this.selectedMonth).subscribe((data: any) => {
        if (data) {
          this.budgetAmount = data.total;
          this.budgetCategories = data.categories;
          this.createChart();
        }
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
    const canvas = document.getElementById('editBudgetChart') as HTMLCanvasElement;
    if (canvas) {
      const data = this.budgetCategories.map(category => category.amount);
      const labels = this.budgetCategories.map(category => category.name);

      this.editBudgetChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
              borderColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
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
                label: (tooltipItem) => `$${tooltipItem.raw}`,
              },
            },
          },
        },
      });
    } else {
      console.error('Canvas element with id "editBudgetChart" not found.');
    }
  }

  private updateChart() {
    if (this.editBudgetChart) {
      const data = this.budgetCategories.map(category => category.amount);
      this.editBudgetChart.data.datasets[0].data = data;
      this.editBudgetChart.update();
    }
  }
}
