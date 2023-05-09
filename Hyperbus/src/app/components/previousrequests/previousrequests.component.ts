import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { tap } from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css'],
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
  public lastWeek = false;
  public lastMonth = false;
  public  endDate : any ;
  public startDate : any;
  public searchValue = "";
  public status:any;
  public internalError=false;
  public matchFound=false;
  public matchNotFound=false;
  
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
    private dialog: MatDialog) {  }

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
    console.log(pageNo);
    console.log(pageSize);
    this.PreviousRequestsService.getAllRequests(pageNo,pageSize,this.lastWeek,this.lastMonth,this.startDate,this.endDate,this.status)
    .subscribe(response => {
      console.log(response)
      console.log(this.startDate);
      console.log(this.endDate);
      console.log(this.lastWeek);
      console.log(this.lastMonth);
      console.log(this.status);
      
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

  closed(): void {
   
    this.lastMonth = false;
    this.lastWeek = false;
    this.paginator.pageIndex = 0
    
    this.startDate.setMinutes(this.startDate.getMinutes() - this.startDate.getTimezoneOffset());
    this.endDate.setMinutes(this.endDate.getMinutes() - this.endDate.getTimezoneOffset());
    this.getRequests(this.pageNo, this.limit);    
  }

  filterDates(lastWeek:boolean,lastMonth:boolean,$event:any){
    this.lastWeek=lastWeek;
    this.lastMonth=lastMonth;
    this.startDate = null;
    this.endDate = null;

    $event.stopPropagation();
    $event.preventDefault();

    this.paginator.pageIndex = 0;
    this.getRequests(this.pageNo, this.limit);    
  }

  filterStatus(status:any,matchFound:boolean,matchNotFound:boolean,internalError:boolean,$event:any){
    this.status=status;
    this.matchFound=matchFound;
    this.matchNotFound=matchNotFound;
    this.internalError=internalError;

    $event.stopPropagation();
    $event.preventDefault();

    this.paginator.pageIndex = 0;
    this.getRequests(this.pageNo, this.limit);    
  }
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),

  });


  selectPrevent($event:any) {
    // prevent menu from closing
    $event.stopPropagation();
    $event.preventDefault();
  }
}

export interface Requests {
  requestID: string;
  subjectName: string;
  createdAt: string;
  statusMessage: string;
}
