import { Component, OnInit, HostListener } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from './services/userauth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated = false;
  isSidebarVisible = false;

  constructor(private auth: Auth, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
    this.checkScreenWidth();
  }

  async onLogout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
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
    this.isSidebarVisible = window.innerWidth >= 760; // Adjust the breakpoint as needed
    console.log( this.isSidebarVisible)
  }
}
