import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { NgChartsModule } from 'ng2-charts';
import { PastTransactionsPageRoutingModule } from './past-transactions-routing.module';
import { PastTransactionsPage } from './past-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastTransactionsPageRoutingModule,
    // NgChartsModule
  ],
  declarations: [PastTransactionsPage]
})
export class PastTransactionsPageModule {}
