import { TestBed } from '@angular/core/testing';
import { SnackbarService } from '../_services/snackbar/snackbar.service';
import { HttpResponseInterceptor } from '../_interceptors/httpresponse.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('H401InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule,HttpClientTestingModule],
    providers: [HttpResponseInterceptor, SnackbarService]
  }));

  it('should be created', () => {
    const interceptor: HttpResponseInterceptor = TestBed.inject(HttpResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
