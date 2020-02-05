import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Observable, Subscription} from 'rxjs';
import {ProductsModel} from '../product/products.model';
import {catchError, every, map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  prodIdSub: Subscription;
  authSub: Subscription;
  isLogged: boolean;
  productId: string;
  imgCaro = 1;
  errMessage: string;

  product$ = this.productService.products$
    .pipe(
      map(product =>
        product.filter(prod => {
          if (prod.id === this.productId) {
            return prod;
          }
        })),
      catchError(err => this.errMessage = err)
    );

  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.getParamId();
  }
  getParamId(): void {
    this.prodIdSub = this.activeRoute.params.subscribe(params => {
      this.productId = params[`id`];
    });
  }
  imgCaros(numb) {
    this.imgCaro = numb;
  }

  checkAuthentication(): boolean {
    this.authSub = this.authService.logStatus$.subscribe((data) => {
      this.isLogged = data != null;
    });
    return this.isLogged;
  }

  addToWishList(id: string) {
    console.log('>>>', id);
    if (this.checkAuthentication()) {
      // this.productService.addToWish(id);
    } else {
      this.authService.googleLogin();
    }
  }
  ngOnDestroy(): void {
    this.prodIdSub.unsubscribe();
  }
}
