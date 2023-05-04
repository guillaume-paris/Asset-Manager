import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IGenericTable } from 'src/_shared/models/generic-crud-table.model';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { StatisticService } from 'src/_shared/services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  users: IGenericTable | undefined;
  assets: IGenericTable | undefined;
  assetsManagement: IGenericTable | undefined;

  totalUsers: number = 0;

  totalAssets: number = 0;
  freeAssets: number = 0;

  totalAssetsManagement: number = 0;
  freeAssetsManagement: number = 0

  constructor(private statisticService: StatisticService, private toastService: GenericToastService) {
    statisticService.getUsers().subscribe(
      ({ totalUsers, users }) => {
        this.totalUsers = totalUsers;
        this.users = users;
      }
    );
    statisticService.getAssets().subscribe(
      ({ totalAssets, assets }) => {
        this.totalAssets = totalAssets;
        this.assets = assets;
      }
    );
    statisticService.getAssetsManagement().subscribe(
      ({ totalAssetsManagement, assetsManagement }) => {
        console.log(assetsManagement);
        console.log(totalAssetsManagement);
        this.totalAssetsManagement = totalAssetsManagement;
        this.assetsManagement = assetsManagement
      }
    );
  }

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  pieChartUserTotal: EChartsOption = {
    series: [
      {
        type: 'pie',
         data: [
          {
            value: 335,
            name: 'Direct Visit'
          },
          {
            value: 234,
            name: 'Union Ad'
          },
          {
            value: 1548,
            name: 'Search Engine'
          }
        ],
        radius: '80%'
      }
    ]
  };

}
