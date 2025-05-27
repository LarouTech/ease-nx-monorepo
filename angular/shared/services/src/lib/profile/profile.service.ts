import { Injectable, WritableSignal, signal } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { doc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export interface Profile {
  [key: string]: any; // optionally replace with a more specific type if you know profile's structure
  createdOn: Date;
  updatedOn: Date;
  userId: string;
  email: string;
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

  async creatProfile(user: User, profile: Partial<Profile>) {
    const userRef = doc(this.db, this.collectionName, user.uid);

    await this.set(userRef, {
      ...profile,
      createdOn: new Date(),
      updatedOn: new Date(),
      userId: user.uid,
      email: user.email,
    });
  }

  async getProfile(id: string): Promise<Profile> {
    return (await this.readById(
      this.collectionName,

      id
    )) as Promise<Profile>;
  }
}
