import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StudentNode } from '../../models/linked-list.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.html'
})
export class StudentListComponent {
  @Input() students: StudentNode[] = [];
  @Output() deleteStudent = new EventEmitter<string>();

  onDelete(code: string): void {
    this.deleteStudent.emit(code);
  }
}