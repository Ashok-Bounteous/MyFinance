import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBankAccountPageRoutingModule } from './add-bank-account-routing.module';

import { AddBankAccountPage } from './add-bank-account.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBankAccountPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AutoCompleteModule
  ],
  declarations: [AddBankAccountPage],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddBankAccountPageModule {}
