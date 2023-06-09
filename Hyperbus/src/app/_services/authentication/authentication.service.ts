import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: String | null;
    
    private _loginUrl = environment.apiUrl + "/login";
    lockoutTime: any;
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
            .pipe(map((u: any)  => {
                console.log(u)
                if(u && u.data && u.data.token) {
                    localStorage.setItem('user', String(u.data.token));
                    this.userSubject = u.data.token;
                  } else {
                    this.userSubject = null;
                  }
                return u;
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

    logout() {
        localStorage.clear();
        this.router.navigate(['./'])
    }

    isLockedOut(): boolean {
        if (this.lockoutTime) {
            const remainingTime = this.lockoutTime.getTime() - Date.now();
            return remainingTime > 0;
          }
          return false;
        // return this.lockoutTime && this.lockoutTime > new Date();
    }
      
    getRemainingLockoutTime(): number {
        console.log("Reached getRemaining function");
        const remainingTime = this.lockoutTime.getTime() - new Date().getTime();
        console.log(remainingTime);
        return Math.ceil(remainingTime / 1000); // Convert remaining time to seconds
    }
}