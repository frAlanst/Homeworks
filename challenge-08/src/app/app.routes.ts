import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Books } from './pages/books/books';
import { Tree } from './pages/tree/tree';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'libros' },
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'libros', component: Books, canActivate: [authGuard] },
    { path: 'arbol', component: Tree, canActivate: [authGuard] },
    { path: '**', redirectTo: 'libros' },
];