import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // itemCollection: AngularFirestoreCollection<ProductsModel>;
  // wishCollection: AngularFirestoreCollection<WishCart>;
  errMessage: string;
  itemCollection = this.afs.collection('items');
  wishCollection = this.afs.collection('wish');
  constructor(private afs: AngularFirestore) {}

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


  addItem(item: ProductsModel) {
    this.itemCollection.add(item);
  }
  // addToWish(id: string) {
  //   this.wishCollection.add(id);
  // }
}
