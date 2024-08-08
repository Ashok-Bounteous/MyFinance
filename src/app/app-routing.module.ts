import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard.service';  // Adjust the import path to match your file structure

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogIn = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
    
  },
  {
    path: 'company-data',
    loadChildren: () => import('./pages/company-data/company-data.module').then(m => m.CompanyDataPageModule),
    ...canActivate(redirectUnauthorizedToLogIn)
    // canActivate: [AuthGuard]  // Protects the entire dashboard module
  },  
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    ...canActivate(redirectUnauthorizedToLogIn)  // Protects the entire dashboard module
  },
  {
    path: 'task-manager',
    loadChildren: () => import('./pages/task-manager/task-manager.module').then( m => m.TaskManagerPageModule),
    ...canActivate(redirectUnauthorizedToLogIn)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'add-bank-account',
    loadChildren: () => import('./pages/add-bank-account/add-bank-account.module').then(m => m.AddBankAccountPageModule)
  },
  {
    path: 'budget-planning',
    loadChildren: () => import('./pages/budget-planning/budget-planning.module').then(m => m.BudgetPlanningPageModule)
  },
  {
    path: 'sample',
    loadChildren: () => import('./pages/sample/sample.module').then(m => m.SamplePageModule)
  },
  {
    path: 'sample2',
    loadChildren: () => import('./pages/sample2/sample2.module').then( m => m.Sample2PageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'past-transactions',
    loadChildren: () => import('./pages/past-transactions/past-transactions.module').then( m => m.PastTransactionsPageModule)
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
