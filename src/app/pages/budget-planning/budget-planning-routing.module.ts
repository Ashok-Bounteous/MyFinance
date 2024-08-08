import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetPlanningPage } from './budget-planning.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetPlanningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetPlanningPageRoutingModule {}
