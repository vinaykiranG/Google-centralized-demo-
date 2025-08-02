import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.js';
import { DashboardComponent } from './dashboard/dashboard.js';
import { DemoDetailComponent } from './demo-detail/demo-detail.js';
import { authGuard } from './services/auth-guard.js';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'demo/:id', component: DemoDetailComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
