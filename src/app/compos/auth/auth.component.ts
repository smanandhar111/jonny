import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable, of, Subscription} from 'rxjs';
import {ProductService} from '../product/product.service';
import {catchError, map} from 'rxjs/operators';
import {AddToFavModel} from '../../models/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authenticatedUserInfo: any;
  userLoggedIn: boolean;
  authSub: Subscription;
  errMessage: string;
  cartItems: number;
  uuid: string;

  cartItem$ = this.productService.cartItem$.pipe(
    map((wishes) => {
      of(wishes.length).subscribe((data) => this.cartItems = data);
    }),
    catchError(err => this.errMessage = err)
  ).subscribe(() => console.log('okay')); // TODO: dont do anything

  constructor(private authService: AuthService,
              private productService: ProductService) { }

  ngOnInit() {
    this.authSub = this.authService.logStatus$.subscribe((data) => {
      this.authenticatedUserInfo = data;
      this.userLoggedIn = this.authenticatedUserInfo != null;
      // setting uuid after using log in the first time
      const sessionUuid = sessionStorage.getItem('uuid');
      if (!sessionUuid) {
        (this.userLoggedIn) ? sessionStorage.setItem('uuid', data.uid) :
          sessionStorage.setItem('uuid', null);
      }
      const sessionAuth = sessionStorage.getItem('auth');
      if (!sessionAuth) {
        (this.userLoggedIn) ? sessionStorage.setItem('auth', 'true') :
          sessionStorage.setItem('auth', 'false');
      }
    });
  }

  login(): void {
    this.authService.googleLogin();
  }
  logout(): void {
    this.authService.googleLogout();
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
