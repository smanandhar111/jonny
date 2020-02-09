import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AddToFavModel} from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<ProductsModel[]>;
  wishList$: Observable<AddToFavModel[]>;
  errMessage: string;
  itemCollection: AngularFirestoreCollection<ProductsModel>;
  wishCollection: AngularFirestoreCollection<AddToFavModel>;
  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('items');
    this.wishCollection = this.afs.collection('wish');
  }

  getProducts(): void {
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

  getWishListItems(): void {
    this.wishList$ = this.wishCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as AddToFavModel;
        });
      })
    )
  }
  addToWish(addToFav: AddToFavModel) {
    this.wishCollection.add(addToFav);
  }
}
