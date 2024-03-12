import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import data from "../../assets/server.json";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-new-org',
  templateUrl: './register-new-org.component.html',
  styleUrls: ['./register-new-org.component.scss']
})
export class RegisterNewOrgComponent implements OnInit {
  activePage: number = 1;
  isShowPassword: boolean = false;
  inputType: string = "password";
  submitted: boolean = false;
  isLoading: boolean = false;
  initialForm: FormGroup;
  serverId: number = 0;
  password: string = null;
  serverDetail: Array<any> = data;
  baseUrl: string = "http://localhost:8075/api/"
  constructor( private fb: FormBuilder,
               private http: HttpClient) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.initialForm = this.fb.group({
      Server: new FormControl(null, [Validators.required]),
      Database: new FormControl(null, [Validators.required]),
      Port: new FormControl(null, [Validators.required]),
      User_Id: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required]),
      OrganizationName: new FormControl(null, [Validators.required]),
      CompanyName: new FormControl(null, [Validators.required]),
      FirstName: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null, [Validators.required]),
      EmailId: new FormControl(null, [Validators.required, Validators.email]),
      GSTNo: new FormControl(null, [Validators.required]),
      AccountNo: new FormControl(null, [Validators.required]),
      BankName: new FormControl(null, [Validators.required]),
      Branch: new FormControl(null, [Validators.required]),
      BranchCode: new FormControl(null, ),
      IFSC: new FormControl(null, [Validators.required]),
      IsPrimaryAccount: new FormControl (true, [Validators.required]),
      Mobile: new FormControl(null, [Validators.required]),
      FirstAddress: new FormControl(null, [Validators.required]),
      SecondAddress: new FormControl(null, [Validators.required]),
      ThirdAddress: new FormControl(null),
      ForthAddress: new FormControl(null),
      Country: new FormControl(null),
      State: new FormControl(null),
      City: new FormControl(null),
    })
  }

  get f () {
    return this.initialForm.controls;
  }

  registerAccount() {
    this.isLoading = true;
    this.submitted = true;
    console.log(this.initialForm.value);
    if (this.initialForm.invalid) {
      this.isLoading = false;
      return;
    }
    let value = this.initialForm.value;
    this.http.post(this.baseUrl + "create/new_organization", value).subscribe({
      next: data => {
        alert("Created");
        this.isLoading = false;
      },
      error: error => {
        alert(error.message);
        this.isLoading = false;
      }
    })
  }

  showPassword() {
    if (!this.isShowPassword) {
      this.inputType = "text";
      this.isShowPassword = true;
    } else {
      this.inputType = "password";
      this.isShowPassword = false;
    }
  }

  nextPage() {
    if (this.password && this.serverId > 0) {
      let server = this.serverDetail.find(x => x.Id = this.serverId);
      if (server) {
        this.initialForm.get("Server").setValue(server.Server);
        this.initialForm.get("Database").setValue(server.Database);
        this.initialForm.get("Port").setValue(server.Port);
        this.initialForm.get("User_Id").setValue(server.User_Id);
        this.initialForm.get("Password").setValue(this.password);
        this.activePage = 2;
        this.submitted = false;
      }
    } else {
      this.submitted = true;
    }
  }
}