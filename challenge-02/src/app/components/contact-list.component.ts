import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="list-container">
      <h3>Lista de Contactos</h3>
      @if (contacts.length === 0) {
        <p>No hay contactos en la lista.</p>
      } @else {
        <ul>
          @for (contact of contacts; track contact.id) {
            <li>
              <span><strong>{{ contact.name }}</strong> - {{ contact.phone }}</span>
              <button (click)="onDelete(contact.id)">Eliminar</button>
            </li>
          }
        </ul>
      }
    </div>
  `,
    styles: [`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      max-width: 400px;
    }
    button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ContactListComponent {
    @Input() contacts: Contact[] = [];
    @Output() deleteContact = new EventEmitter<number>();

    onDelete(id: number) {
        this.deleteContact.emit(id);
    }
}