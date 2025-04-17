import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isPasswordShow: boolean = false;
  type: string = "password";
  constructor(private router: Router) {}
  login() {
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
