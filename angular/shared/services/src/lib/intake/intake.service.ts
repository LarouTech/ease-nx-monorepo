import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { Intake } from './intake.interfaces';
import { User } from 'firebase/auth';
import { Profile } from '../profile/profile.service';
import { IntakeDto } from '@ease/dto';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class IntakeService extends FirestoreService {
  collectionName = 'intakes';

  async createIntake(dto: Partial<IntakeDto>, profile: Profile | null) {
    if (!profile) {
      throw Error(
        'user need to be login and have a profile to create an intake'
      );
    }

    const { email, givenName, familyName } = profile;

    const intake: Partial<IntakeDto> = {
      ...dto,
      createdOn: new Timestamp(Date.now() / 1000, 0),
      email,
      givenName,
      familyName,
      ownerId: profile.userId,
    };

    return await this.create(intake, this.collectionName);
  }

  async getIntakes(): Promise<IntakeDto[]> {
    return await this.readAll<IntakeDto[]>(this.collectionName);
  }

  async getIntake(id: string): Promise<IntakeDto> {
    return await this.readById<IntakeDto>(this.collectionName, id);
  }

  async getIntakesByOwner(id: string) {
    return await this.queryBy<IntakeDto>('ownerId', id, this.collectionName);
  }
}
