import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { HttpResponseInterceptor } from './_interceptors/httpresponse.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { RequestdetailsComponent } from './components/requestdetails/requestdetails.component';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
     RequestdetailsComponent,
     TestComponent
    
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatDialogModule
   
    
  ],
  providers: [HttpClientModule, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true}],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
