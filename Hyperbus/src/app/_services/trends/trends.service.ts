import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrendsService {
  private getDailyAndWeeklyCntUrl=environment.apiUrl + "/request/getDailyAndWeeklyCnt";
  constructor(
    private router: Router,
    private http: HttpClient) { }

    getDailyAndWeeklyCnt(startDate:any, endDate:any,view:boolean) {
      let token = localStorage.getItem('user') || "";
      console.log(token)
      let headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
      });

      // let options = {headers: headers}
      let params = {
        startDate: startDate,
        endDate: endDate,
        view: view
      };
      console.log("getDailyAndWeeklyCnt API Called");
      console.log(this.getDailyAndWeeklyCntUrl, { params: params, headers: headers });
      return this.http.get<any>(this.getDailyAndWeeklyCntUrl, { params: params, headers: headers })
    }  
}
