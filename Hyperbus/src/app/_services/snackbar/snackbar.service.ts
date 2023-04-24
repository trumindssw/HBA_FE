import { Injectable, NgZone } from '@angular/core';
import { 
  MatSnackBar, 
  MatSnackBarConfig, 
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar, private ngZone: NgZone) { }

  openSnackBar(message: string, panel?:string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = [panel || 'primary-snackbar' ]
    this.ngZone.run(() => {
      this.matSnackBar.open(message, 'DISMISS', config);
    });
    
  }
}
