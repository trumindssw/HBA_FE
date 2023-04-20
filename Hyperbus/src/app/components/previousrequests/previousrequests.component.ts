import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRequestsService } from 'src/app/_services/previousrequests.service';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests1.component.html',
  styleUrls: ['./previousrequests1.component.css']
})

export class PreviousrequestsComponent implements OnInit {
  public requests = [];

  constructor(
    private router: Router,
    private PreviousRequestsService: PreviousRequestsService) { }
  ngOnInit(){
      this.PreviousRequestsService.getAllRequests()
      .subscribe(response => {
        console.log(response.data.data)
        this.requests = response && response.data && response.data.data;

        if(this.requests && this.requests.length>0) {
          this.requests.map((req: {
            status: boolean; createdAt: string | number | Date; 
}) => {
            let dt = new Date(req.createdAt);
            console.log(dt)
            let month = dt.toLocaleString('default', { month: 'long' });
            let yr = dt.getFullYear();
            let date = dt.getDate();
            let time = dt.getHours() + "." + dt.getMinutes();
            console.log(month, date, yr, time )
            req.createdAt = month + " " + date + ", " + yr + " " + time
          })
        }
      })
  }
  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
}