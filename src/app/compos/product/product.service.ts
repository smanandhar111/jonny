import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AddToFavModel} from '../../models/models';
import {throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uuid: string;
  itemCollection = this.afs.collection('items');
  wishCollection = this.afs.collection('wish');
  cartItems$: Observable<AddToFavModel[]>;
  wishList$: Observable<AddToFavModel[]>;
  constructor(private afs: AngularFirestore) {
      this.getUserData();
  }

  products$ = this.itemCollection.snapshotChanges().pipe(
    map(changes => {
      return changes.map(a => {
        const resp = a.payload.doc.data() as ProductsModel;
        resp.id = a.payload.doc.id;
        return resp;
      });
    }),
    catchError(this.handleError)
  );

  getUserData(): void {
    this.cartItems$ = this.afs.collection(`userData/${this.uuid}/cart`).snapshotChanges()
      .pipe(
        map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as AddToFavModel;
        });
      }),
        catchError(this.handleError)
      );

    this.wishList$ = this.afs.collection(`userData/${this.uuid}/wish`).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            return a.payload.doc.data() as AddToFavModel;
          });
        }),
        catchError(this.handleError)
      );
  }

  handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  addToWish(addToFav: AddToFavModel) {
    this.afs.collection(`userData/${this.uuid}/wish`).add(addToFav);
  }

  addItem(item: ProductsModel) {
    this.itemCollection.add(item);
  }

  addToCart(addToFav: AddToFavModel) {
    this.afs.collection(`userData/${this.uuid}/cart`).add(addToFav);
  }
}
