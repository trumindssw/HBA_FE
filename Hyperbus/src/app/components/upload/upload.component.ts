import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Uploadservice } from 'src/app/_services/upload/upload.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { SnackbarService } from '../../_services/snackbar/snackbar.service';

@Component({
selector: 'app-upload',
templateUrl: './upload.component.html',
styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  public error: any ;
  public dragAreaClass: any;
  public draggedFiles: any;
  public fl: any;
  public chosen = false;
  public message = "";
  public requests: any
  public colour :any;
  public array = true;
  files:any
  file:any
  public uploading: boolean = false;
  badgeContentNotification : any;
  uploadExcelMessage="";
  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private UploadService: Uploadservice,
      private snackBar: SnackbarService
      ) { }

  ngOnInit(){
    this.retrieveBadgeValueFromAPI();

    this.UploadService.getAllFiles().subscribe(
      response => {
        this.files = response.data;
        this.timeFormatChange();
      }
    )
    this.dragAreaClass = "dragarea";
  }
  
  onBtn() {
    this.router.navigate(['/previousrequests']);
  }

  retrieveBadgeValueFromAPI() {
    this.UploadService.getBadgeNotification().subscribe(
      response => {
        console.log("Badge Content",response);
        this.badgeContentNotification=response.data;
        
        if(response.data == 0)
        this.badgeContentNotification=null;
        console.log("Badge count",this.badgeContentNotification);
      }
    );
  }

  downloadFile(fileNames: string) {
    console.log("download button clicked!");
    this.UploadService.downloadFile(fileNames).subscribe(
      response => {
        console.log(response);
        let blob = new Blob([response.body], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        const file = new File([blob],fileNames, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file);
      }
    );
  }

  onFileChange(event: any) {
    console.log("I am in onfilechange")
    if(event.target.value) {
        this.fl = <File>event.target.files[0];
        this.chosen=true;
        this.uploading = true;
        this.saveFiles();
        event.target.value='';
        // this.ngOnInit()
    }
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      this.fl = <File>event.dataTransfer.files[0];
      this.saveFiles();
    }
  }

  saveFiles() {
    console.log("I am in upload !! ")
    let fd =new FormData();
      if(this.fl) {
       fd.append("file", this.fl, this.fl.name);
       this.UploadService.UploadExcel(fd).subscribe((res) => {
        if(res.status == 1) {
          this.error = false;
          this.colour = true;
          console.log("Res.message: ", res.message)
          this.message = res.message;
          this.uploadExcelMessage= "Upload Successfully";
          this.snackBar.openSnackBar(this.uploadExcelMessage, 'success-snackbar')
          this.UploadService.getAllFiles().subscribe(response => {
            this.files = response.data;
            this.timeFormatChange();
          });
        } else {
          this.error = true;
          this.colour = false;
          this.message = res.message;
          this.uploadExcelMessage= "Please check and Re-upload";
          this.snackBar.openSnackBar(this.uploadExcelMessage, 'error-snackbar')
          if(res.message instanceof Array) {
            this.array = true;
          } else {
            this.array = false;
          }
        }
        this.uploading = false;
      });
   }
  }

  timeFormatChange() {
    let timeZone = '';
    if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (this.files && this.files.length > 0) {
        this.files.map((f: { createdAt: string | number | Date; }) => {
          let dt = new Date(f.createdAt);
          let month = dt.toLocaleString('default', { month: 'long' });
          let yr = dt.getFullYear();
          let date = dt.getDate();
          let time = dt.getHours() + ":" + dt.getMinutes();
          let abbr = moment().tz(timeZone).zoneAbbr(); // Get the timezone abbreviation for each file
          f.createdAt = month + " " + date + ", " + yr + " " + time + " " + abbr;
        });
      }
    }
  }
}


