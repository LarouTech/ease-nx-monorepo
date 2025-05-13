import { auth } from '@ease/utils';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  async signin() {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        'yanicklarouche@hotmail.com',
        'DarkSide777!'
      );

      console.log(response.user);
    } catch (error) {
      console.log(error);
    }
  }
}
