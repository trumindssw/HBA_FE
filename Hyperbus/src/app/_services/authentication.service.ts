import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';

import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: String;
    
    private _loginUrl = environment.apiUrl + "/login";

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        console.log(localStorage.getItem('user'))
        this.userSubject = localStorage.getItem('user')!;
    }

    public get userValue() {
        return this.userSubject;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this._loginUrl, { username, password })
            .pipe(map((res: { status: number; data: string; })  => {
                console.log(res)
                
                if(res.status == 0)
                return res;                
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                
                localStorage.setItem('user', String(res.data));
                return res;
            }));
    }

    
}