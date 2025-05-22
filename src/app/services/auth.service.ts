import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: string = "Emstum-Internal-Auth"
  private isLoggedIn = false;
  constructor(private router: Router){}
  login() {
    this.isLoggedIn = true;
    sessionStorage.setItem(this.auth, 'true'); // Optional: persist login
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem(this.auth);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || sessionStorage.getItem(this.auth) === 'true';
  }
}
