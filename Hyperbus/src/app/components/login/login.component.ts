import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication/authentication.service';

import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { SnackbarService } from 'src/app/_services/snackbar/snackbar.service';

@Component({
  selector: 'app-body',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class BodyComponent implements OnInit {
  public loginForm!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private http: HttpClient,
      private snackBar: SnackbarService
      )
      { // redirect to home if already logged in
        if (this.authenticationService.userValue) {  
          console.log("YEs Pls redirect")
          this.router.navigate(['./upload']);
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

      
      this.loading = true;
      this.authenticationService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
          .subscribe({
              next: (u: any) => {
                if(u.status == 1) {
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/upload';
                  this.snackBar.openSnackBar('Logged In Successfully !!', 'success-snackbar')
                  this.router.navigate([returnUrl]);

                } else {
                  this.loading = false;
                  this.submitted=false;
                  this.snackBar.openSnackBar('Unauthorized Access !', 'error-snackbar');
                }
                
                },
            
              error: (error :any) => {
                  this.loading = false;
                  this.submitted=false;
                  this.loginForm.reset();
                  console.log("***** ", error);

                  this.snackBar.openSnackBar(error, 'error-snackbar')
              }
          });
  }

}
