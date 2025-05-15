import { effect, inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';

export const redirectIfLoginGuard: CanActivateFn = () => {
  const firebaseAuth = inject(FirebaseAuthService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    const watcher = effect(() => {
      const user = firebaseAuth.user();
      if (user !== undefined) {
        watcher.destroy();

        if (user) {
          router.navigate(['/lobby'], { replaceUrl: true }); // 👈 Redirect to main app
          resolve(false);
        } else {
          resolve(true); // Allow access to login
        }
      }
    });
  });
};
