import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class PreviousRequestsService {

    private url="http://localhost:5000/request/getAllRequests"
    constructor(
        private http: HttpClient
    ) {}

    getAllRequests() {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}

        return this.http.get<any>(this.url, options)
    }

}