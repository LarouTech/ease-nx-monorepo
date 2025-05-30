import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  type OnInit,
} from '@angular/core';
import { Profile } from '@ease-angular/services';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'avatar',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  profile = input.required<Profile | null>();
  size = input<string>('45px');
  editOnClick = input<boolean>(false);

  imageUploadEvent = output<string>();
  imageUrl = signal<string | null | undefined>(null);

  fontSize = computed(() => {
    const unit = this.size().replace(/\d+/g, '');
    return `${parseInt(this.size()) / 2.3}${unit}`;
  });

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  constructor() {
    effect(() => {
      if (this.profile()?.imageUrl) {
        this.imageUrl.set(this.profile()?.imageUrl);
      }
    });
  }

  onAvatarUploadClick(): void {
    if (!this.editOnClick()) return;
    this.fileInput()?.nativeElement.click();
  }

  onAvatarFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      // Handle upload logic here, e.g., call an API or read as data URL
      this.uploadAvatar(file);
    }
  }

  uploadAvatar(file: File): void {
    // Example: Convert to base64 or send to a backend service
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      this.imageUploadEvent.emit(base64Image);
      this.imageUrl.set(base64Image);
    };
    reader.readAsDataURL(file);
  }
}
