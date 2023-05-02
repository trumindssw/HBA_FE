import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css']
})

export class PreviousrequestsComponent implements OnInit {
  public requests!: Requests[];
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
  public requestDetailData = [];
  
  public selectedNoList = '';
  public classNames = 'main';
  columns = ['requestID', 'subjectName', 'createdAt', 'statusMessage'];
  columnsToDisplay = ['Request ID', 'Subject Name', 'Created At', 'Status Message']
  @ViewChild('paginator') paginator!: MatPaginator;
  

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService) { }

  ngOnInit(){
    this.getRequests(this.pageNo, this.limit);
    this.getRequestCounts();
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.getRequests(this.paginator.pageIndex+1, this.paginator.pageSize))
        )
        .subscribe();
}

  getRequests(pageNo: number, pageSize: number) {
    this.PreviousRequestsService.getAllRequests(pageNo,pageSize)
    .subscribe(response => {
      console.log(response)
      this.requests = response && response.data && response.data.data;
      this.total = response && response.data && response.data.total;
      if(this.requests && this.requests.length>0) {
        this.requests.map((req: Requests) => {
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

  isVerified(statusMessage: String) {
    if(statusMessage == 'Verified') {
      return true;
    } else {
      return false;
    }
  }

  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
  
}

export interface Requests {
  requestID: string;
  subjectName: string;
  createdAt: string;
  statusMessage: string;
}
