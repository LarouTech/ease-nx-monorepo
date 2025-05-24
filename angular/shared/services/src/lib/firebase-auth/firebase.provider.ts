import { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { FIREBASE_CONFIG_TOKEN } from './firebase-config.token';
import { Provider } from '@angular/core';

export const provideFirebase = (firebaseConfig: FirebaseOptions): Provider => {
  return {
    provide: FIREBASE_CONFIG_TOKEN,
    useValue: firebaseConfig,
  };
};
