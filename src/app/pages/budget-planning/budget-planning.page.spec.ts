import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetPlanningPage } from './budget-planning.page';

describe('BudgetPlanningPage', () => {
  let component: BudgetPlanningPage;
  let fixture: ComponentFixture<BudgetPlanningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPlanningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
