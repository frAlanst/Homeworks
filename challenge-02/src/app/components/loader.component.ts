import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    standalone: true,
    template: `
    <div class="loader-container">
      <div class="spinner"></div>
      <p>Cargando contactos...</p>
    </div>
  `,
    styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 2rem 0;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent { }