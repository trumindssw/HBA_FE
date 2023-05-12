import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Uploadservice } from 'src/app/_services/upload/upload.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
// import * as XLSX from 'xlsx';
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

  

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private UploadService: Uploadservice) { }
  ngOnInit(){
    this.UploadService.getAllFiles().subscribe(
      response => {
        // console.log(response.data);
        this.files = response.data;

        let timeZone = '';
        // Get system's timezone
        if (typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function') {
          console.log(Intl.DateTimeFormat().resolvedOptions())
          timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }

        let abbr = moment().tz(timeZone).zoneAbbr();
        
        if(this.files && this.files.length>0) {
          this.files.map((f: { createdAt: string | number | Date; }) => {
            let dt = new Date(f.createdAt);
            let month = dt.toLocaleString('default', { month: 'long' });
            let yr = dt.getFullYear();
            let date = dt.getDate();
            let time = dt.getHours() + "." + dt.getMinutes();
            f.createdAt = month + " " + date + ", " + yr + " " + time + " " + abbr ;
          })
        }
      }
    )
    this.dragAreaClass = "dragarea";
  }
  onBtn(){

  this.router.navigate(['/previousrequests']);
  }

  downloadFile(fileNames: string){

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


  onFileChange(event: any) 
  {
    console.log("I am in onfilechange")
    if(event.target.value) 
    {
        this.fl = <File>event.target.files[0];
        this.chosen=true;
        this.uploading = true;
        this.saveFiles();
        event.target.value='';
        this.ngOnInit()
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

        } else {
          this.error = true;
          this.colour = false;
          this.message = res.message;
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
}


