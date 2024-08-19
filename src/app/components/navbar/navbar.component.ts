import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AvatarService } from 'src/app/services/avatar.service';
import { AuthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  // constructor(private authService: AuthService, private router: Router) { }

  profileImageUrl: string | null = null;

  constructor(
    private avatarService: AvatarService,
    private auth: Auth,
    private authService: AuthService, private router: Router
  ) {}

  ngOnInit() {
    this.avatarService.getUserProfile().subscribe((profile: any) => {
      this.profileImageUrl = profile?.imageURL || null;
    });  }

  // async loadProfileImage() {
  //   const user = this.auth.currentUser;
  //   if (user) {
  //     const profile = await this.avatarService.getUserProfile();
  //     if (profile && profile.imageURL) {
  //       this.profileImageUrl = profile.imageURL;
  //     }
  //   }
  // }
  async onLogout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  // ngOnInit() { console}

}
