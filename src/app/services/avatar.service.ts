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



import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDownloadURL, ref, uploadString, deleteObject } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private db: AngularFireDatabase,
    private storage: Storage
  ) { }

  // Method to fetch user profile including the image URL
  getUserProfile() {
    const user = this.auth.currentUser;
    const userProfilePath = `users/profiles/${user?.uid}`;
    return this.db.object(userProfilePath).valueChanges();
  }

  // Method to upload an image and store its URL in the Realtime Database
  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      if (cameraFile.base64String) {
        // Upload the image to Firebase Storage
        await uploadString(storageRef, cameraFile.base64String, 'base64');
      } else {
        throw new Error('No base64 string in camera file');
      }

      // Get the download URL of the uploaded image
      const imageURL = await getDownloadURL(storageRef);

      // Update the user's profile in the Realtime Database
      const userProfilePath = `users/profiles/${user.uid}`;
      await this.db.object(userProfilePath).update({ imageURL });

      return imageURL;
    } catch (e) {
      console.error('Error uploading image: ', e);
      return null;
    }
  }  

  // Method to delete the profile image
  async deleteImage() {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      // Delete the image from Firebase Storage
      await deleteObject(storageRef);

      // Remove the image URL from the user's profile in the Realtime Database
      const userProfilePath = `users/profiles/${user.uid}`;
      await this.db.object(userProfilePath).update({ imageURL: null });

      return true;
    } catch (e) {
      console.error('Error deleting image: ', e);
      return false;
    }
  }
}
