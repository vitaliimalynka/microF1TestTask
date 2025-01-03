import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'resume-form',
    loadChildren: () =>
      import('./pages/resume-form/resume-form.routes').then((m) => m.routes),
  },
  { path: '**', redirectTo: 'home' },
];
