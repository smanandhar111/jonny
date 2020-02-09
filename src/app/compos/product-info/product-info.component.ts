import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import {Observable, Subscription} from 'rxjs';
import {ProductsModel} from '../product/products.model';
import {every, map, tap} from 'rxjs/operators';
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
  prodSub: Subscription;
  authSub: Subscription;
  isLogged: boolean;
  productId: string;
  imgCaro = 1;
  prodItems: ProductsModel[];
  currentItem: ProductsModel;
  addToFav: AddToFavModel = {
    uid: ''
  };

  wishList$ = this.productService.wishList$.pipe(

  )
  constructor(private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.getParamId();
    this.getProductInfo();
  }
  getParamId(): void {
    this.prodIdSub = this.activeRoute.params.subscribe(params => {
      this.productId = params[`id`];
    });
  }
  getProductInfo() {
    this.productService.getProducts();
    this.prodSub = this.productService.products$.subscribe(item => {
      this.prodItems = item;
      this.prodItems.forEach(i => {
        if (i.id === this.productId) {
          this.currentItem = i;
        }
      });
    });
  }
  imgCaros(numb) {
    this.imgCaro = numb;
  }

  addToWishList(id: string) {
    const sessionStoreAuth = sessionStorage.getItem('auth');
    this.addToFav.uid = id;
    if (sessionStoreAuth === 'true') {
      this.productService.addToWish(this.addToFav);
    } else {
      this.authService.googleLogin();
    }
  }
  ngOnDestroy(): void {
    this.prodIdSub.unsubscribe();
  }
}
