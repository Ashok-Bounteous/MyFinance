import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/userauth.service'; // Adjust the path as needed

@Component({
  selector: 'app-show-budget',
  templateUrl: './show-budget.component.html',
  styleUrls: ['./show-budget.component.scss'],
})
export class ShowBudgetComponent implements OnInit, OnDestroy {
  selectedYear: string = '';
  selectedMonth: string = '';
  availableYears: string[] = [];
  availableMonths: string[] = [];
  budgetData: any;
  pieChartData: any; // Data for the pie chart
  private allUserData: any;

  private authSubscription: Subscription | undefined;
  private dbSubscription: Subscription | undefined;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.getUserProfile().subscribe((user: { uid: string }) => {
      if (user) {
        this.fetchBudgetData(user.uid);
      } else {
        console.error('User not authenticated');
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.dbSubscription?.unsubscribe();
  }

  onYearChange() {
    this.selectedMonth = ''; // Reset the month selection
    this.loadMonthsForYear(this.selectedYear);
  }

  onMonthChange(month: string) {
    this.selectedMonth = month;
    this.onPeriodChange();
  }

  onCumulativeChange() {
    this.selectedMonth = ''; // No month selected indicates cumulative
    this.aggregateMonthlyData();
  }

  private fetchBudgetData(uid: string) {
    const path = `users/budgetHistory/${uid}`;
    this.dbSubscription = this.db.object(path).valueChanges().subscribe(data => {
      if (data) {
        this.allUserData = data;
        this.loadAvailableYears();
      } else {
        console.error('No budget data found');
      }
    });
  }

  private loadAvailableYears() {
    if (this.allUserData) {
      this.availableYears = Object.keys(this.allUserData);
      if (this.availableYears.length > 0) {
        this.selectedYear = this.availableYears[0];
        this.loadMonthsForYear(this.selectedYear);
      }
    }
  }

  private loadMonthsForYear(year: string) {
    const yearData = this.allUserData[year];
    if (yearData) {
      this.availableMonths = Object.keys(yearData);
      if (this.availableMonths.length > 0 && !this.selectedMonth) {
        this.selectedMonth = this.availableMonths[0];
        this.onPeriodChange();
      }
    }
  }

  private onPeriodChange() {
    if (!this.selectedMonth) {
      // Cumulative data
      this.aggregateMonthlyData();
    } else {
      // Specific month data
      this.budgetData = this.allUserData?.[this.selectedYear]?.[this.selectedMonth] || {};
      this.createPieChartData();
    }
  }

  private aggregateMonthlyData() {
    if (this.allUserData) {
      // Aggregate all months' data under the selected year
      const yearData = this.allUserData[this.selectedYear];
      const cumulativeData: any = {};
      if (yearData) {
        Object.keys(yearData).forEach(month => {
          const monthData = yearData[month];
          Object.keys(monthData).forEach(category => {
            if (!cumulativeData[category]) {
              cumulativeData[category] = 0;
            }
            cumulativeData[category] += monthData[category];
          });
        });
        this.budgetData = cumulativeData;
        this.createPieChartData();
      }
    }
  }

  private createPieChartData() {
    if (this.budgetData) {
      const labels = Object.keys(this.budgetData);
      const data = Object.values(this.budgetData);

      this.pieChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 0.2)`),
            borderColor: labels.map((_, i) => `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${(i * 150) % 255}, 1)`),
            borderWidth: 1,
          },
        ],
      };
    }
  }
}
