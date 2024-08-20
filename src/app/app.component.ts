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



// import { Component, OnInit, HostListener } from '@angular/core';
// import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
// import { AuthService } from './services/userauth.service';
// import { AvatarService } from './services/avatar.service'; // Import AvatarService
// import { Router } from '@angular/router';
// import { PrimeNGConfig } from 'primeng/api';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {

//   isAuthenticated = false;
//   isLargeScreen = false;
//   userImageUrl: string | null = null;
//   isProfileMenuOpen : boolean= false; // Track profile menu state

//   constructor(
//     private auth: Auth, 
//     private authService: AuthService, 
//     private avatarService: AvatarService, // Inject AvatarService
//     private router: Router, 
//     private primengConfig: PrimeNGConfig
//   ) {}

//   ngOnInit() {
//     this.checkAuthentication();
//     this.checkScreenWidth();
//     this.primengConfig.zIndex = {
//       modal: 1100,
//       overlay: 1000,
//       menu: 1000,
//       tooltip: 1100
//     };
//   }

//   async onLogout() {
//     await this.authService.logout();
//     this.router.navigateByUrl('/login', { replaceUrl: true });
//   }

//   private async checkAuthentication() {
//     onAuthStateChanged(this.auth, async (user: User | null) => {
//       this.isAuthenticated = !!user;

//       if (this.isAuthenticated) {
//         this.avatarService.getUserProfile().subscribe((profile: any) => {
//           this.userImageUrl = profile?.imageURL || null;
//         });  
//         // this.userImageUrl = profile?.imageURL || null;
//       }
//     });
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.checkScreenWidth();
//   }

//   private checkScreenWidth() {
//     this.isLargeScreen = window.innerWidth >= 760; // Adjust the breakpoint as needed
//   }

//   toggleProfileMenu() {
//     this.isProfileMenuOpen = !this.isProfileMenuOpen;
//     console.log(this.isProfileMenuOpen)
//   }

//   navigateToProfile() {
//     this.router.navigate(['/profile']);
//     this.isProfileMenuOpen = false; // Close menu after navigation
//   }

//   async handleLogout() {
//     await this.onLogout();
//     this.isProfileMenuOpen = false; // Close menu after logout
//   }
// }





import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from './services/userauth.service';
import { AvatarService } from './services/avatar.service';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { PopoverController } from '@ionic/angular';
import { ProfilePopoverComponent } from './components/profile-popover/profile-popover.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated = false;
  isLargeScreen = false;
  userImageUrl: string | null = null;

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private avatarService: AvatarService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private popoverController: PopoverController
  ) {}

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

  private async checkAuthentication() {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.avatarService.getUserProfile().subscribe((profile: any) => {
                    this.userImageUrl = profile?.imageURL || null;
                  });  
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isLargeScreen = window.innerWidth >= 760;
  }

  async openProfilePopover(event: Event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent, // Use the ProfilePopoverComponent here
      event: event,
      translucent: true
    });
    await popover.present();
  }

  async navigateToProfile() {
    this.router.navigate(['/profile']);
    await this.closePopover();
  }

  async handleLogout() {
    await this.onLogout();
    await this.closePopover();
  }

  async closePopover() {
    const popover = await this.popoverController.getTop();
    if (popover) {
      await popover.dismiss();
    }
  }
}
