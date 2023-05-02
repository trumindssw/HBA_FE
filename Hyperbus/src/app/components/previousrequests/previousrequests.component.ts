import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PreviousRequestsService } from 'src/app/_services/previousrequests/previousrequests.service';
import {NgxPaginationModule} from 'ngx-pagination';
// import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RequestdetailsComponent } from '../requestdetails/requestdetails.component';

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
  public selectedNoList = '';
  public classNames = 'main';
  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService,
    // private RequestDetailsComponents: RequestdetailsComponent,
    private dialog: MatDialog) { }

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
  onTableDataChange(event: any) {
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
  openDialog(reqId: string) {
    const dialog = this.dialog.open(RequestdetailsComponent,{

     data: { name: reqId },
    });
    dialog.afterClosed().subscribe(result =>{
      console.log('result')
    });
  }
}

@Component({

   selector: 'dialog-data-example-dialog',
  
   templateUrl: 'hello.html',
  
  })
  
  export class DialogDataExampleDialog {
  
   constructor(@Inject(MAT_DIALOG_DATA) 
   public data: {name: string,
     veriflowID : string,
     subjectName : string ,
     issuingAuthority : string,
     document :string,
     department : string,
     startDate: string,
     endDate : string,
     status : string,
     statusMessage :string,
     createdAt : string,
     updatedAt : string,
   }
  ){}
 }
 


  
