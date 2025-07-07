import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorToast, ShowModal, Toast } from '../services/common.service';
import { FileDetail } from '../json-editor/json-editor.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, Location } from '@angular/common';
import { BreadcrumsComponent } from '../breadcrums/breadcrums.component';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [FormsModule, NgbTooltipModule, CommonModule, BreadcrumsComponent],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FileListComponent implements OnInit {
  private baseUrl: string = "";
  fileDetails: Array<FileDetail> = [];
  isPageReady: boolean = false;
  selectDeleteFile: FileDetail = null;
  isLoading: boolean = false;
  rootPath: any = {"Name": "root", "Id": 0};
  routePath: Array<any> = [];
  tokenFileDetail: TokenFileDetail = {Key: null, CompanyCode: null, ExpiryTimeInSeconds: null, Issuer: null};
  submitted: boolean = false;
  constructor(private http: HttpClient,
              private router: Router,
              private location: Location
  ) {}
  ngOnInit(): void {
    this.baseUrl = environment.baseURL;
    this.load_files_dirs(0);
  }

  load_files_dirs(parentId: number) {
    this.http.get(this.baseUrl + `FileDetail/getFilesDirs/${parentId}`).subscribe({
      next: (res: any) => {
        // this.location.go(`filelist/${parentId}`)
        this.fileDetails = res.responseBody;
        this.routePath = [this.rootPath];
        if(this.fileDetails.length > 0 && this.fileDetails[0]["Paths"] != null) {
          let paths: Array<any> = JSON.parse(this.fileDetails[0]["Paths"]);
          this.routePath.push(...paths.reverse());
        }

        Toast("Data loaded successfully");
        this.isPageReady = true;
      },
      error: error => {
        ErrorToast(error.error.ResponseBody);
        this.isPageReady = true;
      }
    })
  }

  loadNext(item: FileDetail) {
    if (item.Extension == 'dir') {
      this.load_files_dirs(item.FileDetailId);
    } else {
      this.viewFile(item);    
    }
  }

  loadRoute(id: number) {
    this.load_files_dirs(id);
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
          ErrorToast(error.error.ResponseBody);
          this.isLoading = false;
        }
      })
    }
  }

  addTokenFilePoppup() {
    this.submitted = false;
    this.tokenFileDetail = {Key: null, CompanyCode: null, ExpiryTimeInSeconds: null, Issuer: null};
    ShowModal("manageTokenFileModal");
  }

  saveTokenDetail() {
    this.submitted = true;
    if (!this.tokenFileDetail.Key) {
      ErrorToast("Please add secret key");
      return;
    }

    if (!this.tokenFileDetail.Issuer) {
      ErrorToast("Please add issuer");
      return;
    }

    if (!this.tokenFileDetail.CompanyCode) {
      ErrorToast("Please add company code");
      return;
    }

    if (this.tokenFileDetail.ExpiryTimeInSeconds == null || this.tokenFileDetail.ExpiryTimeInSeconds < 6000) {
      ErrorToast("Please specify an expiry time greater than 6000.");
      return;
    }
    this.saveContent();
  }

  generateSecretKey() {
    const length = 32;
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array)
    this.tokenFileDetail.Key = Array.from(array, b => ('0' + (b & 0xff).toString(16)).slice(-2)).join('').substring(0, length);
  }

  private saveContent() {
    this.isLoading = true;
    
    this.http.post(this.baseUrl + "FileDetail/saveTokenFile", this.tokenFileDetail).subscribe({
      next: (res: any) => {
        Toast("Token detail inert/updated successfully");
        //HideModal("manageTokenFileModal");
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        ErrorToast(error.error.ResponseBody);
      }
    })
  }
}

export interface TokenFileDetail {
  Key: string;
  Issuer: string;
  CompanyCode: string;
  ExpiryTimeInSeconds: number;
}