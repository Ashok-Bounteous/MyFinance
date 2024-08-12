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
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { StepperModule } from 'primeng/stepper';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    ChartModule,
    StyleClassModule,
    PanelMenuModule,
    MenuModule,
    StepperModule,
    InputNumberModule,
    ProgressSpinnerModule
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
    ChartModule,
    StyleClassModule,
    PanelMenuModule,
    MenuModule,
    StepperModule,
    InputNumberModule,
    ProgressSpinnerModule
  ]
})
export class SharedModule { }
