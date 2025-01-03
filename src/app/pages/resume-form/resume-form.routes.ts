import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { EducationComponent } from './education/education.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./resume-form.component').then((m) => m.ResumeFormComponent),
    children: [
      { path: 'about-me', component: AboutMeComponent },
      { path: 'education', component: EducationComponent },
      { path: '', redirectTo: 'about-me', pathMatch: 'full' },
    ],
  },
];
