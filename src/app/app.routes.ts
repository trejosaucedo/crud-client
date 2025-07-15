import { Routes } from '@angular/router';
import { GuestLayout } from './layouts/guest-layout';
import { AuthLayout } from './layouts/auth-layout';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: GuestLayout,
    children: [
      { path: '', loadComponent: () => import('./pages/landing/landing').then(m => m.Landing) },
      { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
      { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register) },
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout').then(m => m.AuthLayout),
    canActivate: [AuthGuard],
    children: [
      { path: 'personas/crear',  loadComponent: () => import('./pages/personas/personas-store/personas-store').then(m => m.PersonasStore) },
      { path: 'personas',        loadComponent: () => import('./pages/personas/personas-index/personas-index').then(m => m.PersonasIndex) },
      { path: 'dashboard/graphs', loadComponent: () => import('./pages/personas/graphs/graphs').then(m => m.Graphs) },
      { path: 'dashboard/auditorias', loadComponent: () => import('./pages/personas/auditorias/auditorias').then(m => m.Auditorias) },
      { path: 'dashboard', redirectTo: 'dashboard/graphs', pathMatch: 'full' },
    ],
  },
  // Fallback para rutas no encontradas (opcional)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
