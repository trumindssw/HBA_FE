import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-body',
  templateUrl: './Sign-up-page.component.html',
  styleUrls: ['./Sign-up-page.component.css']
})
export class BodyComponent implements OnInit {
  public loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private http: HttpClient
      )
      { // redirect to home if already logged in
        if (this.authenticationService.userValue) {  
       this.router.navigate(['/upload']);
        }
      }

  ngOnInit():void {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
   
      this.submitted = true;
      console.log("hEYYYYYY");

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.error = '';
      this.loading = true;
      this.authenticationService.login(this.f['username'].value, this.f['password'].value)
          .pipe(first())
          .subscribe({
              next: (res) => {
                console.log("$%#$", res)
                  // get return url from route parameters or default to '/'
                  if(res.status == 1)
                  {
                      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/upload';
                      console.log(returnUrl)
                      this.router.navigate([returnUrl]);
                  }
                  else
                  {
                    this.loginForm.reset();
                    this.loading=false;
                    this.router.navigate(['./']);
                  }
                },
            
              error: (error :any) => {
                  this.error = error;
                  this.loading = false;
              }
          });
  }

}
