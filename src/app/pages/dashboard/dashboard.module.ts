import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BaseChartDirective } from 'ng2-charts';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    IonicModule.forRoot(), 
    DashboardPageRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BaseChartDirective, 
    HttpClientModule, 
    ReactiveFormsModule, 
    FormsModule,
    LoadingModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
