import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

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

    isTokenExpired(): boolean {
        let token = localStorage.getItem('user');
        if(!token) {
            return true;
        } else {
            const date = helper.getTokenExpirationDate(token);
            console.log(date);
            if(date === undefined || date == null) return false;
            return !(date.valueOf() > new Date().valueOf());
        }
        
    }

    
}