import { effect, EffectRef, inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';

export const firebaseAuthGuard: CanActivateFn = () => {
  const firebaseAuth = inject(FirebaseAuthService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    const effectRef: EffectRef = effect(() => {
      const user = firebaseAuth.user();

      // Wait until the auth state is known (not undefined)
      if (user !== undefined) {
        effectRef.destroy(); // ✅ Correctly destroy the effect

        if (user) {
          resolve(true);
        } else {
          router.navigate(['/']);
          resolve(false);
        }
      }
    });
  });
};
