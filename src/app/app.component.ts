import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'emstum_internal';
  // isScrolled = false;
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   this.isScrolled = window.scrollY > 10; // adjust the value as needed
  // }
}
