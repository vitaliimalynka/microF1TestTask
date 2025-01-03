import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormDataService } from 'app/services/form-data.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume-form',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
  ],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.scss',
  providers: [FormDataService]
})
export class ResumeFormComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  public currentStep: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formDataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.route.firstChild?.url.subscribe(url => {
      if (url.length > 0) {
        this.currentStep = url[0].path === 'education' ? 1 : 0;
      }
    });
  }

  public isValidForm(name: string): boolean {
    return !!this.formDataService.getForm().get(name)?.valid;
  }

  public isCurrentStepValid(): boolean {
    if (this.currentStep === 0) {
      return this.isValidForm('aboutMe');
    } else if (this.currentStep === 1) {
      return this.isValidForm('education');
    }
    return false;
  }

  public goToPreviousStep(): void {
    this.currentStep--;
    this.navigateToStep();
  }

  public goToNextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
      this.navigateToStep();
    }
  }

  public navigateToStep(): void {
    const path = this.currentStep === 0 ? 'about-me' : 'education';
    this.router.navigate([path], { relativeTo: this.route });
    this.stepper.selectedIndex = this.currentStep
  }
}