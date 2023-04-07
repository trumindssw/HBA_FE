import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
// import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
