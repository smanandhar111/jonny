import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Subscription} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AddToFavModel} from '../../models/models';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  prodIdSub: Subscription;
  productId = this.activeRoute.snapshot.paramMap.get('id');
  imgCaro = 1;
  inCart: boolean;
  addToFav: AddToFavModel = {
    uid: ''
  };
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
    console.log('route', this.activeRoute.snapshot.paramMap.get('id'));
  }
  imgCaros(numb) {
    this.imgCaro = numb;
  }

  addToFavClick(id: string, src: string) {
    const sessionStoreAuth = sessionStorage.getItem('auth');
    this.addToFav.uid = id;
    if (sessionStoreAuth === 'true') {
      if (src === 'wish') {
        this.productService.addToWish(this.addToFav);
      } else {
        this.productService.addToCart(this.addToFav);
      }
    } else {
      this.authService.googleLogin();
    }
  }
  ngOnDestroy(): void {
  }
}
