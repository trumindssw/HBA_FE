import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { tap } from 'rxjs';

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
  // public ProductHeader = [{ Number: 25 }, { Number: 50}, { Number: 100 }]; 
  public selectedNoList = '';
  public classNames = 'main';
  columns = ['requestID', 'subjectName', 'createdAt', 'statusMessage'];
  columnsToDisplay = ['Request ID', 'Subject Name', 'Created At', 'Status Message']
  @ViewChild('paginator') paginator!: MatPaginator;
  

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService,
    // private RequestDetailsComponents: RequestdetailsComponent,
    private dialog: MatDialog) { }

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
          let timeZone = '';
          // Get system's timezone
          if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          }
          let dte = dt.toLocaleString(
            'en-US', { 
              month: 'long', 
              year: 'numeric', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit', 
              timeZone: timeZone 
            });
          req.createdAt = dte.toString();
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

  openDialog(reqId: string) {
    const dialog = this.dialog.open(RequestdetailsComponent,{
     data: { name: reqId },
    });
    dialog.afterClosed().subscribe(result =>{
      console.log('result')
    });
  }
}

export interface Requests {
  requestID: string;
  subjectName: string;
  createdAt: string;
  statusMessage: string;
}
