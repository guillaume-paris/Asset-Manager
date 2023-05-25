import { Component, OnInit } from '@angular/core';
import { EChartsOption, List } from 'echarts';
import { data } from 'jquery';
import { IGenericTable, IGenericTableRow } from 'src/_shared/models/generic-crud-table.model';
import { GenericToastService } from 'src/_shared/services/generic-toast.service';
import { StatisticService } from 'src/_shared/services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  isLoading: boolean[] = [true, true, true, true, true, true, true, true];
  isUnavailable: boolean[] = [false, false, false, false, false, false, false, false];
  users: IGenericTable | undefined;
  assets: IGenericTable | undefined;
  assetsManagement: IGenericTable | undefined;

  totalUsers: number = 0;

  totalAssets: number = 0;
  freeAssets: number = 0;

  totalAssetsManagement: number = 0;
  freeAssetsManagement: number = 0;

  usersChartOption!: EChartsOption;
  assetsChartOption!: EChartsOption;
  assetsManagementChartOption!: EChartsOption;
  assetsPieChartOption!: EChartsOption;

  constructor(private statisticService: StatisticService, private toastService: GenericToastService) { }

  ngOnInit() {
    this.statisticService.getUserCount().subscribe(data => {this.totalUsers = data; this.isLoading[0] = false;}, error => {this.isUnavailable[0] = true; this.isLoading[0] = false;});
    this.statisticService.getAssetCount().subscribe(data => {this.totalAssets = data; this.isLoading[1] = false;}, error => {this.isUnavailable[1] = true; this.isLoading[1] = false;});
    this.statisticService.getAssetManagementCount().subscribe(data => {this.totalAssetsManagement = data; this.isLoading[2] = false;}, error => {this.isUnavailable[2] = true; this.isLoading[2] = false;});
    this.statisticService.getFreeAssetCount().subscribe(data => {this.freeAssets = data; this.isLoading[3] = false;}, error => {this.isUnavailable[3] = true; this.isLoading[3] = false;});


    this.statisticService.getUsers().subscribe(
      ({ totalUsers, users }) => {
        this.users = users;
        const usersData = this.getDatesAndCounts(users.rows, 4);
        this.usersChartOption = this.getChartOption(usersData.dates, usersData.counts);
      }
    );

    this.statisticService.getAssets().subscribe(
      ({ totalAssets, assets }) => {
        this.assets = assets;
        const assetsData = this.getDatesAndCounts(assets.rows, 5);
        this.assetsChartOption = this.getChartOption(assetsData.dates, assetsData.counts);

        this.statisticService.getFreeAssets().subscribe(
          ({ freeAssets }) => {
            this.updateAssetsPieChart();
          }
        );
      }
    );

    this.statisticService.getAssetsManagement().subscribe(
      ({ totalAssetsManagement, assetsManagement }) => {
        this.assetsManagement = assetsManagement;
        const assetsManagementData = this.getDatesAndCounts(assetsManagement.rows, 2);
        this.assetsManagementChartOption = this.getChartOption(assetsManagementData.dates, assetsManagementData.counts);
      }
    );
  }

  getDatesAndCounts(rows: IGenericTableRow[], placeOfCreatedAtInList: number): {dates: string[], counts: number[]} {
    const dates = rows.map(row => row.values[placeOfCreatedAtInList]);
    dates.sort();
  
    const counts = dates.map((date, index) => index + 1);
  
    return {dates, counts};
  }

  getChartOption(dates: string[], counts: number[]): EChartsOption {
    return {
      xAxis: {
        type: 'category',
        data: dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: counts,
          type: 'line',
          areaStyle: {},
        },
      ],
    };
  }

  updateAssetsPieChart(): void {
    const nonFreeAssets = this.totalAssets - this.freeAssets;
    this.assetsPieChartOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: 'Assets',
          type: 'pie',
          radius: '55%',
          data: [
            { value: this.freeAssets, name: 'Free Assets' },
            { value: nonFreeAssets, name: 'Linked Assets' },
          ]
        }
      ]
    };
  }
}
