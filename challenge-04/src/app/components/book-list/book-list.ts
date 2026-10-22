import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStack } from '../../services/book-stack';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  constructor(public bookService: BookStack) { }

  removeTop(): void {
    this.bookService.removeTop();
  }
}