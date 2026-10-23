import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookStack } from '../../services/book-stack';

@Component({
  selector: 'app-books',
  imports: [FormsModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  stack = inject(BookStack);

  form = { name: '', isbn: '', author: '', editorial: '' };

  add(): void {
    const { name, isbn, author, editorial } = this.form;
    if (!name || !isbn || !author || !editorial) return;
    this.stack.push({ ...this.form });
    this.form = { name: '', isbn: '', author: '', editorial: '' };
  }
}