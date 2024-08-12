// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.page.html',
//   styleUrls: ['./dashboard.page.scss'],
// })
// export class DashboardPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//     console.log("")
//   }

// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/app.layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  items!: MenuItem[];
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;

    dashboardCards = [
      {
        title: 'Tasks',
        value: '12',
        icon: 'checkmark-done-circle',
        color: 'success',
        iconClass: 'icon-task',
        iconBgColor: 'bg-success',
        subtitle: 'Pending',
        footer: 'Updated 2 mins ago',
      },
      {
        title: 'Budget Planner',
        value: '$3,200',
        icon: 'wallet',
        color: 'primary',
        iconClass: 'icon-budget',
        iconBgColor: 'bg-primary',
        subtitle: 'Monthly Spending',
        footer: 'Updated 1 hour ago',
      },
      {
        title: 'Market Data',
        value: '18.2%',
        icon: 'trending-up',
        color: 'warning',
        iconClass: 'icon-market',
        iconBgColor: 'bg-warning',
        subtitle: 'Growth',
        footer: 'Updated 3 hours ago',
      },
      {
        title: 'Past Transactions',
        value: '45',
        icon: 'receipt',
        color: 'danger',
        iconClass: 'icon-transactions',
        iconBgColor: 'bg-danger',
        subtitle: 'Transactions',
        footer: 'Updated yesterday',
      }
    ];
  
    bestSellingProducts = [
      {
        name: 'Task Manager',
        sales: 120,
        revenue: '$2,400',
        progress: 75,
        progressClass: 'bg-success',
        category: 'Productivity',
      },
      {
        name: 'Budget Planner',
        sales: 90,
        revenue: '$1,800',
        progress: 60,
        progressClass: 'bg-primary',
        category: 'Finance',
      },
    ];
  
    todayNotifications = [
      {
        message: 'New task added to the task manager.',
        time: '2 mins ago',
        iconClass: 'icon-task',
        iconBgColor: 'bg-success',
      },
      {
        message: 'Budget update for this month.',
        time: '1 hour ago',
        iconClass: 'icon-budget',
        iconBgColor: 'bg-primary',
      }
    ];
  
    yesterdayNotifications = [
      {
        message: 'Market data updated.',
        time: 'Yesterday',
        iconClass: 'icon-market',
        iconBgColor: 'bg-warning',
      },
      {
        message: 'Transaction history updated.',
        time: 'Yesterday',
        iconClass: 'icon-transactions',
        iconBgColor: 'bg-danger',
      }
    ];
  
  
  // todayNotifications = [
  //   {
  //     message: 'New order received from John Doe',
  //     time: '10:30 AM'
  //   },
  //   {
  //     message: 'Payment processed for Invoice #1234',
  //     time: '09:15 AM'
  //   },
  //   {
  //     message: 'New customer registered: Jane Smith',
  //     time: '08:45 AM'
  //   }
  // ];
  
  // bestSellingProducts = [
  //   {
  //     name: 'Wireless Headphones',
  //     sales: 120,
  //     revenue: '$4,500'
  //   },
  //   {
  //     name: 'Smartphone',
  //     sales: 95,
  //     revenue: '$18,000'
  //   },
  //   {
  //     name: 'Laptop',
  //     sales: 60,
  //     revenue: '$30,000'
  //   },
  //   {
  //     name: 'Smart Watch',
  //     sales: 75,
  //     revenue: '$7,500'
  //   }
  // ];
  
  // yesterdayNotifications = [
  //   {
  //     message: 'Order #5678 shipped to Alice Johnson',
  //     time: '05:30 PM'
  //   },
  //   {
  //     message: 'Refund processed for Order #1234',
  //     time: '04:10 PM'
  //   },
  //   {
  //     message: 'New review submitted for "Wireless Headphones"',
  //     time: '03:50 PM'
  //   }
  // ];
  

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.initChart();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => {
        this.initChart();
      });
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
