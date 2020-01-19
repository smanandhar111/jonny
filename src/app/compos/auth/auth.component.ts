import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authenticatedUserInfo: any;
  userLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logStatus$.subscribe((data) => {
      this.authenticatedUserInfo = data;
      this.userLoggedIn = this.authenticatedUserInfo != null;
    });
  }

  login(): void {
    this.authService.googleLogin();
  }
  logout(): void {
    this.authService.googleLogout();
  }
}
