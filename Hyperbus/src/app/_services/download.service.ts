import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class DownloadService {

    private url="http://localhost:5000/excel/download/"
    constructor(
        private http: HttpClient
    ) {}

    downloadFile(fileName: String) {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            responseType: 'blob'
        });

        let queryParams = new HttpParams().append("template", "true").append("fileName", String(fileName))
        console.log(queryParams)

        let options = {headers: headers}

        return this.http.get<any>(this.url+fileName, options)
    }

}