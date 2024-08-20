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
