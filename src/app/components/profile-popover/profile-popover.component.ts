import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Auth } from 'firebase/auth';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarService } from 'src/app/services/avatar.service';
import { AuthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent  implements OnInit {

  constructor(
    // private auth: Auth,
    private authService: AuthService,
    private avatarService: AvatarService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private popoverController: PopoverController
  ) { }

  ngOnInit(): void {
      console.log();
  }

  async handleLogout() {
    await this.onLogout();
    await this.closePopover();
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async closePopover() {
    const popover = await this.popoverController.getTop();
    if (popover) {
      await popover.dismiss();
    }
  }

}
