import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    CardModule,
    ChipModule,
    AutoCompleteModule,
    MultiSelectModule,
    AccordionModule,
    ButtonModule,
    ChartModule
  ],
  exports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    CardModule,
    ChipModule,
    AutoCompleteModule,
    MultiSelectModule,
    AccordionModule,
    ButtonModule,
    ChartModule
  ]
})
export class SharedModule { }
