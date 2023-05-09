import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })

export class PreviousRequestsService {

    private getAllRequestsUrl=environment.apiUrl + "/request/getAllRequests"
    private getRequestCountsUrl=environment.apiUrl + "/request/getRequestCounts"
   
    constructor(
        private http: HttpClient
    ) {}

    getAllRequests(pageNo: Number, limit: Number, lastWeek: boolean, lastMonth:boolean, startDate:any, endDate:any,status:any) {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}
        let body = {page: pageNo, limit: limit,status:status,lastWeek: lastWeek, lastMonth: lastMonth,startDate:startDate, endDate:endDate }

        console.log(this.getAllRequestsUrl,body,options);
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