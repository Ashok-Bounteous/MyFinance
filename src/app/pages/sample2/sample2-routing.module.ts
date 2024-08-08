import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sample2Page } from './sample2.page';

const routes: Routes = [
  {
    path: '',
    component: Sample2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sample2PageRoutingModule {}
