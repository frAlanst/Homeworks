import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

type Filter = 'all' | 'pending' | 'done';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  private fb = inject(NonNullableFormBuilder);
  service = inject(TaskService);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', Validators.maxLength(200)],
  });

  editingId = signal<string | null>(null);
  filter = signal<Filter>('all');
  error = signal('');
  saving = signal(false);

  visible = computed(() => {
    const tasks = this.service.tasks();
    switch (this.filter()) {
      case 'pending':
        return tasks.filter((t) => !t.done);
      case 'done':
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  });

  titleInvalid(): boolean {
    const control = this.form.controls.title;
    return control.invalid && (control.touched || control.dirty);
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    try {
      const { title, description } = this.form.getRawValue();
      const id = this.editingId();

      if (id) {
        await this.service.update(id, { title: title.trim(), description: description.trim() });
      } else {
        await this.service.add(title.trim(), description.trim());
      }
      this.cancel();
    } catch {
      this.error.set('No se pudo guardar la tarea. Intenta de nuevo.');
    } finally {
      this.saving.set(false);
    }
  }

  edit(task: Task): void {
    this.editingId.set(task.id);
    this.form.setValue({ title: task.title, description: task.description });
  }

  cancel(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  async toggle(task: Task): Promise<void> {
    try {
      await this.service.toggle(task);
    } catch {
      this.error.set('No se pudo actualizar la tarea.');
    }
  }

  async remove(task: Task): Promise<void> {
    if (!confirm(`¿Eliminar la tarea "${task.title}"?`)) return;

    try {
      await this.service.remove(task.id);
      if (this.editingId() === task.id) this.cancel();
    } catch {
      this.error.set('No se pudo eliminar la tarea.');
    }
  }
}