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
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }
