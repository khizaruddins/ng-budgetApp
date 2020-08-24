import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid = this.afAuth.authState.pipe(
    map(authState => !authState ? null: authState.uid)
  );
  isAdmin = of(true);
  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(){
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut()
  }
}
