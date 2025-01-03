import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { phoneValidator } from './validators';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private form: FormGroup;
  public phonePrefix = '+38';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      aboutMe: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, phoneValidator()]],
      }),
      education: this.fb.array([]),
    });
  }

  public getForm(): FormGroup {
    return this.form;
  }

  public getAboutMeForm(): FormGroup {
    return this.form.get('aboutMe') as FormGroup;
  }

  public getEducationArray(): FormArray {
    return this.form.get('education') as FormArray;
  }

  public addEducationBlock(): void {
    const educationBlock = this.fb.group({
      institution: ['', Validators.required],
      years: ['', Validators.required],
    });
    this.getEducationArray().push(educationBlock);
  }

  public removeEducationBlock(index: number): void {
    this.getEducationArray().removeAt(index);
  }

  public getPhonePrefix(): string {
    return this.phonePrefix
  }
}