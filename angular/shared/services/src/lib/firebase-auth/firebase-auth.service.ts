import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private firebase = inject(FirebaseService);
  private profileService = inject(ProfileService);
  auth: Auth = this.firebase.getFirebaseAuthInstance();

  private _user = signal<User | null | undefined>(undefined); // undefined = loading

  user = computed(() => this._user());
  isLoading = computed(() => this._user() === undefined);
  isLoggedIn = computed(() => !!this._user());

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this._user.set(user);
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
      this.profileService.profile_.set(null);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
