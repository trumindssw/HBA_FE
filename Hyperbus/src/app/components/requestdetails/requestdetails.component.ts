import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousrequestsComponent } from '../previousrequests/previousrequests.component';
import { RequestdetailsService } from '../../_services/requestdetails/requestdetails.service';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ marginLeft: '100%' })),
      state('*', style({ marginLeft: '0' })),
      transition(':enter', animate('400ms ease-out')),
      transition(':leave', animate('400ms ease-in')),
    ]),
  ]  
})
export class RequestdetailsComponent {
  // RequestDetailsServices: any;
  requestID: any;
  veriflowID: any;
  subjectName: any;
  issuingAuthority: any;
  document: any;
  department: any;
  startDate: any;
  status: any;
  endDate: any;
  createdAt: any;
  statusMessage: any;
  updatedAt: any;
  result!: [];
  constructor(
    // private router: Router,
    private RequestDetailsServices: RequestdetailsService,
    // private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}){}

  ngOnInit(){
      this.getRequestDetails(this.data.name);
  }
    getRequestDetails(reqId:string){
      this.RequestDetailsServices.getRequestdetails(reqId)
      .subscribe((response: { data: any; }) => {
        let res = response && response && response.data && response.data.data;
        console.log(res)
        this.result=res;
        console.log('Results',this.result)
      });
    }
    onNoClick(): void {
      this.RequestDetailsServices;
    }
}