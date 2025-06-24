import { Injectable, WritableSignal, signal } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { doc, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

export interface Profile {
  createdOn: Timestamp;
  updatedOn: Timestamp;
  userId: string;
  email: string;
  givenName?: string;
  familyName?: string;
  address?: string;
  city: string;
  postalCode?: string;
  province?: string;
  country?: string;
  phone?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends FirestoreService {
  collectionName = 'profiles';

  profile_: WritableSignal<Profile | null> = signal(null);

  constructor() {
    super();
  }

  async createProfile(user: User, profile?: Partial<Profile>) {
    const userRef = doc(this.db, this.collectionName, user.uid);

    await this.set(userRef, {
      ...profile,
      createdOn: new Date(),
      updatedOn: new Date(),
      userId: user.uid,
      email: user.email,
    });
  }

  async updateProfile(user: User, profile: Partial<Profile>) {
    const userRef = doc(this.db, this.collectionName, user.uid);
    await this.update(this.collectionName, userRef.id, profile);
  }

  async getProfile(id: string): Promise<Profile> {
    return await this.readById<Profile>(
      this.collectionName,

      id
    );
  }
}
