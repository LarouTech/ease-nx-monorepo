import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { computed, effect, Inject, Injectable, signal } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG_TOKEN } from './firebase-config.token';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  firebaseApp: FirebaseApp;
  auth: Auth;

  private _user = signal<User | null | undefined>(undefined); // undefined = loading

  user = computed(() => this._user());
  isLoading = computed(() => this._user() === undefined);
  isLoggedIn = computed(() => !!this._user());

  constructor(
    @Inject(FIREBASE_CONFIG_TOKEN) public firebaseOptions: FirebaseOptions
  ) {
    this.firebaseApp = initializeApp(this.firebaseOptions);
    this.auth = getAuth(this.firebaseApp);

    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      this._user.set(user);
    });

    // Optional side-effect for debugging
    effect(() => {
      console.log('User changed:', this._user());
    });
  }

  async signin(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async logout() {
    try {
      const response = await signOut(this.auth);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
