import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TreeService } from '../../services/tree';
import { AuthService } from '../../services/auth';
import { TreeNode } from '../../models/tree-node';
import { TreeNodeComponent } from '../tree-node/tree-node';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeNodeComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  nodes$!: Observable<TreeNode[]>;
  userEmail$!: Observable<string | null>;
  newName = '';
  errorMessage = '';

  constructor(
    private treeService: TreeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nodes$ = this.treeService.getNodes();
    this.userEmail$ = this.authService.user$.pipe(map(u => u?.email ?? null));
  }

  async createRoot(type: 'folder' | 'file'): Promise<void> {
    if (!this.newName.trim()) return;
    try {
      await this.treeService.createNode(this.newName.trim(), type, null);
      this.newName = '';
      this.errorMessage = '';
    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  async handleAddChild(event: { parentId: string; type: 'folder' | 'file' }): Promise<void> {
    const name = prompt('Nombre del nuevo elemento:');
    if (!name?.trim()) return;
    try {
      await this.treeService.createNode(name.trim(), event.type, event.parentId);
      this.errorMessage = '';
    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  async handleDelete(id: string): Promise<void> {
    if (!confirm('¿Eliminar este elemento?')) return;
    try {
      await this.treeService.deleteNode(id);
    } catch (e: any) {
      this.errorMessage = e.message;
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}