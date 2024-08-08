import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/userauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  async onLogout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  ngOnInit() { console}

}
