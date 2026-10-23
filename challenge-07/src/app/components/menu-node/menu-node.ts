import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NaryNode } from '../../models/nary-tree';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-node',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MenuNode],
  templateUrl: './menu-node.html',
  styleUrl: './menu-node.css',
})
export class MenuNode {
  @Input({ required: true }) node!: NaryNode<MenuItem>;
  open = false;

  toggle(): void {
    this.open = !this.open;
  }
}