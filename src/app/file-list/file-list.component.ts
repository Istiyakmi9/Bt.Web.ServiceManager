import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorToast, ShowModal, Toast } from '../services/common.service';
import { FileDetail } from '../json-editor/json-editor.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [FormsModule, NgbTooltipModule, CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  baseUrl: string = "";
  fileDetails: Array<FileDetail> = [];
  isPageReady: boolean = false;
  selectDeleteFile: FileDetail = null;
  isLoading: boolean = false;
  constructor(private http: HttpClient,
              private router: Router
  ) {}
  ngOnInit(): void {
    this.baseUrl = environment.baseURL;
    this.getAllFileAndFolder();
  }

  getAllFileAndFolder() {
    this.http.get(this.baseUrl + "FileDetail/getAllFiles").subscribe({
      next: (res: any) => {
        this.fileDetails = res.responseBody;
        Toast("Data loaded successfully");
        this.isPageReady = true;
      },
      error: error => {
        ErrorToast(error);
        this.isPageReady = true;
      }
    })
  }

  viewFile(item: FileDetail) {
    if (item) {
      this.router.navigate(["/ems/filelist/jsoneditor"], {queryParams: {Id: item.FileDetailId}});
    }
  }

  addNewFile() {
    this.router.navigate(["/ems/filelist/jsoneditor"], {queryParams: {Id: 0}});
  }

  deleteFilePopup(item: FileDetail) {
    this.selectDeleteFile= null;
    this.selectDeleteFile = item;
    ShowModal("deleteFileModal");
  }

  deleteFile() {
    if (this.selectDeleteFile) {
      this.isLoading = true;
      this.http.post(this.baseUrl + "FileDetail/deleteFile", this.selectDeleteFile).subscribe({
        next: (res: any) => {
          this.fileDetails = res.responseBody;
          Toast("File deleted successfully");
          this.isLoading = false;
        },
        error: error => {
          ErrorToast(error);
          this.isLoading = false;
        }
      })
    }
  }
}
