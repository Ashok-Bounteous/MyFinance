import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPlanningPageRoutingModule } from './budget-planning-routing.module';

import { BudgetPlanningPage } from './budget-planning.page';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { ShowBudgetComponent } from './show-budget/show-budget.component';
import { EditBudgetComponent } from './edit-budget/edit-budget.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetPlanningPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BudgetPlanningPage, NewBudgetComponent, ShowBudgetComponent, EditBudgetComponent]
})
export class BudgetPlanningPageModule {}
