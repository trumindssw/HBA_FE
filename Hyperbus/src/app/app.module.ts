import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
// import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BodyComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './_guards';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
