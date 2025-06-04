import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ErrorToast, Toast } from '../services/common.service';
import { CompanyName } from '../services/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordShow: boolean = false;
  type: string = "password";
  password: string = "";
  email: string = "";
  submitted: boolean = false;
  company: string ="Emstum"
  constructor(private router: Router,
              private auth: AuthService
  ) {}

  login() {
    this.submitted = true;
    if (this.email == null || this.email == "") {
      ErrorToast("Please enter email");
      return;
    }

    if (this.password == null || this.password == "") {
      ErrorToast("Please enter password");
      return;
    }

    
    if (this.company == 'Emstum') {
      if (this.email != "info@bottomhalf.in") {
        ErrorToast("Please enter registered email id");
        return;
      }
      
      if (this.password != "123456789") {
        ErrorToast("Please enter correct password");
        return;
      }
    } else if (this.company == 'ElitePay') {
      if (this.email != "info@elitepayroll.in") {
        ErrorToast("Please enter registered email id");
        return;
      }
      
      if (this.password != "123456789") {
        ErrorToast("Please enter correct password");
        return;
      }
    }


    this.auth.login();
    sessionStorage.setItem(CompanyName, this.company);
    this.router.navigateByUrl("/ems/companytrialist");
    Toast("Login successfully.")
  }

  showHidePassword() {
    this.isPasswordShow = !this.isPasswordShow;
    if (this.isPasswordShow)
      this.type = "text";
    else
      this.type = "password";
  }
}
