import { Routes } from '@angular/router';
import { menuTree } from './data/menu';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    ...menuTree
        .toArray()
        .filter((item) => item.link !== '')
        .map((item) => ({ path: item.link, component: item.component })),
    { path: '**', redirectTo: 'inicio' },
];