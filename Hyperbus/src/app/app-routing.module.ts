import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { BodyComponent } from './components/login/login.component';
import { PreviousrequestsComponent } from './components/previousrequests/previousrequests.component';
import { AuthGuard } from './_guards';
import { TestComponent } from './components/test/test.component';
import { RequestdetailsComponent } from './components/requestdetails/requestdetails.component';

const routes: Routes = [
  {path:'', component: BodyComponent},
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'previousrequests', component: PreviousrequestsComponent, canActivate: [AuthGuard]}
  // { path: 'requestdetails', component: RequestdetailsComponent,canActivate: [AuthGuard]},
  // { path: 'test', component: TestComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UploadComponent, BodyComponent, PreviousrequestsComponent]
