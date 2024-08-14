import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.page.html',
  styleUrls: ['./sample.page.scss'],
})
export class SamplePage implements OnInit{

  data: any;
  dataamount: any[] = [];
  datayear: any[] = [];
  datacolor: any[] = [];
  databorder: any[] = [];

  constructor(private _commonService: CommonServiceService) {
    Chart.register(...registerables);}

  ngOnInit() {
    const res = this._commonService.showData();
      console.log(res)

      this.data = res;
      
      if (this.data != null) {
        for (let i = 0; i < this.data.length; i++) {
          this.datayear.push(this.data[i].year);
          this.dataamount.push(this.data[i].amount);
          this.datacolor.push(this.data[i].color);
          this.databorder.push(this.data[i].bordercolor);
        }
      }
    
    this.showChartData(this.datayear, this.dataamount, this.datacolor, this.databorder, 'barchart', 'bar');    
    this.showChartData(this.datayear, this.dataamount, this.datacolor, this.databorder, 'piechart', 'pie');
    this.showLine();
  }


  showChartData(datayear: any, dataamount: any, datacolor: any, databorder: any, id: string, types: any) {
    new Chart(id, {
      type: types,
      data: {
        labels: datayear,
        datasets: [{
          label: '# of Votes',
          data: dataamount,
          borderWidth: 1,
          backgroundColor: datacolor,
          borderColor: databorder
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getNextMonths(count: number): string[] {
    const months: string[] = [];
    const date = new Date();
    for (let i = 0; i < count; i++) {
      months.push(date.toLocaleString('default', { month: 'long' }));
      date.setMonth(date.getMonth() + 1);
    }
    return months;
  }

  showLine() {
    new Chart('linech', {
      type: 'line',
      data: {
        labels: this.getNextMonths(7),
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: 'start',
            borderColor: 'rgb(75, 192, 192, 0.5)',
            backgroundColor: 'rgb(75, 192, 192, 0.2)',
            tension: 'smooth'? 0.4 : 0
          },
          {
            label: 'My Second Dataset',
            data: [45, 19, 90, 61, 76, 85, 40],
            fill: 'start',
            borderColor: 'rgb(55, 132, 192, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          // x: {
          //   type: 'time',
          //   time: {
          //     // Luxon format string
          //     tooltipFormat: 'DD T'
          //   },
          //   title: {
          //     display: true,
          //     text: 'Date'
          //   }
          // },
          y: {
            title: {
              display: true,
              text: 'value'
            },

            beginAtZero: true
          }
        },
          plugins: {
            title: {
              text: 'Chart.js Time Scale',
              display: true
            }
          },

      },
      // plugins: {
      //     title: {
      //       display: true,
      //       text: (ctx='linech') => {
      //         const {axis = 'xy', intersect, mode} = ctx.chart.options.interaction;
      //         return 'Mode: ' + mode + ', axis: ' + axis + ', intersect: ' + intersect;
      //       }
      //     },
      //   }
      
    });
  }
}


// actions: [
//   {
//       name: 'Fill: false (default)',
//     handler: (chart) => {
//       chart.data.datasets.forEach(dataset => {
//         dataset.fill = false;
//       });
//       chart.update();
//     }
//   },
//   {
//     name: 'Fill: origin',
//     handler: (chart) => {
//       chart.data.datasets.forEach(dataset => {
//         dataset.fill = 'origin';
//       });
//       chart.update();
//     }
//   },
//   {
//     name: 'Fill: start',
//     handler: (chart) => {
//       chart.data.datasets.forEach(dataset => {
//         dataset.fill = 'start';
//       });
//       chart.update();
//     }
//   },
//   {
//     name: 'Fill: end',
//     handler: (chart) => {
//       chart.data.datasets.forEach(dataset => {
//         dataset.fill = 'end';
//       });
//       chart.update();
//     }
//   },
//   {
//     name: 'Randomize',
//     handler(chart) {
//       chart.data.datasets.forEach(dataset => {
//         dataset.data = generateData();
//       });
//       chart.update();
//     }
//   },
//   {
//     name: 'Smooth',
//     handler(chart) {
//       smooth = !smooth;
//       chart.options.elements.line.tension = smooth ? 0.4 : 0;
//       chart.update();
//     }
//   }
// ],
  
     
    // <block:setup:1>
// const labels = this.getNextMonths(7);
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };
// </block:setup>

// <block:config:0>
// const config = {
//   type: 'line',
//   data: data,
// };
// </block:config>



// }
