import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BodyComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SnackbarService } from '../../_services/snackbar/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Router } from '@angular/router';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let router: Router;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyComponent ],
      providers: [
        { provide: ActivatedRoute,SnackbarService,AuthenticationService, Router, useValue: activatedRouteMock }],
      imports: [HttpClientTestingModule,MatSnackBarModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

<<<<<<< HEAD
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
=======
  it('should create', () => {
    expect(component).toBeTruthy();
  });

>>>>>>> 044013f3cc4e8263ae69440f16fd7fbed207e24b
});
