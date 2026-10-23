import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as d3 from 'd3';
import { BinarySearchTree } from '../../models/binary-search-tree';
import { TreeNode } from '../../models/tree-node';

interface TreeData {
  value: number | null;
  children?: TreeData[];
}

@Component({
  selector: 'app-tree',
  imports: [FormsModule],
  templateUrl: './tree.html',
  styleUrl: './tree.css',
})
export class Tree implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  tree = new BinarySearchTree();
  seriesInput = '50, 30, 70, 20, 40, 60, 80, 35, 45, 65';
  searchInput: number | null = null;
  searchMessage = '';
  highlighted: number | null = null;

  ngAfterViewInit(): void {
    this.build();
  }

  build(): void {
    const numbers = this.seriesInput
      .split(/[\s,]+/)
      .filter((s) => s.trim() !== '')
      .map(Number)
      .filter((n) => !Number.isNaN(n));

    this.tree = new BinarySearchTree();
    numbers.forEach((n) => this.tree.insert(n));

    this.highlighted = null;
    this.searchMessage = '';

    console.log('Inorder:   ', this.tree.inorder().join(' - '));
    console.log('Preorder:  ', this.tree.preorder().join(' - '));
    console.log('Postorder: ', this.tree.postorder().join(' - '));

    this.render();
  }

  search(): void {
    if (this.searchInput === null || this.searchInput === undefined) return;
    const found = this.tree.contains(this.searchInput);
    this.highlighted = found ? this.searchInput : null;
    this.searchMessage = found
      ? `El valor ${this.searchInput} está en el árbol`
      : `El valor ${this.searchInput} NO está en el árbol`;
    this.render();
  }

  private toHierarchyData(node: TreeNode): TreeData {
    if (!node.left && !node.right) return { value: node.value };
    const left: TreeData = node.left ? this.toHierarchyData(node.left) : { value: null };
    const right: TreeData = node.right ? this.toHierarchyData(node.right) : { value: null };
    return { value: node.value, children: [left, right] };
  }

  private render(): void {
    const host = this.container.nativeElement;
    d3.select(host).selectAll('*').remove();
    if (!this.tree.root) return;

    const margin = { top: 40, right: 30, bottom: 40, left: 30 };
    const root = d3.hierarchy<TreeData>(this.toHierarchyData(this.tree.root));
    const width = Math.max(600, Math.pow(2, root.height) * 40);
    const height = root.height * 80 + margin.top + margin.bottom;

    const pointRoot = d3
      .tree<TreeData>()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])(root);

    const g = d3
      .select(host)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const link = d3
      .linkVertical<d3.HierarchyPointLink<TreeData>, d3.HierarchyPointNode<TreeData>>()
      .x((d) => d.x)
      .y((d) => d.y);

    g.selectAll('path')
      .data(pointRoot.links().filter((l) => l.target.data.value !== null))
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', '#888')
      .attr('stroke-width', 2)
      .attr('d', link);

    const nodes = g
      .selectAll('g.node')
      .data(pointRoot.descendants().filter((d) => d.data.value !== null))
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x},${d.y})`);

    nodes
      .append('circle')
      .attr('r', 18)
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('fill', (d) => (d.data.value === this.highlighted ? '#ffd166' : '#ffffff'));

    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', 13)
      .text((d) => d.data.value as number);
  }
}