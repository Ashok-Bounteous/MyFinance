import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyDataPage } from './company-data.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyDataPageRoutingModule {}
