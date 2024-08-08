// import { Injectable } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
// import { docData, Firestore, setDoc } from '@angular/fire/firestore';
// import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
// import { doc } from 'firebase/firestore';
// import { Photo } from '@capacitor/camera';

// @Injectable({
//   providedIn: 'root'
// })
// export class AvatarService {

//   constructor(
//     private auth: Auth,
//     private firestore: Firestore,
//     private storage: Storage
//   ) { }

//   getUserProfile() {
//     const user = this.auth.currentUser;
//     const userDocRef = doc(this.firestore, `users/${user?.uid}`);
//     return docData(userDocRef);
//   }

//   async uploadImage(cameraFile: Photo) {
//     const user = this.auth.currentUser;
//     const path = `uploads/${user!.uid}/profile.png`;
//     const storageRef = ref(this.storage, path);

//     try{
//       if(typeof cameraFile === 'string')
//       await uploadString(storageRef, cameraFile.base64String, 'base64');

//       const imageURL = await getDownloadURL(storageRef);
//       const userDocRef = doc(this.firestore, `users/${user!.uid}`);
//       await setDoc(userDocRef, {
//         imageURL
//       });
//       return true;
//     } catch(e){
//       return null;
//     }
//   }
// }
