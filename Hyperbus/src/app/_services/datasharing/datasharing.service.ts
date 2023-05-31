import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  sharedVariable1: any;
  sharedVariable2: any;
  sharedVariableView:any;
  constructor() { }

  setVariable1(value: any) {
    this.sharedVariable1 = value;
  }
  setVariable2(value: any) {
    this.sharedVariable2 = value;
  }

  getVariable1() {
    return this.sharedVariable1;
  }

  getVariable2() {
    return this.sharedVariable2;
  }

  setVariableView(value: any) {
    this.sharedVariableView = value;
  }
  getVariableView() {
    return this.sharedVariableView;
  }
}
