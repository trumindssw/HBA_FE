import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { SnackbarService } from '../../_services/snackbar/snackbar.service';

@Component({
  selector: 'app-body',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class BodyComponent implements OnInit {
  public loginForm!: FormGroup;
    loading = false;
    submitted = false;
    hide = true;
    incorrectAttempts = 0;
    isLockedOut = false;
    countdownTimer = 0;
    displayAttemptMsg="";
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

        this.checkLockoutStatus();
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
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/upload';
                  this.snackBar.openSnackBar('Logged In Successfully !!', 'success-snackbar')
                  this.router.navigate([returnUrl]);
                  this.incorrectAttempts = 0;
                  localStorage.removeItem('lockoutTime');
                  localStorage.removeItem('countdownTimer');
                },
            
              error: (error :any) => {
                  this.loading = false;
                  this.submitted=false;
                  this.loginForm.reset();
                  console.log("***** ", error);
                  this.incorrectAttempts++;
                  console.log("Incorrect Attempts",this.incorrectAttempts)
                  if (this.incorrectAttempts >= 5) {
                    console.log("has reached incorrect attempt >=5")
                    this.authenticationService.lockoutTime = new Date(Date.now() + 2 * 60 * 1000); // Set lockout time to 2 minutes from now
                    this.setLockoutStatus(this.authenticationService.lockoutTime, this.authenticationService.lockoutTime.getTime() - Date.now());
                  }

                  if (this.authenticationService.isLockedOut()) {
                    console.log("has reached lockout")
                    const lockoutMinutes = 2;
                    const lockoutTime = new Date();
                    lockoutTime.setMinutes(lockoutTime.getMinutes() + lockoutMinutes);
                    this.authenticationService.lockoutTime = lockoutTime;
                    this.isLockedOut = true;
                    this.countdownTimer = this.authenticationService.getRemainingLockoutTime();
                    localStorage.setItem('lockoutTime', this.authenticationService.lockoutTime.getTime().toString());
                    localStorage.setItem('countdownTimer', this.countdownTimer.toString()); 
                    this.startCountdown();
                    this.incorrectAttempts=0;
                  }
                  else {
                  localStorage.removeItem('lockoutTime');
                  localStorage.removeItem('countdownTimer');
                  this.snackBar.openSnackBar(error, 'error-snackbar')
                  }
              }
          });
  }
  private startCountdown() {
    console.log("reached startCounddown fucntion");
    this.isLockedOut=true;
    const interval = setInterval(() => {
      this.countdownTimer--;
      console.log(this.countdownTimer);
      // this.displayAttemptMsg= this.formatCountdownTime(this.countdownTimer);
      // this.snackBar.openSnackBar(this.displayAttemptMsg, 'error-snackbar')      
      if (this.countdownTimer <= 0) {
        clearInterval(interval);
        this.isLockedOut = false;
        this.countdownTimer = 0;
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('countdownTimer');
      }
    }, 1000);
  }

  private checkLockoutStatus() {
    const lockoutTime = localStorage.getItem('lockoutTime');
    const countdownTimer = localStorage.getItem('countdownTimer');
    if (lockoutTime && countdownTimer) {
      this.authenticationService.lockoutTime = new Date(parseInt(lockoutTime, 10));
      this.countdownTimer = parseInt(countdownTimer, 10);
      const remainingTime = this.authenticationService.lockoutTime.getTime() - Date.now();
      if (remainingTime > 0) {
        this.countdownTimer = remainingTime / 1000;
        this.startCountdown();
      } else {
        this.authenticationService.lockoutTime = null;
        this.countdownTimer = 0;
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('countdownTimer');
      }
    }
  }

  private setLockoutStatus(lockoutTime: Date, countdownTimer: number) {
    this.authenticationService.lockoutTime = lockoutTime;
    this.countdownTimer = countdownTimer;
    localStorage.setItem('lockoutTime', lockoutTime.getTime().toString());
    localStorage.setItem('countdownTimer', countdownTimer.toString());
  }

  formatCountdownTime(countdownTimer: number): string {
    const minutes = Math.floor(countdownTimer / 60);
    const seconds = Math.floor(countdownTimer % 60);
    return `${minutes} minute and ${seconds} seconds`;
  }
}