import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { NgModule } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TrendsService } from '../../_services/trends/trends.service';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { DatasharingService } from '../../_services/datasharing/datasharing.service';

interface GraphData {
  [date: string]: {
    totalRequestCount: number;
    countMatchNotFound: number;
    countWithOK: number;
  };
}

interface ApiResponse {
  status: number;
  message: string;
  data: GraphData;
}

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent {

  constructor (
    private http: HttpClient,
    private TrendsService:TrendsService,
    private DatasharingService:DatasharingService,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}
    ){}

    public  endDateTrend : any ;
    public startDateTrend : any;
    public view=true;

    ngOnInit() {
      this.startDateTrend = this.DatasharingService.getVariable1();
      this.endDateTrend = this.DatasharingService.getVariable2();
      this.view = this.DatasharingService.getVariableView();
      this.fetchGraphData();
    }

    chart: any;
    public graphData: ChartDataset[] = [];
    public graphLabels: string[] = [];
    public graphOptions: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };
    public graphType: ChartType = 'bar';
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    fetchGraphData() {
       this.TrendsService.getDailyAndWeeklyCnt(this.startDateTrend, this.endDateTrend,this.view).subscribe(
        response => {
          console.log("getDailyAndWeeklyCnt response",response);
          console.log("getDailyAndWeeklyCnt data response",response.data);
          console.log(this.startDateTrend);
          console.log(this.endDateTrend);
          console.log(this.view);

          const graphData = response.data;
          const dates = Object.keys(graphData);
          this.graphLabels = dates;
          this.graphData = [
            {
              data: dates.map((date) => graphData[date].countMatchNotFound),
              label: 'Count Match Not Found',
              type: 'bar',
              backgroundColor: '#F6BE00', 
              borderColor: '#F6BE00', 
              borderWidth: 0.5, 
              stack: 'stacked'
            },
            {
              data: dates.map((date) => graphData[date].countWithOK),
              label: 'Count With OK',
              type: 'bar',
              backgroundColor: '#83BD31', 
              borderColor: '#83BD31', 
              borderWidth: 0.5,
              stack: 'stacked'
            },
            {
              data: dates.map((date) => graphData[date].totalRequestCount),
              label: 'Total Request Count',
              type: 'line',
              borderColor: '#313DBD',
              backgroundColor: '#313DBD',
              borderWidth: 3, 
              fill: false, 
              pointStyle: 'triangle', 
              pointBackgroundColor: '#313DBD',
              pointBorderColor: '#D22B2B',
            },
          ];
        }
      );
    }

    chartClicked(event: any) {
      // Handle chart click event
    }
  
    chartHovered(event: any) {
      // Handle chart hover event
    }
   
}
