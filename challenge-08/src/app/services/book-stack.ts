import { Injectable, computed, signal } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookStack {
    private readonly items = signal<Book[]>([
        { name: 'Cien años de soledad', isbn: '9780307474728', author: 'Gabriel García Márquez', editorial: 'Vintage Español' },
        { name: 'Rayuela', isbn: '9788437604572', author: 'Julio Cortázar', editorial: 'Cátedra' },
        { name: 'La vorágine', isbn: '9789587046014', author: 'José Eustasio Rivera', editorial: 'Panamericana' },
    ]);

    readonly books = computed(() => [...this.items()].reverse());
    readonly size = computed(() => this.items().length);

    push(book: Book): void {
        this.items.update((list) => [...list, book]);
    }

    pop(): Book | undefined {
        const top = this.items().at(-1);
        this.items.update((list) => list.slice(0, -1));
        return top;
    }
}