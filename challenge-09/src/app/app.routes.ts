import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Tasks } from './pages/tasks/tasks';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'tareas' },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'registro', component: Register, canActivate: [guestGuard] },
    { path: 'tareas', component: Tasks, canActivate: [authGuard] },
    { path: '**', redirectTo: 'tareas' },
];