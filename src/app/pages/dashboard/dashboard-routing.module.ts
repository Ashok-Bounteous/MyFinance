import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.service';// Adjust the import path to match your file structure

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'company-data',
      //   pathMatch: 'full'
      // },
      // {
      //   path: 'home',
      //   loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule)
      // },
      // {
      //   path: 'add-bank-account',
      //   loadChildren: () => import('../add-bank-account/add-bank-account.module').then(m => m.AddBankAccountPageModule)
      // },
      // {
      //   path: 'budget-planning',
      //   loadChildren: () => import('../budget-planning/budget-planning.module').then(m => m.BudgetPlanningPageModule)
      // },
      // {
      //   path: 'company-data',
      //   loadChildren: () => import('../company-data/company-data.module').then(m => m.CompanyDataPageModule)
      // },
      // {
      //   path: '**',
      //   redirectTo: 'home'
      // }
    ],
    // canActivate: [AuthGuard] // Protects child routes within the dashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
