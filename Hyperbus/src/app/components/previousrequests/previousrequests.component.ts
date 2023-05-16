import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { tap } from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';
import 'moment-timezone';


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
  selectedValue: any;
  selectedValueStatus: any;
  badgeContent : any;
  public lastFilter:any;
  public prevStatus:any;
  public prevLastFilter:any;
  public searchString:string= '';
  public filterBy :string ='';
  public users: any;
  public filteredUsers: any;
  //lastFilter = 1 for lastWeek true
  //lastFilter = 2 for lastMonth true
  
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
    console.log(pageNo);
    console.log(pageSize);
    this.PreviousRequestsService.getAllRequests(pageNo,pageSize,this.lastWeek,this.lastMonth,this.startDate,this.endDate,this.status,this.searchString)
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
            console.log(Intl.DateTimeFormat().resolvedOptions())
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
          let abbr = moment().tz(timeZone).zoneAbbr();
          req.createdAt = dte.toString() + " " + abbr;
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
    this.selectedValue = null;
    this.lastMonth = false;
    this.lastWeek = false;
    if(this.requests.length>0) {
      this.paginator.pageIndex = 0
    }

    if(this.startDate==null && this.endDate==null)
    this.getRequests(this.pageNo, this.limit);
    else {
      this.startDate=new Date(this.startDate);
      this.endDate=new Date(this.endDate);
      this.startDate.setMinutes(this.startDate.getMinutes() - this.startDate.getTimezoneOffset());
      this.endDate.setMinutes(this.endDate.getMinutes() - this.endDate.getTimezoneOffset());
      this.incrementCount()
      this.getRequests(this.pageNo, this.limit);  
    }   
  }

  filterDates(lastWeek:boolean,lastMonth:boolean,$event:any,lastFilter:any){
    this.prevLastFilter=this.lastFilter;
    this.lastFilter=lastFilter;
    this.startDate = null;
    this.endDate = null;
    $event.stopPropagation();
    $event.preventDefault();

    if(this.prevLastFilter==this.lastFilter){
      this.prevLastFilter=null;
      this.lastFilter=null;
      this.lastWeek=false;
      this.lastMonth=false;
      this.selectedValue = null;
    }
    else{
      this.lastWeek=lastWeek;
      this.lastMonth=lastMonth;
    }

    if(this.requests.length>0) {
      this.paginator.pageIndex = 0
    }
    this.incrementCount()
    this.getRequests(this.pageNo, this.limit);    
  }

  filterStatus(status:any,matchFound:boolean,matchNotFound:boolean,internalError:boolean,$event:any){
    this.prevStatus=this.status;
    this.status=status;
    $event.stopPropagation();
    $event.preventDefault();

    if(this.prevStatus==status){
      this.status=null;
      this.prevStatus=null;
      this.matchFound=false;
      this.matchNotFound=false;
      this.internalError=false;
      this.selectedValueStatus = null;
    }
    else{
      this.matchFound=matchFound;
      this.matchNotFound=matchNotFound;
      this.internalError=internalError;
    }

    if(this.requests.length>0) {
      this.paginator.pageIndex = 0
    }
    this.incrementCount()
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

  incrementCount() {
      if((this.matchFound==true || this.matchNotFound==true || this.internalError==true) && (this.lastWeek==false && this.lastMonth==false && this.startDate==null && this.endDate==null))
      this.badgeContent=1;
      else if((this.matchFound==false && this.matchNotFound==false && this.internalError==false)&& (this.lastWeek==true || this.lastMonth==true || (this.startDate!=null && this.endDate!=null)))
      this.badgeContent=1;
      else if((this.matchFound==true || this.matchNotFound==true || this.internalError==true) && (this.lastWeek==true || this.lastMonth==true || (this.startDate!=null && this.endDate!=null)))
      this.badgeContent=2; 
      else
      this.badgeContent=null;
  }
  searchResult() {
    if(this.requests.length>0) {
      this.paginator.pageIndex = 0
    }
    
    this.getRequests(this.pageNo, this.limit);
      
  }

}

export interface Requests {
  requestID: string;
  subjectName: string;
  createdAt: string;
  statusMessage: string;
}
