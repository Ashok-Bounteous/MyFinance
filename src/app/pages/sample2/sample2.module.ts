import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sample2PageRoutingModule } from './sample2-routing.module';

import { Sample2Page } from './sample2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sample2PageRoutingModule
  ],
  declarations: [Sample2Page]
})
export class Sample2PageModule {}
