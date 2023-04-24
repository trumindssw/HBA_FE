import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })

export class PreviousRequestsService {

    private getAllRequestsUrl=environment.apiUrl + "/request/getAllRequests"
    private getRequestCountsUrl=environment.apiUrl + "/request/getRequestCounts"
    constructor(
        private http: HttpClient
    ) {}

    getAllRequests(pageNo: Number, limit: Number) {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}

        return this.http.get<any>(this.getAllRequestsUrl + '?page=' + pageNo + '&limit=' + limit, options)
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