import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";
import { createElement, ComponentType } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Graph } from "react-d3-graph";
import { Network } from "./model";

@Component({
  selector: "network-graph",
  template: '<div #canvas class="canvas"></div>',
})
export class GraphView implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) network!: Network;
  @Output() picked = new EventEmitter<string>();
  @ViewChild("canvas") canvas!: ElementRef<HTMLDivElement>;
  private observer?: ResizeObserver;
  private width = 0;

  ngAfterViewInit() {
    this.observer = new ResizeObserver(([entry]) => {
      const next = Math.floor(entry.contentRect.width);
      if (next !== this.width) {
        this.width = next;
        this.draw();
      }
    });
    this.observer.observe(this.canvas.nativeElement);
  }
  ngOnChanges() {
    if (this.width) this.draw();
  }
  private draw() {
    const { cities, people, friends } = this.network;
    const el = this.canvas.nativeElement;
    if (!cities.length) {
      unmountComponentAtNode(el);
      return;
    }
    const nodes = [
      ...cities.map((c) => ({
        id: c.id,
        label: c.name,
        color: "#c7622f",
        symbolType: "diamond",
        size: 520,
      })),
      ...people.map((p) => ({
        id: p.id,
        label: p.name,
        color: "#276b58",
        symbolType: "circle",
        size: 350,
      })),
    ];
    const links = [
      ...people.map((p) => ({
        source: p.id,
        target: p.cityId,
        color: "#bf805d",
        strokeDasharray: "5 4",
      })),
      ...friends.map((f) => ({ source: f.a, target: f.b, color: "#54746b" })),
    ];
    const config = {
      width: this.width,
      height: 380,
      automaticRearrangeAfterDropNode: true,
      d3: { gravity: -300, linkLength: 95 },
      node: { labelProperty: "label", fontSize: 13, fontColor: "#203a31" },
      link: { strokeWidth: 2 },
      panAndZoom: true,
    };
    render(
      createElement(Graph as ComponentType<any>, {
        id: "atlas",
        data: { nodes, links },
        config,
        onClickNode: (id: string) => this.picked.emit(id),
      }),
      el,
    );
  }
  ngOnDestroy() {
    this.observer?.disconnect();
    unmountComponentAtNode(this.canvas.nativeElement);
  }
}
