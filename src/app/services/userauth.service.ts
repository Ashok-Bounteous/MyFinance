// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// import * as firebase from 'firebase/compat/app';

// export interface User {
//   email: string;
//   id: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserauthService {

//   constructor(private auth: AngularFireAuth) {}

//   recoverEmailPassword(email: string): Observable<void> {
//     return new Observable<void>(observer => {
//       this.auth.sendPasswordResetEmail(email).then(() => {
//         observer.next();
//         observer.complete();
//       }).catch(error => {
//         observer.error(error);
//         observer.complete();
//       });
//     });
//   }

//   login(email: string, password: string): Observable<User> {
//     return new Observable<User>(observer => {
//       console.log("Came to auth service - login")
//       this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
//         this.auth.signInWithEmailAndPassword(email, password).then((firebaseUser: firebase.default.auth.UserCredential) => {
//           observer.next({ email, id: firebaseUser.user?.uid! });
//           observer.complete();
//         }).catch(error => {
//           observer.error(error);
//           observer.complete();
//         });
//       });
//     });
//   }

//   signup(email: string, password: string): Observable<User> {
//     return new Observable<User>(observer => {
//       this.auth.createUserWithEmailAndPassword(email, password).then((firebaseUser: firebase.default.auth.UserCredential) => {
//         observer.next({ email, id: firebaseUser.user?.uid! });
//         observer.complete();
//       }).catch(error => {
//         observer.error(error);
//         observer.complete();
//       });
//     });
//   }

//   logout(): Observable<void> {
//     return new Observable<void>(observer => {
//       this.auth.signOut().then(() => {
//         observer.next();
//         observer.complete();
//       }).catch(error => {
//         observer.error(error);
//         observer.complete();
//       });
//     });
//   }
// }



import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private db: AngularFireDatabase) {}

  async register({ email, password }: User) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(det: User) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, det.email, det.password);
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getUserProfile(): Observable<any> { //firebase.User | null
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      });
    });
  }

  // getUserProfile(): Observable<any> {
  //   return new Observable((subscriber) => {
  //     onAuthStateChanged(this.auth, (user) => {
  //       if (user) {
  //         this.db.object(`users/profiles/${user.uid}`).valueChanges().subscribe(profile => {
  //           subscriber.next(profile);
  //         });
  //       } else {
  //         subscriber.next(null);
  //       }
  //     });
  //   });
  // }

  // async storeUserProfile(uid: string, profileData: any) {
  //   try {
  //     await this.db.object(`users/profiles/${uid}`).set(profileData);
  //   } catch (e) {
  //     console.error('Error storing profile data:', e);
  //   }
  // }

    // Method to fetch the user profile from the database
    getProfile(uid: string): Observable<any> {
      return this.db.object(`users/profiles/${uid}`).valueChanges();
    }
  
    // Method to update the user profile in the database
    updateProfile(uid: string, profile: any): Promise<void> {
      return this.db.object(`users/profiles/${uid}`).update(profile);
    }
}
