import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  constructor(private router: Router,
              private auth: AuthService
  ) {}
  login() {
    this.submitted = true;
    if (this.email == null || this.email == "") {
      alert("Please enter email");
      return;
    }

    if (this.password == null || this.password == "") {
      alert("Please enter password");
      return;
    }

    if (this.email != "info@bottomhalf.in") {
      alert("Please enter registered email id");
      return;
    }

    if (this.password != "123456789") {
      alert("Please enter correct password");
      return;
    }

    this.auth.login();
    this.router.navigateByUrl("/ems/companytrialist");
  }

  showHidePassword() {
    this.isPasswordShow = !this.isPasswordShow;
    if (this.isPasswordShow)
      this.type = "text";
    else
      this.type = "password";
  }
}
