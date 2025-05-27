import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';
import { ProfileService } from '../profile/profile.service';

export const firebaseAuthGuard: CanActivateFn = async () => {
  const firebaseAuth = inject(FirebaseAuthService);
  const profileService = inject(ProfileService);
  const router = inject(Router);

  const user = await waitForDefined(() => firebaseAuth.user());

  if (!user) {
    router.navigate(['/']);
    return false;
  }

  let profile = await profileService.getProfile(user.uid);

  if (!profile) {
    console.warn('No profile found for user:', user.uid);
    await profileService.creatProfile(user, { test: 'test' });
    profile = await profileService.getProfile(user.uid);
    router.navigate(['/lobby/profile-creation']);
    return true;
  }

  profileService.profile_.set(profile);
  return true;
};

// Utility function to poll until a value is defined
function waitForDefined<T>(
  getter: () => T | undefined,
  interval = 100
): Promise<T> {
  return new Promise((resolve) => {
    const check = () => {
      const value = getter();
      if (value !== undefined) {
        resolve(value);
      } else {
        setTimeout(check, interval);
      }
    };
    check();
  });
}
