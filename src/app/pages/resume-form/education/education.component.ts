import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormDataService } from 'app/services/form-data.service';

@Component({
  selector: 'app-education',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  public form!: FormGroup;

  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.form = this.formDataService.getForm();
  }

  public addEducationBlock() {

  }
}
