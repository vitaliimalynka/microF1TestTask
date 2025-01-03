import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from 'app/services/form-data.service';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-about-me',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxMaskDirective,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  providers: [provideNgxMask()],
})
export class AboutMeComponent {
  aboutMeForm!: FormGroup;
  phonePrefix!: string;
  @ViewChild('phoneInput') phoneInput!: ElementRef;

  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.aboutMeForm = this.formDataService.getAboutMeForm();
    this.phonePrefix = this.formDataService.getPhonePrefix();
  }

  ngAfterViewInit() {
    fromEvent(this.phoneInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged(),
        map(value => value.replace(/\D/g, '')),
      )
      .subscribe(cleanedValue => {
        this.aboutMeForm.get('phone')?.setValue(cleanedValue, { emitEvent: false });
      });
  }
}