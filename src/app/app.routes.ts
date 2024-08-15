import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dog-breeds',
    loadComponent: () =>
      import('./features/dog-breeds/dog-breeds.component').then(
        (m) => m.DogBreedsComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
