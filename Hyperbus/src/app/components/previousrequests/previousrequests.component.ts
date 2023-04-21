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

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService) { }
  ngOnInit(){
    forkJoin(
      this.PreviousRequestsService.getAllRequests(),
      this.PreviousRequestsService.getRequestCounts(),
    ).subscribe(response => {
      console.log(response)
      this.requests = response && response[0].data && response[0].data.data;
      
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

      let res = response && response[1] && response[1].data;
      this.avgReqPerDay = res.avgReqPerDay;
      this.avgReqPerWeek = res.avgReqPerWeek;
      this.totalReq = res.totalReq;
      this.totalReqWithSubjectFound = res.totalReqWithSubjectFound;
      this.totalReqWithMismatch = res.totalReqWithMismatch;
    })
  }
  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
}