import { Component } from '@angular/core';
import { MenuService } from '../../services/menu';
import { MenuNode } from '../menu-node/menu-node';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuNode],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(public menuService: MenuService) { }
}