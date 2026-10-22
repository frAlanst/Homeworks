import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Stack } from '../models/stack';

@Injectable({ providedIn: 'root' })
export class BookStack {
    private stack = new Stack<Book>();

    constructor() {
        this.loadMockData();
    }

    private loadMockData(): void {
        const mock: Book[] = [
            { name: 'Cien años de soledad', isbn: '9780307474728', author: 'Gabriel García Márquez', editorial: 'Vintage Español' },
            { name: 'El amor en los tiempos del cólera', isbn: '9780307389732', author: 'Gabriel García Márquez', editorial: 'Vintage Español' },
            { name: 'Rayuela', isbn: '9788437604572', author: 'Julio Cortázar', editorial: 'Cátedra' },
            { name: 'La vorágine', isbn: '9789587046014', author: 'José Eustasio Rivera', editorial: 'Panamericana' },
            { name: 'Don Quijote de la Mancha', isbn: '9788420412146', author: 'Miguel de Cervantes', editorial: 'Alfaguara' },
        ];
        mock.forEach((b) => this.stack.push(b));
    }

    addBook(book: Book): void {
        this.stack.push(book);
    }

    removeTop(): Book | undefined {
        return this.stack.pop();
    }

    getTop(): Book | undefined {
        return this.stack.peek();
    }

    getBooks(): Book[] {
        return this.stack.toArray();
    }

    size(): number {
        return this.stack.size();
    }
}