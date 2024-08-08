import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.page.html',
  styleUrls: ['./budget-planning.page.scss'],
})
export class BudgetPlanningPage implements OnInit {
  budgetForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.budgetForm = this.fb.group({
      budgetName: ['', Validators.required],
      amount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value);
      // Handle form submission logic
    }
  }
}
