import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetPlanningPageRoutingModule } from './budget-planning-routing.module';

import { BudgetPlanningPage } from './budget-planning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetPlanningPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BudgetPlanningPage]
})
export class BudgetPlanningPageModule {}
