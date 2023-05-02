import { Component } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  nimal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(TestExample, {
      data: {
        animal: 'panda',
      },
    });
  }
  }


@Component({
  selector: 'testexample',
  templateUrl: 'testexample.html',
})
export class TestExample {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

