// import { Component, Input, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-company-chart',
//   templateUrl: './company-chart.component.html',
//   styleUrls: ['./company-chart.component.scss'],
// })
// export class CompanyChartComponent implements OnInit {
//   @Input() companyData: any;

//   ngOnInit() {
//     if (this.companyData) {
//       this.createChart(this.companyData);
//     }
//   }

//   createChart(data: any) {
//     const dates = Object.keys(data['Weekly Time Series']).map(date => new Date(date));
//     const closePrices = dates.map(date => parseFloat(data['Weekly Time Series'][date.toISOString().split('T')[0]]['4. close']));
//     const highPrices = dates.map(date => parseFloat(data['Weekly Time Series'][date.toISOString().split('T')[0]]['2. high']));
//     const lowPrices = dates.map(date => parseFloat(data['Weekly Time Series'][date.toISOString().split('T')[0]]['3. low']));

//     new Chart('companyChart', {
//       type: 'line',
//       data: {
//         labels: dates,
//         datasets: [
//           {
//             label: 'Weekly Close Prices',
//             data: closePrices,
//             borderColor: 'rgb(75, 192, 192)',
//             backgroundColor: 'rgb(75, 192, 192, 0.2)',
//             tension: 0.1,
//             pointRadius: 0,
//             borderWidth: 1,
//             fill: true,
//           },
//           {
//             label: 'Weekly High Prices',
//             data: highPrices,
//             borderColor: 'rgb(192, 75, 75)',
//             tension: 0.1,
//             pointRadius: 0,
//             borderWidth: 1,
//             fill: true,
//           },
//           {
//             label: 'Weekly Low Prices',
//             data: lowPrices,
//             borderColor: 'rgb(75, 75, 192)',
//             tension: 0.1,
//             // radius: 0,
//             borderWidth: 1,
//             pointRadius: 1,
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               unit: 'week',
//               tooltipFormat: 'PP' // Pretty print date format for tooltip
//             },
//           },
//           y: {
//             beginAtZero: false,
//           },
//         },
//       },
//     });
//   }
// }


import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

@Component({
  selector: 'app-company-chart',
  templateUrl: './company-chart.component.html',
  styleUrls: ['./company-chart.component.scss'],
})
export class CompanyChartComponent implements OnChanges, OnDestroy {
  @Input() companyData: any;
  private chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companyData'] && this.companyData) {
      this.createChart(this.companyData);
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  createChart(data: any) {
    if (!data || !data.timeSeries || !Array.isArray(data.timeSeries)) return;

    const dates = data.timeSeries.map((item: any) => new Date(item.date));
    const closePrices = data.timeSeries.map((item: any) => item.close);
    const highPrices = data.timeSeries.map((item: any) => item.high);
    const lowPrices = data.timeSeries.map((item: any) => item.low);

    this.destroyChart();

    const ctx = document.getElementById('companyChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Close Prices',
            data: closePrices,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            pointRadius: 0,
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'High Prices',
            data: highPrices,
            borderColor: 'rgb(192, 75, 75)',
            tension: 0.1,
            pointRadius: 0,
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'Low Prices',
            data: lowPrices,
            borderColor: 'rgb(75, 75, 192)',
            tension: 0.1,
            borderWidth: 1,
            pointRadius: 1,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
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
              tooltipFormat: 'PP', // Pretty print date format for tooltip
            },
            title: {
                  display: true,
                  text: 'Date'
                },
          },
          y: {
            title: {
              display: true,
              text: 'value'
            },
            beginAtZero: false,
          },
        },
        plugins: {
          title: {
            text: `Trading History`,
            display: true
          }
        },
      },
    });
  }

  getTimeSeriesUnit(dates: Date[]): 'day' | 'week' | 'month' | 'quarter' | 'year' {
    if (dates.length < 2) return 'day'; // Default to 'day' if not enough data

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
}
