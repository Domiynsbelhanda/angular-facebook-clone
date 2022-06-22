import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _userData: Observable<firebase.User>;

  private currentUser: UserData | undefined;
  // @ts-ignore
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afs: AngularFirestore) {
    // @ts-ignore
    this._userData = afAuth.authState;

    this._userData.subscribe(user => {
      if (user) {
        this.afs.collection<UserData>('users')
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe(currentUser => {
            this.currentUser = currentUser;
            // @ts-ignore
            this.currentUser$.next(currentUser);
          });
      }
    });

  }

  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }

  SignUp(email: string,
         password: string,
         firstName: string,
         lastName: string,
         avatar = 'https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png'): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res) {
          // @ts-ignore
          this.afs.collection('users').doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar
            }).then(value => {
            this.afs.collection<UserData>('users')
              .doc<UserData>(res.user?.uid)
              .valueChanges()
              .subscribe(user => {
                console.log(user);
                if (user) {
                  this.currentUser$.next(user);
                }
              });

          });
        }
      })
      .catch(err => console.log(`Something went wrong ${err.message}`));
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  SignIn(email: string, password: string): void {
    console.log(email, password);

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        // @ts-ignore
        this._userData = this.afAuth.authState;

        this.afs.collection<UserData>('users')
          .doc<UserData>(res.user?.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            // @ts-ignore
            this.currentUser = user;
            // @ts-ignore
            this.currentUser$.next(this.currentUser);
          });


      }).catch(err => console.log(err.message));
  }

  Logout(): void {
    this.afAuth.signOut().then(res => {
      console.log(res);
      // @ts-ignore
      this.currentUser = null;
      // @ts-ignore
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl('/login').then();
    });
  }

  searchUserInDatabase(user_id: string): Observable<UserData> {
    // @ts-ignore
    return this.afs.collection<UserData>('users').doc<UserData>(user_id).valueChanges();
  }

}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}