import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { GenericCrudTableComponent } from './generic-crud-table.component';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';



@NgModule({
  declarations: [
    GenericCrudTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GenericCrudTableComponent
  ],
  providers: [
    GenericModalComponent
  ]
})
export class GenericCrudTableModule { }
