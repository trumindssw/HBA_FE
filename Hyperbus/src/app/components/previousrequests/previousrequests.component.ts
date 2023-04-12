import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previousrequests',
  templateUrl: './previousrequests.component.html',
  styleUrls: ['./previousrequests.component.css']
})

export class PreviousrequestsComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(){
      
  }
  onClick(){
    //upload
    this.router.navigate(['/upload']);
  }
}