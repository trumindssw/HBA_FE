import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class PreviousRequestsService {
    static getRequestCounts(getRequestCounts: any) {
      throw new Error('Method not implemented.');
    }
    static avgReqPerDay(avgReqPerDay: any) {
      throw new Error('Method not implemented.');
    }
    static avgReqPerWeek(avgReqPerWeek: any) {
      throw new Error('Method not implemented.');
    }
    static totalReq(totalReq: any) {
      throw new Error('Method not implemented.');
    }
    static totalReqWithSubjectFound(totalReqWithSubjectFound: any) {
      throw new Error('Method not implemented.');
    }

    private getAllRequestsUrl=environment.apiUrl + "/request/getAllRequests"
    private getRequestCountsUrl=environment.apiUrl + "/request/getRequestCounts"
   
    constructor(
        private http: HttpClient
    ) {}

    getAllRequests(pageNo: Number, limit: Number, lastWeek: boolean, lastMonth:boolean, startDate:any, endDate:any,status:any,searchString:string,today:boolean) {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}
        let body = {page: pageNo, limit: limit,status:status,lastWeek: lastWeek, lastMonth: lastMonth,startDate:startDate, endDate:endDate,searchValue: searchString,today:today}

        console.log("getAllRequestApi",this.getAllRequestsUrl,body,options);
        console.log(startDate);
        return this.http.post<any>(this.getAllRequestsUrl, body, options)
    }

    

    getRequestCounts() {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}

        return this.http.get<any>(this.getRequestCountsUrl, options)
    }

}