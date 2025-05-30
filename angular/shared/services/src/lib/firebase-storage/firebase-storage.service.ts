import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import {
  getDownloadURL,
  ref,
  uploadString,
  StorageReference,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  private firebase = inject(FirebaseService);
  storage = this.firebase.getFirebaseStorageInstance();

  async uploadImage(
    base64Image: string,
    authUid: string | undefined
  ): Promise<string> {
    if (!authUid) {
      throw console.error();
    }

    try {
      // Remove the data URL prefix if it exists
      const base64 = base64Image.split(',')[1];

      // Define a storage path and reference
      const filePath = `profiles-images/${authUid}/${Date.now()}.jpg`;
      const storageRef: StorageReference = ref(this.storage, filePath);

      // Upload the base64 image string
      await uploadString(storageRef, base64, 'base64');

      // Get the downloadable URL
      const downloadURL = await getDownloadURL(storageRef);

      console.log('Image uploaded. Download URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}
