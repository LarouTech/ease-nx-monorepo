import { InjectionToken } from '@angular/core';
import { FirebaseOptions } from 'firebase/app';

export const FIREBASE_CONFIG_TOKEN = new InjectionToken<FirebaseOptions>(
  'FIREBASE_CONFIG_TOKEN'
);
