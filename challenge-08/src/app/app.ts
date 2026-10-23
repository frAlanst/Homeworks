import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
    @if (auth.isLoggedIn()) {
      <app-navbar />
    }
    <main [class.padded]="auth.isLoggedIn()">
      <router-outlet />
    </main>
  `,
  styles: `
    :host { font-family: sans-serif; display: block; }
    .padded { padding: 24px; }
  `,
})
export class App {
  auth = inject(AuthService);
}