import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PreviousRequestsService } from '../../_services/previousrequests/previousrequests.service';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { tap } from 'rxjs';
import {FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';
import 'moment-timezone';
import { TrendsComponent } from '../trends/trends.component';
import { DateRange, MatDateRangeInput, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { DatasharingService } from '../../_services/datasharing/datasharing.service';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css'],
})

export class PreviousrequestsComponent implements OnInit {
  static getRequestCounts() {
    throw new Error('Method not implemented.');
  }
  RequestDetailsServices(RequestDetailsServices: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  getRequestDetails(reqId: string) {
    throw new Error('Method not implemented.');
  }
  result(result: any) {
    throw new Error('Method not implemented.');
  }
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
  public isWeekly = false;
  public isDaily = true;
  selectedTrendViewOption = 'option1';
  public  endDateTrend : any ;
  public startDateTrend : any;
  public view = true;
  public today = false;
  //lastFilter = 1 for lastWeek true
  //lastFilter = 2 for lastMonth true
  //lastFilter = 3 for today true 
  public selectedNoList = '';
  public classNames = 'main';
  columns = ['requestID', 'subjectName', 'createdAt', 'statusMessage'];
  columnsToDisplay = ['Request ID', 'Subject Name', 'Created At', 'Status Message']
  @ViewChild('paginator') paginator!: MatPaginator;
  

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService,
    private dialog: MatDialog,
    private DatasharingService:DatasharingService,
    private datePipe: DatePipe
    ) {}

  ngOnInit(){
    this.getRequests(this.pageNo, this.limit);
    this.getRequestCounts();
  }

  ngAfterViewInit() {
    if (this.paginator) {
    this.paginator.page
        .pipe(
          tap(() => this.getRequests(this.paginator.pageIndex + 1, this.paginator.pageSize))
        )
        .subscribe();
    } 
  }


