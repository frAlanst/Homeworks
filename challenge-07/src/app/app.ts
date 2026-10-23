import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  template: `
    <div class="layout">
      <app-sidebar />
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .layout { display: flex; font-family: sans-serif; }
    main { flex: 1; padding: 24px; }
  `,
})
export class App { }