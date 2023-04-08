import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
// import { User } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    // private userSubject: BehaviorSubject<User | null>;
    // public user: Observable<User | null>;

    private _loginUrl="http://localhost:5000/login"
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        // this.user = this.userSubject.asObservable();
    }

    // public get userValue() {
    //     return this.userSubject.value;
    // }

    login(username: string, password: string) {
      
      return this.http.post<any>(this._loginUrl, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                // this.userSubject.next(user);
                return user;
            }));
    }

    
}