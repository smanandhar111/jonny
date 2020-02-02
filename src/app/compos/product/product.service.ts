import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {WishCart} from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<ProductsModel[]>;
  errMessage: string;
  itemCollection: AngularFirestoreCollection<ProductsModel>;
  wishCollection: AngularFirestoreCollection<WishCart>;
  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('items');
    this.wishCollection = this.afs.collection('wish');
  }

  getProducts() {
    this.products$ = this.itemCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const resp = a.payload.doc.data() as ProductsModel;
          resp.id = a.payload.doc.id;
          return resp;
        });
      }),
      catchError(err => {
        this.errMessage = err;
        return EMPTY;
      })
    );
  }
  addItem(item: ProductsModel) {
    this.itemCollection.add(item);
  }
  // addToWish(id: string) {
  //   this.wishCollection.add(id);
  // }
}
