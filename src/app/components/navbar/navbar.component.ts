import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarService } from 'src/app/services/avatar.service';
import { AuthService } from 'src/app/services/userauth.service';
import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {


  profileImageUrl: string | null = null;

  constructor(
    private avatarService: AvatarService,
    private auth: Auth,
    private authService: AuthService, private router: Router,
    private primengConfig: PrimeNGConfig,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.avatarService.getUserProfile().subscribe((profile: any) => {
      this.profileImageUrl = profile?.imageURL || null;
    });  
    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    };
  }

  async onLogout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  async openProfilePopover(event: Event) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent, // Use the ProfilePopoverComponent here
      event: event,
      translucent: true
    });
    await popover.present();
  }
  // ngOnInit() { console}

}
