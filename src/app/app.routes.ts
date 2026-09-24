import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domains/vitrine/presentation/routes').then((m) => m.routes),
  },
];
