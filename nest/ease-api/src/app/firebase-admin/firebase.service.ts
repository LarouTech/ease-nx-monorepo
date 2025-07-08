// src/firebase/firebase.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { Firestore } from 'firebase/firestore';
import * as easePk from '../../../ease-pk.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp!: admin.app.App;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      // Method 1: Direct environment variables (recommended)
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(easePk as admin.ServiceAccount),
      });

      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  }

  getFirestore() {
    return this.firebaseApp.firestore();
  }

  getAuth() {
    return this.firebaseApp.auth();
  }

  getStorage() {
    return this.firebaseApp.storage();
  }
}
