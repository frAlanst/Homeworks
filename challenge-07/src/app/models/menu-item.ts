import { Type } from '@angular/core';

export interface MenuItem {
    title: string;
    link: string;
    component: Type<unknown>;
}