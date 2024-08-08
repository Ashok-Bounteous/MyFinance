import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyDataPageRoutingModule } from './company-data-routing.module';

import { CompanyDataPage } from './company-data.page';
import { CompanyChartComponent } from 'src/app/components/company-chart/company-chart.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CompanyEffects } from 'src/app/store/effects/company.effects';
import { companyReducer } from 'src/app/store/reducers/company.reducer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyDataPageRoutingModule,
    StoreModule.forFeature('company', companyReducer),
    EffectsModule.forFeature([CompanyEffects])
  ],
  declarations: [CompanyDataPage, CompanyChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyDataPageModule {}
