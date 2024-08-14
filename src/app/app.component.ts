// import { Component, OnInit, HostListener } from '@angular/core';
// import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
// import { AuthService } from './services/userauth.service';
// import { Router } from '@angular/router';
// import { PrimeNGConfig } from 'primeng/api';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {

//   isAuthenticated = false;
//   isSidebarVisible = false;

//   constructor(private auth: Auth, private authService: AuthService, private router: Router, private primengConfig: PrimeNGConfig) {}

//   ngOnInit() {
//     this.checkAuthentication();
//     this.checkScreenWidth();
//     this.primengConfig.zIndex = {
//       modal: 1100,    // dialog, sidebar
//       overlay: 1000,  // dropdown, overlaypanel
//       menu: 1000,     // overlay menus
//       tooltip: 1100   // tooltip
//   };
//   }

//   async onLogout(){
//     await this.authService.logout();
//     this.router.navigateByUrl('/login', {replaceUrl: true});
//   }

//   private checkAuthentication() {
//     onAuthStateChanged(this.auth, (user: User | null) => {
//       this.isAuthenticated = !!user;
//     });
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.checkScreenWidth();
//   }

//   private checkScreenWidth() {
//     this.isSidebarVisible = window.innerWidth >= 760; // Adjust the breakpoint as needed
//     console.log( this.isSidebarVisible)
//   }
// }



import { Component, OnInit, HostListener } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from './services/userauth.service';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated = false;
  isLargeScreen = false;

  constructor(private auth: Auth, private authService: AuthService, private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.checkAuthentication();
    this.checkScreenWidth();
    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    };
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  private checkAuthentication() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.isAuthenticated = !!user;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isLargeScreen = window.innerWidth >= 760; // Adjust the breakpoint as needed
  }
}
