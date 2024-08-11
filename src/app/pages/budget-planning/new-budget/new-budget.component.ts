import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss'],
})
export class NewBudgetComponent implements OnInit {
  budgetAmount: number = 0;
  budgetCategories = [
    { name: 'Food', amount: 0 },
    { name: 'Rent', amount: 0 },
    { name: 'Utilities', amount: 0 },
    // Add more categories as needed
  ];
  private newBudgetChart: Chart | any;// undefined;

  constructor() {Chart.register(...registerables);}

  ngOnInit() {
    this.createChart();
  }

  onCategoryChange() {
    this.updateChart();
  }

  onSubmit() {
    // Handle the saving of the new budget
    console.log('Budget saved:', {
      total: this.budgetAmount,
      categories: this.budgetCategories,
    });
    // You can add the logic to save this data to a backend or local storage
  }

  private createChart() {
    const canvas = document.getElementById('newBudgetChart') as HTMLCanvasElement;
    if (canvas) {
      const data = this.budgetCategories.map(category => category.amount);
      const labels = this.budgetCategories.map(category => category.name);

      this.newBudgetChart = new Chart(canvas, {
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
      console.error('Canvas element with id "newBudgetChart" not found.');
    }
  }

  private updateChart() {
    if (this.newBudgetChart) {
      const data = this.budgetCategories.map(category => category.amount);
      this.newBudgetChart.data.datasets[0].data = data;
      this.newBudgetChart.update();
    }
  }
}
