import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HostListener } from '@angular/core';
import { Uploadservice } from 'src/app/_services/upload.service';

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
  

  constructor(
      private router: Router,
      private UploadService: Uploadservice) { }
  ngOnInit(){
    this.dragAreaClass = "dragarea";
  }
  onBtn(){

  this.router.navigate(['/previousrequests']);
  }

  onFileChange(event: any) {
    if(event.target.value) {

            this.fl = <File>event.target.files[0];
      
            this.chosen=true;
      
            this.saveFiles();
      
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
    let fd =new FormData();

    if(this.fl) {

      fd.append("file", this.fl, this.fl.name);

      this.UploadService.UploadExcel(fd).subscribe((res) => {

        console.log("#$EDCRFVTGHBJ: ", res)

        if(res.status == 1) {

          this.error = false;

          this.message = res.message;

        } else {

          this.error = true;

          this.message = res.message;

        }

      });
  }
  }
  
}


