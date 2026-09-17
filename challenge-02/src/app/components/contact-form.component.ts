import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [FormsModule],
    template: `
    <form (ngSubmit)="onSubmit()" class="form-container">
      <div>
        <label for="name">Nombre:</label>
        <input id="name" type="text" [(ngModel)]="name" name="name" required />
      </div>
      <div>
        <label for="phone">Teléfono:</label>
        <input id="phone" type="text" [(ngModel)]="phone" name="phone" required />
      </div>
      <button type="submit">Agregar</button>
    </form>
  `,
    styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      max-width: 300px;
      margin-bottom: 1.5rem;
    }
    .form-container div {
      display: flex;
      flex-direction: column;
    }
    input {
      padding: 0.4rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 0.5rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ContactFormComponent {
    @Output() addContact = new EventEmitter<{ name: string; phone: string }>();

    name: string = '';
    phone: string = '';

    onSubmit() {
        if (this.name.trim() && this.phone.trim()) {
            this.addContact.emit({ name: this.name, phone: this.phone });
            this.name = '';
            this.phone = '';
        }
    }
}