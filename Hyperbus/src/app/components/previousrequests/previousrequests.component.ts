import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviousRequestsService } from 'src/app/_services/previousrequests.service';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css']
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
      })
  }
  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
}