  getRequests(pageNo: number, pageSize: number) {
    console.log(pageNo);
    console.log(pageSize);
    this.PreviousRequestsService.getAllRequests(pageNo,pageSize,this.lastWeek,this.lastMonth,this.startDate,this.endDate,this.status,this.searchString,this.today)
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
            // console.log(Intl.DateTimeFormat().resolvedOptions())
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

  onPageChange(event: PageEvent) {
    this.pageNo = event.pageIndex;
    this.limit = event.pageSize;
    this.getRequests(this.pageNo, this.limit);
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

  openDialog(reqId: string,event: any) {
    event.target.style.color = 'violet';
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
    this.today = false;
    if(this.requests && this.requests.length>0) {
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
    this.today = false;
    $event.stopPropagation();
    $event.preventDefault();

    if(this.prevLastFilter==this.lastFilter){
      this.prevLastFilter=null;
      this.lastFilter=null;
      this.lastWeek=false;
      this.lastMonth=false;
      this.selectedValue = null;
    }
    else {
      this.lastWeek=lastWeek;
      this.lastMonth=lastMonth;
      if(this.lastWeek==true)
      this.selectedValue = 'lastWeek';
      else if(this.lastMonth==true)
      this.selectedValue = 'lastMonth';
    }

    if(this.requests && this.requests.length>0) {
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
      if(this.matchFound==true && !this.matchNotFound && !this.internalError)
      this.selectedValueStatus = 'option1';
      else if(this.matchNotFound==true && !this.matchFound && !this.internalError)
      this.selectedValueStatus = 'option2';
      else if(this.internalError==true && !this.matchFound && !this.matchNotFound)
      this.selectedValueStatus = 'option3';
      else if(this.status==2)
      this.selectedValueStatus=null;
    }
    console.log("this.request", this.requests)
    if(this.requests && this.requests.length>=0) {
      console.log("this.request after", this.requests)
      this.paginator.pageIndex = 0
    }
    this.incrementCount()
    this.getRequests(this.pageNo, this.limit);      
  }
  
  headingFilter(status:any,matchFound:boolean,matchNotFound:boolean,internalError:boolean,lastWeek:boolean,lastMonth:boolean,today:boolean) {
    this.status=status;    
    this.matchFound=matchFound;
    this.matchNotFound=matchNotFound;
    this.internalError=internalError;
 
    this.startDate = null;
    this.endDate = null;
    this.lastWeek=lastWeek;
    this.lastMonth=lastMonth;
    this.today = today;
    if(this.requests && this.requests.length>0) {
      this.paginator.pageIndex = 0
    }
    this.incrementCount()
    this.selectedValueStatus=null;
    this.selectedValue=null;
    this.getRequests(this.pageNo, this.limit);
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  headingFilterPerDay(lastWeek:boolean,lastMonth:boolean,lastFilter:any,today:any){
    this.prevLastFilter=this.lastFilter;
    this.lastFilter=lastFilter;
    this.startDate = null;
    this.endDate = null;
    this.selectedValue = null;
    if(this.prevLastFilter==this.lastFilter){
      this.prevLastFilter=null;
      this.lastFilter=null;
      this.lastWeek=false;
      this.lastMonth=false;
      this.today=false;
      this.selectedValue = null;
    }
    else {
      this.lastWeek=lastWeek;
      this.lastMonth=lastMonth;
      this.today=today;
    }

    if(this.requests && this.requests.length>0) {
      this.paginator.pageIndex = 0
    }
    this.incrementCount()
    this.getRequests(this.pageNo, this.limit);    
  }


  selectPrevent($event:any) {
    // prevent menu from closing
    $event.stopPropagation();
    $event.preventDefault(); 
  }
  incrementCount() {
      if(this.internalError==true && this.matchNotFound==true && (this.lastWeek==false && this.lastMonth==false && this.startDate==null && this.endDate==null))
      this.badgeContent=null;
      else if(this.internalError==true && this.matchNotFound==true && (this.lastWeek==true || this.lastMonth==true || (this.startDate!=null && this.endDate!=null)))
      this.badgeContent=1;
      else if((this.matchFound==true || this.matchNotFound==true || this.internalError==true) && (this.lastWeek==false && this.lastMonth==false && this.startDate==null && this.endDate==null))
      this.badgeContent=1;
      else if((this.matchFound==false && this.matchNotFound==false && this.internalError==false)&& (this.lastWeek==true || this.lastMonth==true || (this.startDate!=null && this.endDate!=null)))
      this.badgeContent=1;
      else if((this.matchFound==true || this.matchNotFound==true || this.internalError==true) && (this.lastWeek==true || this.lastMonth==true || (this.startDate!=null && this.endDate!=null)))
      this.badgeContent=2; 
      else
      this.badgeContent=null;
  }
  searchResult() {
    if(this.requests && this.requests.length>0) {
      this.paginator.pageIndex = 0
    }   
    this.getRequests(this.pageNo, this.limit); 
  }

  openTrend() {
    const formattedStartDate = this.datePipe.transform(this.startDateTrend, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(this.endDateTrend, 'yyyy-MM-dd');
    this.DatasharingService.setVariable1(formattedStartDate);
    this.DatasharingService.setVariable2(formattedEndDate);
    this.view = this.isDaily;
    this.DatasharingService.setVariableView(this.view);
    const dialog = this.dialog.open(TrendsComponent);
    dialog.afterClosed().subscribe(result =>{
      console.log('Trends graph closed')
    });
  }

  closedTrends(): void {
    // this.selectedValue = null;
    if(this.startDateTrend!=null && this.endDateTrend!=null) {
      this.startDateTrend=new Date(this.startDateTrend);
      this.endDateTrend=new Date(this.endDateTrend);
      this.startDateTrend.setMinutes(this.startDateTrend.getMinutes() - this.startDateTrend.getTimezoneOffset());
      this.endDateTrend.setMinutes(this.endDateTrend.getMinutes() - this.endDateTrend.getTimezoneOffset());
      console.log("isWeekly",this.isWeekly);
      console.log("isDaily",this.isDaily);
      console.log("trendsDates",this.startDateTrend,this.endDateTrend);
      this.openTrend();  
    }   
  }

  trendsView(isDaily:boolean,isWeekly:boolean) {
    this.isDaily=isDaily;
    this.isWeekly=isWeekly;
    this.startDateTrend=null;
    this.endDateTrend=null;
  }

  eraseDateTrends($event:any) {
    this.startDateTrend=null;
    this.endDateTrend=null;
    this.selectPrevent($event)
  }

  rangeTrend = new FormGroup({
    startTrend: new FormControl<Date | null>(null),
    endTrend: new FormControl<Date | null>(null),
  });

  dateClass= (date: Date) => {
    if(this.isDaily==false) {
      const day = date.getDay();
      return day === 1; // Only allow Mondays
    }
    else {
      return true;
    }
  };

}

export interface Requests {
  requestID: string;
  subjectName: string;
  createdAt: string;
  statusMessage: string;
}
