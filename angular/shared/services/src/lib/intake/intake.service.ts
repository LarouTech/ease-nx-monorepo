import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { Intake } from './intake.interfaces';
import { User } from 'firebase/auth';
import { Profile } from '../profile/profile.service';
import { IntakeDto } from '@ease/dto';

@Injectable({
  providedIn: 'root',
})
export class IntakeService extends FirestoreService {
  collectionName = 'intakes';

  async createIntake(dto: IntakeDto, profile: Profile | null) {
    if (!profile) {
      throw Error(
        'user need to be login and have a profile to create an intake'
      );
    }

    const { email, givenName, familyName } = profile;

    const intake: Intake = {
      ...dto,
      createdOn: new Date(),
      email,
      givenName,
      familyName,
      ownerId: profile.userId,
    };

    return await this.create(intake, this.collectionName);
  }

  async getIntakes(): Promise<Intake[]> {
    return await this.readAll<Intake[]>(this.collectionName);
  }

  async getIntake(id: string): Promise<Intake> {
    return await this.readById<Intake>(this.collectionName, id);
  }

  async getIntakesByOwner(id: string) {
    return await this.queryBy<Intake>('ownerId', id, this.collectionName);
  }
}
