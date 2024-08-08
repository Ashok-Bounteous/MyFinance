import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastTransactionsPage } from './past-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: PastTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastTransactionsPageRoutingModule {}
