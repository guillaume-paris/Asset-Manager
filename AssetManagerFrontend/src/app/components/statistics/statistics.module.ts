import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsComponent } from './statistics.component';
import { SharedModule } from 'src/_shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
