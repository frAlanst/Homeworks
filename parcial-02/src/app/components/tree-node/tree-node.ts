import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../../models/tree-node';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.css'
})
export class TreeNodeComponent {
  @Input() node!: TreeNode;
  @Input() level = 0;
  @Output() addChild = new EventEmitter<{ parentId: string; type: 'folder' | 'file' }>();
  @Output() deleteNode = new EventEmitter<string>();

  expanded = true;

  toggle(): void {
    if (this.node.type === 'folder') this.expanded = !this.expanded;
  }

  onAdd(type: 'folder' | 'file'): void {
    if (this.node.type === 'folder') {
      this.addChild.emit({ parentId: this.node.id, type });
    }
  }

  onDelete(): void {
    this.deleteNode.emit(this.node.id);
  }
}