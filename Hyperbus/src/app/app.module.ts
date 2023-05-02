import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { HttpResponseInterceptor } from './_interceptors/httpresponse.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BodyComponent } from './components/login/login.component';
import { MaterialExampleModule } from 'material.module';
import { RequestdetailsComponent } from './components/requestdetails/requestdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    RequestdetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgScrollbarModule,
    MaterialExampleModule
  ],
  providers: [HttpClientModule, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true}],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
