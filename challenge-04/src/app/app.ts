import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main style="padding: 24px; font-family: sans-serif;">
      <h1>Biblioteca</h1>
      <router-outlet />
    </main>
  `,
})
export class App { }