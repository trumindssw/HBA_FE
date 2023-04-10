import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HostListener } from '@angular/core';

@Component({
selector: 'app-upload',
templateUrl: './upload.component.html',
styleUrls: ['./upload.component.css']

})

export class UploadComponent implements OnInit {

  public error: any ;
  public dragAreaClass: any;
  public draggedFiles: any;
  

  constructor(private router: Router) { }
  ngOnInit(){
    this.dragAreaClass = "dragarea";
  }
  onBtn(){

  this.router.navigate(['/previousrequests']);
  }

  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
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
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {

    if (files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") this.error = "Upload XLSX format only";
    else {
      this.error = "";
      console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      console.log(files);
    }

    // console.log(files[0].size,files[0].name,files[0].type);
    //   this.draggedFiles = files;
    //   console.log(files);
  }

  


}


