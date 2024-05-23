import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import data from "../../assets/server.json";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-new-org',
  templateUrl: './register-new-org.component.html',
  styleUrls: ['./register-new-org.component.scss']
})
export class RegisterNewOrgComponent implements OnInit {
  activePage: number = 2;
  isShowPassword: boolean = false;
  inputType: string = "password";
  submitted: boolean = false;
  isLoading: boolean = false;
  initialForm: FormGroup;
  serverId: number = 0;
  password: string = null;
  serverDetail: Array<any> = data;
  baseUrl: string = "http://localhost:8075/api/";
  trailRequestId: number = 0;
  isPageReady: boolean = false;
  companyIntialDetai: CompanyIntialDetai = {
  OrganizationName : "",
  FullName : "",
  Email : "",
  GSTNo : "",
  CompanyName : "",
  PhoneNumber : "",
  FullAddress : "",
  Country : "",
  State : "",
  City : "",
  ProbationPeriodInDays : 0,
  NoticePeriodInDays : 0,
  NoticePeriodInProbation : 0,
  TimezoneName : ""
  }
  constructor( private fb: FormBuilder,
               private http: HttpClient,
              private router: ActivatedRoute) {
    this.trailRequestId = Number(this.router.snapshot.queryParams['Id']);
  }

  ngOnInit(): void {
    if (this.trailRequestId > 0) {
      this.loadData()
    } else {
      this.isPageReady = true;
      this.initForm();
    }
  }

  loadData() {
    this.isPageReady = false;
    this.http.get(this.baseUrl + `trial/getCompanyTrial/${this.trailRequestId}`).subscribe({
      next: (data: any) => {
        this.companyIntialDetai = data.responseBody;
        if (!this.companyIntialDetai.OrganizationName)
          this.companyIntialDetai.OrganizationName = this.companyIntialDetai.CompanyName;

        this.initForm();
        this.isPageReady = true;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  initForm() {
    this.initialForm = this.fb.group({
      TrailRequestId: new FormControl(this.trailRequestId, [Validators.required]),
      OrganizationName: new FormControl(this.companyIntialDetai.OrganizationName, [Validators.required]),
      OwnerName: new FormControl(this.companyIntialDetai.FullName, [Validators.required]),
      EmailId: new FormControl(this.companyIntialDetai.Email, [Validators.required, Validators.email]),
      GSTNo: new FormControl(this.companyIntialDetai.GSTNo, [Validators.required]),
      CompanyName: new FormControl(this.companyIntialDetai.CompanyName, [Validators.required]),
      Mobile: new FormControl(this.companyIntialDetai.PhoneNumber, [Validators.required]),
      FullAddress: new FormControl(this.companyIntialDetai.FullAddress, [Validators.required]),
      Country: new FormControl(this.companyIntialDetai.Country),
      State: new FormControl(this.companyIntialDetai.State),
      City: new FormControl(this.companyIntialDetai.City),
      ProbationPeriodInDays: new FormControl(90),
      NoticePeriodInDays: new FormControl(90),
      NoticePeriodInProbation: new FormControl(90),
      TimezoneName: new FormControl("India Standard Time")
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
    if (value.OwnerName.includes(" ")) {
      let name = value.OwnerName.split(" ");
      if (name == null) {
        alert("Unable to read owner name");
        return;
      }

      if (name.length >= 2) {
        value.FirstName = name[0];
        value.LastName = name.splice(1).join(" ");
      } else {
        value.FirstName = name[0];
        value.LastName = "";
      }
    } else {
      value.FirstName = value.OwnerName;
      value.LastName = "";
    }
    if (value.FullAddress.includes(" ")) {
      let address = value.FullAddress.split(" ");
      if (address == null) {
        alert("Unable to read full address");
        return;
      }

      if (address.length >= 3) {
        value.FirstAddress = address[0] + " " + address[1];
        value.SecondAddress = address.splice(2).join(" ");
      }
       else {
        value.FirstAddress = address[0];
        value.LastAddress = address[1];
       }
    }
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

interface CompanyIntialDetai {
  OrganizationName: string,
  FullName: string,
  Email: string,
  GSTNo: string,
  CompanyName: string,
  PhoneNumber: string,
  FullAddress: string,
  Country: string,
  State: string,
  City: string,
  ProbationPeriodInDays: number,
  NoticePeriodInDays: number,
  NoticePeriodInProbation: number,
  TimezoneName: string,
}
