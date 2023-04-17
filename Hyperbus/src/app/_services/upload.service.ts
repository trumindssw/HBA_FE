import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class Uploadservice {

    private uploadUrl="http://localhost:5000/excel/upload"
    private getAllFilesUrl = "http://localhost:5000/excel/getUploadedFiles"
    private downloadfileUrl = "http://localhost:5000/excel/download/"
    request: any;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    UploadExcel(formData: FormData) {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}

        return this.http.post<any>(this.uploadUrl, formData, options)
    }

    getAllFiles() {
        let token = localStorage.getItem('user') || "";
        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        let options = {headers: headers}
        return this.http.get<any>(this.getAllFilesUrl, options)
    }
    downloadFile(fileNames: string){	
        let token = localStorage.getItem('user') || "";

        console.log(token)
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            responseType:'blob'
        });	
        let options = {headers: headers}
		return this.http.get<any>(this.downloadfileUrl+fileNames,options)
   }

}