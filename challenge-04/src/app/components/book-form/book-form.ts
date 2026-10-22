import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookStack } from '../../services/book-stack';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  private fb = inject(FormBuilder);
  private bookService = inject(BookStack);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    isbn: ['', [Validators.required, Validators.pattern(/^\d{10}(\d{3})?$/)]],
    author: ['', Validators.required],
    editorial: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.bookService.addBook(this.form.value as Book);
    this.router.navigate(['/']);
  }
}