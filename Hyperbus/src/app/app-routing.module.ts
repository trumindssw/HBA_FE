import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { BodyComponent } from './components/Sign-up-page/Sign-up-page.component';
import { PreviousrequestsComponent } from './components/previousrequests/previousrequests.component';

const routes: Routes = [
  {path:'', component: BodyComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'previousrequests', component: PreviousrequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UploadComponent, BodyComponent, PreviousrequestsComponent]
