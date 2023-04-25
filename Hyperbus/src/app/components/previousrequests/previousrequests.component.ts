import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css']
})

export class PreviousrequestsComponent implements OnInit {
  public requests = [];
  public avgReqPerDay = 0;
  public avgReqPerWeek = 0;
  public totalReq = 0;
  public totalReqWithSubjectFound = 0;
  public totalReqWithMismatch = 0;
  public avgReqPerDayvsLastWeek = 0;
  public avgReqPerWeekvsLastWeek =0;
  public totalReqvsLastWeek =0;
  public totalReqWithSubjectFoundvsLastWeek = 0;
  public totalReqWithMismatchvsLastWeek = 0;
  public pageNo = 1;
  public limit = 10;
  public total = 0;
  // public ProductHeader = [{ Number: 25 }, { Number: 50}, { Number: 100 }]; 
  public selectedNoList = '';

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService) { }

  ngOnInit(){
    this.getRequests();
    this.getRequestCounts();
  }

  getRequests() {
    this.PreviousRequestsService.getAllRequests(this.pageNo, this.limit)
    .subscribe(response => {
      console.log(response)
      this.requests = response && response.data && response.data.data;
      this.total = response && response.data && response.data.total;
      if(this.requests && this.requests.length>0) {
        this.requests.map((req: {
          status: boolean; createdAt: string | number | Date; }) => {
          let dt = new Date(req.createdAt);
          let month = dt.toLocaleString('default', { month: 'long' });
          let yr = dt.getFullYear();
          let date = dt.getDate();
          let time = dt.getHours() + "." + dt.getMinutes();
          req.createdAt = month + " " + date + ", " + yr + " " + time
        })
      }
    })
  }

  getRequestCounts() {
    this.PreviousRequestsService.getRequestCounts()
    .subscribe(response => {
      let res = response && response && response.data;
      this.avgReqPerDay = res.avgReqPerDay;
      this.avgReqPerWeek = res.avgReqPerWeek;
      this.totalReq = res.totalReq;
      this.totalReqWithSubjectFound = res.totalReqWithSubjectFound;
      this.totalReqWithMismatch = res.totalReqWithMismatch;
      this.avgReqPerDayvsLastWeek = res.avgReqPerDayvsLastWeek;
      this.avgReqPerWeekvsLastWeek = res.avgReqPerWeekvsLastWeek;
      this.totalReqvsLastWeek = res.totalReqvsLastWeek;
      this.totalReqWithSubjectFoundvsLastWeek = res.totalReqWithSubjectFoundvsLastWeek;
      this.totalReqWithMismatchvsLastWeek = res.totalReqWithMismatchvsLastWeek;
    })
  }


  onTableDataChange(event: number) {
    this.pageNo = event;
    this.getRequests();
  }

  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedNoList = event.target.value;
    this.limit = event.target.value;
    this.getRequests();

  }
}