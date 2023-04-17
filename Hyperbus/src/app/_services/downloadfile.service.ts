import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadfileService {
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}
  
  ngOnInIt(): void{
  }

}

