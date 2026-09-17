import { Component, OnInit, signal } from '@angular/core';
import { Contact } from './models/contact.model';
import { LoaderComponent } from './components/loader.component';
import { ContactFormComponent } from './components/contact-form.component';
import { ContactListComponent } from './components/contact-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, ContactFormComponent, ContactListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isLoading = signal<boolean>(true);
  contacts = signal<Contact[]>([]);

  ngOnInit(): void {
    setTimeout(() => {
      this.contacts.set([
        { id: 1, name: 'Juan Pérez', phone: '3001234567' },
        { id: 2, name: 'Maria Gómez', phone: '3109876543' }
      ]);
      this.isLoading.set(false);
    }, 1500);
  }

  onAddContact(contactData: { name: string; phone: string }): void {
    const newContact: Contact = {
      id: Date.now(),
      name: contactData.name,
      phone: contactData.phone
    };
    this.contacts.update(list => [...list, newContact]);
  }

  onDeleteContact(id: number): void {
    this.contacts.update(list => list.filter(c => c.id !== id));
  }
}