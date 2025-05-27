import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonComponent,
  FormfieldComponent,
  LobbySubPageLayoutComponent,
} from '@ease-angular/ui';

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
  ],
  providers: [],
})
export class ProfileCreationPageComponent implements OnInit {
  profileForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      givenName: new FormControl('', Validators.required),
      familyName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\d\s\-+()]+$/),
      ]),
      imageUrl: new FormControl(''),
    });
  }

  get imageUrl() {
    return this.profileForm.get('imageUrl')?.value;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
