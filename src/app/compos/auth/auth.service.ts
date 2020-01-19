import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login: Promise<any>;
  logStatus$: Observable<any> = this.af.user;
  constructor(private af: AngularFireAuth) {}

  googleLogin() {
    this.login = this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  googleLogout() {
    this.af.auth.signOut();
  }
}




