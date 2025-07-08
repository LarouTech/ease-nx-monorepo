import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  signal,
  viewChild,
  type OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ColorPaletteService,
  FICTIONAL_INTAKEFORM,
  FirebaseAuthService,
  IntakeService,
  ProfileService,
} from '@ease-angular/services';
import { SnackbarService } from '@ease-angular/ui';
import { IntakeDto } from '@ease/dto';

export interface SideNavigationHelperProps {
  label: string;
  active: boolean;
  name: string;
}

@Component({
  selector: 'app-intake-form-side-controls',
  imports: [CommonModule],
  templateUrl: './intake-form-side-controls.component.html',
  styleUrl: './intake-form-side-controls.component.css',
})
export class IntakeFormSideControlsComponent implements OnInit {
  private colorService = inject(ColorPaletteService);
  private firebaseAuth = inject(FirebaseAuthService);
  private intakeService = inject(IntakeService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  private profileService = inject(ProfileService);

  isDarkMode = this.colorService.isDarkMode;

  private renderer = inject(Renderer2);
  controls = input.required<SideNavigationHelperProps[]>();
  intakeForm = input.required<FormGroup>();

  devMode = true;

  formNavigationRef =
    viewChild<ElementRef<HTMLDivElement>>('formNavigationRef');

  scrolledAwayFromTop = false;

  formSections = signal<SideNavigationHelperProps[]>([]); // start empty

  ngOnInit(): void {
    this.formSections.set(this.controls());
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const headerOffset = 130; // Adjust based on your sticky header height
    const buffer = 50; // Optional buffer for early activation

    // Animate the side nav in/out
    if (scrollY > 0 && !this.scrolledAwayFromTop) {
      this.scrolledAwayFromTop = true;
      this.renderer.setStyle(
        this.formNavigationRef()?.nativeElement,
        'transform',
        'translateY(-75px)'
      );
    } else if (scrollY === 0 && this.scrolledAwayFromTop) {
      this.scrolledAwayFromTop = false;
      this.renderer.setStyle(
        this.formNavigationRef()?.nativeElement,
        'transform',
        'translateY(0)'
      );
    }

    // Scroll spy: determine active section
    const sectionElements = this.formSections().map((_, index) =>
      document.getElementById(`section-${index}`)
    );

    let activeIndex = 0;

    for (let i = 0; i < sectionElements.length; i++) {
      const el = sectionElements[i];
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top - headerOffset < buffer) {
        activeIndex = i;
      }
    }

    // Update active section
    this.formSections.update((sections) =>
      sections.map((s, i) => ({ ...s, active: i === activeIndex }))
    );
  }

  onClickSectionMenuItem(section: SideNavigationHelperProps, id: string) {
    const el = document.getElementById(id);
    const headerOffset = 120; // Adjust to your sticky header height

    if (el) {
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  onSaveProgress() {
    const progress = this.intakeForm().getRawValue();
    console.log(progress);
  }

  onResetForm() {
    this.intakeForm().reset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async onCreateIntake() {
    try {
      const intake = this.devMode
        ? FICTIONAL_INTAKEFORM
        : (this.intakeForm().getRawValue() as Partial<IntakeDto>);

      const user = this.firebaseAuth.getCurrentUser();

      await this.intakeService.createIntake(
        intake,
        this.profileService.profile_()
      );

      this.snackbarService.show({
        type: 'success',
        message: 'Intake has been successfully created',
        icon: 'plus',
      });

      this.router.navigate(['/', 'lobby', 'intakes']);
    } catch (error) {
      console.error('Failed to create intake:', error);
    }
  }
}
