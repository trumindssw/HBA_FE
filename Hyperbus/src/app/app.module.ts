import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
// import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BodyComponent } from './components/Sign-up-page/Sign-up-page.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
