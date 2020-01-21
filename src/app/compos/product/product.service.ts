import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ProductsModel} from './products.model';
import {EMPTY, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<ProductsModel[]>;
  errMessage: string;
  constructor(private afs: AngularFirestore) { }

  getProducts() {
    this.products$ = this.afs.collection('items').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          return a.payload.doc.data() as ProductsModel;
        });
      }),
      catchError(err => {
        this.errMessage = err;
        return EMPTY;
      })
    );
  }

}
