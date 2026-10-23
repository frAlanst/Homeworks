import { Injectable } from '@angular/core';
import { menuTree } from '../data/menu';
import { NaryNode } from '../models/nary-tree';
import { MenuItem } from '../models/menu-item';

@Injectable({ providedIn: 'root' })
export class MenuService {
    getRoot(): NaryNode<MenuItem> {
        return menuTree.root;
    }
}

