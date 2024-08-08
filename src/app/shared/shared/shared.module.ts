import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    CardModule,
  ],
  exports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    CardModule,
  ]
})
export class SharedModule { }
