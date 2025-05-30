import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG_TOKEN } from './firebase-config.token';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseApp: FirebaseApp;
  private firestoreInstance: Firestore;
  private auth: Auth;
  private storage: FirebaseStorage;

  constructor(
    @Inject(FIREBASE_CONFIG_TOKEN) public firebaseOptions: FirebaseOptions
  ) {
    this.firebaseApp = initializeApp(this.firebaseOptions);
    this.firestoreInstance = getFirestore(this.firebaseApp);
    this.auth = getAuth(this.firebaseApp);
    this.storage = getStorage(this.firebaseApp);
  }

  getFirestoreInstance(): Firestore {
    return this.firestoreInstance;
  }

  getFirebaseAuthInstance(): Auth {
    return this.auth;
  }

  getFirebaseStorageInstance(): FirebaseStorage {
    return this.storage;
  }
}
