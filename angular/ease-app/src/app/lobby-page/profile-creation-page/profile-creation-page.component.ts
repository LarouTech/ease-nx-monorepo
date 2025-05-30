import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  FirebaseAuthService,
  FirebaseStorageService,
  Profile,
  ProfileService,
} from '@ease-angular/services';
import {
  AvatarComponent,
  ButtonComponent,
  FormfieldComponent,
  LobbySubPageLayoutComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { simulateDelay } from '@ease/utils';

@Component({
  selector: 'profile-creation',
  templateUrl: './profile-creation-page.component.html',
  styleUrls: ['./profile-creation-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LobbySubPageLayoutComponent,
    FormfieldComponent,
    ButtonComponent,
    SvgIconComponent,
    AvatarComponent,
  ],
  providers: [],
})
export class ProfileCreationPageComponent implements OnInit {
  private firebaseAuth = inject(FirebaseAuthService);
  private firebaseStorage = inject(FirebaseStorageService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);

  isLoading = signal(false);
  profile_ = this.profileService.profile_;

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.initializeProfileForm();
  }

  async onUploadAvatar(base64Image: string) {
    const authUid = this.firebaseAuth.user()?.uid;
    const imageUrl = await this.firebaseStorage.uploadImage(
      base64Image,
      authUid
    );
    this.profileForm.patchValue({ imageUrl });
  }

  private initializeProfileForm() {
    const profile = this.profileService.profile_();
    this.profileForm = new FormGroup({
      givenName: new FormControl(profile?.givenName, Validators.required),
      familyName: new FormControl(profile?.familyName, Validators.required),
      address: new FormControl(profile?.address, Validators.required),
      city: new FormControl(profile?.city, Validators.required),
      province: new FormControl(profile?.province, Validators.required),
      postalCode: new FormControl(profile?.postalCode, Validators.required),
      country: new FormControl(profile?.country, Validators.required),
      phone: new FormControl(profile?.phone, [
        Validators.required,
        Validators.pattern(/^[\d\s\-+()]+$/),
      ]),
      imageUrl: new FormControl(profile?.imageUrl),
    });
  }

  private buildProfileFromForm(): Partial<Profile> {
    const fields: (keyof Profile)[] = [
      'givenName',
      'familyName',
      'address',
      'city',
      'province',
      'country',
      'postalCode',
      'phone',
      'imageUrl',
    ];

    return fields.reduce((acc, key) => {
      acc[key] = this.profileForm.get(key)?.value;
      return acc;
    }, {} as Partial<Profile>);
  }

  private showSnackbar(type: 'success' | 'error', message: string): void {
    this.snackbar.show({
      type,
      message,
      icon: 'thumb',
    });
  }

  async onSubmit(): Promise<void> {
    this.isLoading.set(true);

    try {
      const user = this.firebaseAuth.user();
      if (!user) {
        this.firebaseAuth.logout();
        this.showSnackbar('error', 'no user login. please signin');
        return;
      }

      const profile = this.buildProfileFromForm();

      await simulateDelay(2000);
      await this.profileService.updateProfile(user, profile);

      const updatedProfile = await this.profileService.getProfile(user.uid);
      this.profileService.profile_.set(updatedProfile);

      this.showSnackbar('success', 'Profile has been updated');
      this.router.navigate(['/']);
    } catch (error) {
      this.showSnackbar('error', (error as Error).message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSkip() {
    this.isLoading.set(true);
    await simulateDelay(500);
    this.isLoading.set(false);
    this.router.navigate(['/']);
  }
}
