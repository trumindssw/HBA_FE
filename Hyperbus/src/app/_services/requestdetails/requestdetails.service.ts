import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestdetailsService {
  private getRequestDetailUrl=environment.apiUrl + "/request/getRequestDetail/"

  constructor(
    private http: HttpClient
  ) { }
  getRequestdetails(reqId:string) {
    let token = localStorage.getItem('user') || "";
    console.log(token)
    let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });

    let options = {headers: headers}

    return this.http.get<any>(this.getRequestDetailUrl+reqId, options)
}
}
