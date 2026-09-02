import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentLinkedList, StudentNode } from './models/linked-list.model';
import { StudentListComponent } from './components/student-list/student-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, StudentListComponent],
  templateUrl: './app.html'
})
export class App {
  linkedList = new StudentLinkedList();
  studentArray: StudentNode[] = [];

  code: string = '';
  name: string = '';
  age: number | null = null;

  addStudent(): void {
    if (!this.code || !this.name || this.age === null) {
      alert('Por favor llena todos los campos');
      return;
    }

    this.linkedList.add(this.code, this.name, this.age);
    this.syncArray();

    this.code = '';
    this.name = '';
    this.age = null;
  }

  removeStudent(code: string): void {
    this.linkedList.remove(code);
    this.syncArray();
  }

  private syncArray(): void {
    this.studentArray = this.linkedList.toArray();
  }
}