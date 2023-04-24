import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../_services/snackbar/snackbar.service';
import { AuthenticationService } from '../_services/authentication/authentication.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      console.log("::: ", err)
      if ([401, 403].includes(err.status) && this.authService.userValue) {
        // auto logout if 401 or 403 response returned from api
        this.authService.logout();
        this.snackBar.openSnackBar(
          'Unauthorized Access. Please login again.',
          'error-snackbar');
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      if(err.status == 0) {
        this.snackBar.openSnackBar(
          'Network Error !',
          'error-snackbar');
      }
      return throwError(error);
    }))

    // return next.handle(request).pipe(
    //   tap({
    //     next: (event) => {
    //       if(event instanceof HttpResponse) {
    //         if(event.status == 401) {
    //           this.router.navigate(['./'])
    //           // alert('Unauthorized Access');
    //           this.snackBar.openSnackBar(
    //             'Unauthorized Access. Please login again.',
    //             'error-snackbar');
    //         }
    //       }
    //       return event;
    //     },
    //     error: (error) => {
    //       if(error.status === 401) {
    //         this.router.navigate(['./'])
    //         this.snackBar.openSnackBar('Unauthorized Access. Please login again.', 'error-snackbar');
          
    //       } else if(error.status === 404) {
    //         this.snackBar.openSnackBar('Page Not Found !', 'error-snackbar');
          
    //       } else if(error.status == 0 ){
    //         this.snackBar.openSnackBar('Network Error !', 'error-snackbar');
    //       }
    //     }
    //   })
    // )
  }
}
