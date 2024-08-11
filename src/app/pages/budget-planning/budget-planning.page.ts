// import { Component, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js/auto';

// @Component({
//   selector: 'app-budget-planning',
//   templateUrl: './budget-planning.page.html',
//   styleUrls: ['./budget-planning.page.scss'],
// })
// export class BudgetPlanningPage implements OnInit {
//   selectedSegment: string = 'view';
//   selectedPeriod: string = '';
//   availablePeriods: string[] = []; // Populate with actual periods (e.g., ['Jan 2024', 'Feb 2024'])
//   private viewBudgetChart: Chart | any;//undefined;

//   constructor() {Chart.register(...registerables);}

//   ngOnInit() {
//     this.loadAvailablePeriods();
//   }

//   onSegmentChanged() {
//     if (this.selectedSegment === 'view') {
//       this.loadBudget();
//     }
//   }

//   loadAvailablePeriods() {
//     // Load available periods from backend or generate dynamically
//     this.availablePeriods = ['Jan 2024', 'Feb 2024', 'Mar 2024']; // Example data
//   }

//   loadBudget() {
//     // Load the budget data for the selected period
//     const budgetData = {
//       labels: ['Food', 'Rent', 'Utilities'],
//       data: [300, 900, 300],
//     };

//     this.createViewBudgetChart(budgetData);
//   }

//   private createViewBudgetChart(chartData: { labels: string[]; data: number[] }) {
//     const canvas = document.getElementById('viewBudgetChart') as HTMLCanvasElement;
//     if (canvas) {
//       if (this.viewBudgetChart) {
//         this.viewBudgetChart.destroy(); // Destroy previous chart to avoid overlap
//       }

//       this.viewBudgetChart = new Chart(canvas, {
//         type: 'pie',
//         data: {
//           labels: chartData.labels,
//           datasets: [
//             {
//               data: chartData.data,
//               backgroundColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
//               borderColor: chartData.labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
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
//                 label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw}`,
//               },
//             },
//           },
//         },
//       });
//     } else {
//       console.error('Canvas element with id "viewBudgetChart" not found.');
//     }
//   }

//   showNewBudgetForm() {
//     this.selectedSegment = 'new';
//   }
// }


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.page.html',
  styleUrls: ['./budget-planning.page.scss'],
})
export class BudgetPlanningPage implements OnInit {
  selectedSegment: string = 'view';

  constructor() {}

  ngOnInit() { console.log}

  onSegmentChanged() {
    // No need to directly fetch budget data here
    // Components will handle their own data fetching based on the selected segment
  }

  showNewBudgetForm() {
    this.selectedSegment = 'new';
  }
}
