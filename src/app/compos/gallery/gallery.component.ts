import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ProductsModel} from '../product/products.model';
import {ProductService} from '../product/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  productSub: Subscription;
  prodItems: ProductsModel[];
  @Input() filterType: string;
  @Input() filterPrice: string;
  @Input() filterColor: string;
  @Input() fromWishList: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter();
  @Input() selfId: string;
  @Input() adminMode: boolean;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProducts();
    this.productSub = this.productService.products$.subscribe(data => {
      this.prodItems = data;
    });
  }

  getProdDetails(id: number) {
    this.router.navigate(['/prod-details', id]);
  }

  // Copy of Clipboard
  copyId(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  removeItem(id: string) {
    this.notify.emit(id);
  }
  getDemClass(imgDem: string) {
    // if (imgDem === 'port') {
    //   return 'port';
    // } if (imgDem === 'wide') {
    //   return 'wide';
    // } if (imgDem === 'cube') {
    //   return 'cube';
    // }
    // return 'cube';
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
