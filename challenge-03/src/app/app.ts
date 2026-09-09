import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SinglyLinkedList, DoublyLinkedList } from './linked-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Variables para inputs
  newTask: string = '';
  newSong: string = '';

  // Instancias de las Listas Enlazadas
  todoList = new SinglyLinkedList<string>();
  playlist = new DoublyLinkedList<string>();

  todoItems: string[] = [];
  playlistItems: string[] = [];
  currentSong: string | null = null;

  addTodo(): void {
    if (this.newTask.trim()) {
      this.todoList.add(this.newTask.trim());
      this.newTask = '';
      this.updateTodoUI();
    }
  }

  removeTodo(task: string): void {
    this.todoList.remove(task);
    this.updateTodoUI();
  }

  private updateTodoUI(): void {
    this.todoItems = this.todoList.toArray();
  }

  addSong(): void {
    if (this.newSong.trim()) {
      this.playlist.add(this.newSong.trim());
      this.newSong = '';
      this.updatePlaylistUI();
    }
  }

  playNext(): void {
    this.playlist.goNext();
    this.updatePlaylistUI();
  }

  playPrev(): void {
    this.playlist.goPrev();
    this.updatePlaylistUI();
  }

  private updatePlaylistUI(): void {
    this.playlistItems = this.playlist.toArray();
    this.currentSong = this.playlist.getCurrent();
  }
}