import { RequestorInformationFormComponent } from './requestor-information-form/requestor-information-form.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  signal,
  viewChild,
  WritableSignal,
  type OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  LobbySubPageLayoutComponent,
  SvgIconComponent,
} from '@ease-angular/ui';
import { BusinessContextComponent } from './business-context/business-context.component';
import { ProjectDetailsFormComponent } from './project-details-form/project-details-form.component';
import { TechnicalConsiderationsFormComponent } from './technical-considerations-form/technical-considerations-form.component';
import { DataAndSecurityFormComponent } from './data-and-security-form/data-and-security-form.component';
import { FinancialAndProcurementFormComponent } from './financial-and-procurement-form/financial-and-procurement-form.component';

export interface SideNavigationHelperProps {
  label: string;
  active: boolean;
  name: string;
}

@Component({
  selector: 'app-intakes-create',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    ReactiveFormsModule,
    RequestorInformationFormComponent,
    BusinessContextComponent,
    ProjectDetailsFormComponent,
    TechnicalConsiderationsFormComponent,
    DataAndSecurityFormComponent,
    FinancialAndProcurementFormComponent,
  ],
  templateUrl: './intakes-create.component.html',
  styleUrl: './intakes-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesCreateComponent implements OnInit {
  private renderer = inject(Renderer2);

  formNavigationRef =
    viewChild<ElementRef<HTMLDivElement>>('formNavigationRef');

  intakeForm!: FormGroup;

  formSections: WritableSignal<SideNavigationHelperProps[]> = signal([
    {
      label: 'Requestor Information',
      name: 'requestorInformation',
      active: true,
    },
    { label: 'Business Context', name: 'businessContext', active: false },
    { label: 'Project Details', name: 'projectDetails', active: false },
    {
      label: 'Technical Considerations',
      name: 'technicalConsiderations',
      active: false,
    },
    { label: 'Data and Security', name: 'dataAndSecurity', active: false },
    {
      label: 'Financial and Procurement',
      name: 'financialAndProcurement',
      active: false,
    },
    {
      label: 'Timeline and Delivery',
      name: 'timelineAndDelivery',
      active: false,
    },
    {
      label: 'Dependencies and Approvals',
      name: 'dependenciesAndApprovals',
      active: false,
    },
    {
      label: 'Additional Information',
      name: 'additionalInformation',
      active: false,
    },
  ]);

  scrolledAwayFromTop = false;

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

  ngOnInit() {
    this.intakeForm = new FormGroup({});
  }

  onFormUpdate(formGroup: FormGroup, formName: string) {
    this.intakeForm.addControl(formName, formGroup);
    console.log(this.intakeForm);
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

    // Update active section
    // this.formSections().map((s) => {
    //   s.active = s.label === section.label;
    //   return s;
    // });
  }

  onSaveProgress() {
    const progress = this.intakeForm.getRawValue();
    console.log(progress);
  }

  onResetForm() {
    this.intakeForm.reset();
  }

  onSubmit() {
    if (this.intakeForm.valid) {
      console.log('Form Submitted:', this.intakeForm.value);
      // Add your submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
