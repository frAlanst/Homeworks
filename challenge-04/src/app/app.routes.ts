import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookForm } from './components/book-form/book-form';

export const routes: Routes = [
    { path: '', component: BookList },
    { path: 'nuevo', component: BookForm },
    { path: '**', redirectTo: '' },
];