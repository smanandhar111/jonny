import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service';
import {Observable} from 'rxjs';
import {ProductsModel} from './products.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  prod$: Observable<ProductsModel[]>;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.prod$ = this.productService.products$;
  }

}
