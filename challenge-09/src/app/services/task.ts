import { Injectable, computed, inject } from '@angular/core';
import { useFirestoreTasks } from '../hooks/use-firestore-tasks';
import { Task } from '../models/task';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private auth = inject(AuthService);
    private uid = computed(() => this.auth.user()?.uid ?? null);
    private firestore = useFirestoreTasks(this.uid);

    readonly tasks = this.firestore.tasks;
    readonly loading = this.firestore.loading;
    readonly pending = computed(() => this.tasks().filter((t) => !t.done).length);
    readonly completed = computed(() => this.tasks().filter((t) => t.done).length);

    async add(title: string, description: string): Promise<void> {
        const userId = this.uid();
        if (!userId) throw new Error('No hay sesión activa');
        await this.firestore.add({ title, description, userId });
    }

    update(id: string, changes: Pick<Task, 'title' | 'description'>): Promise<void> {
        return this.firestore.update(id, changes);
    }

    toggle(task: Task): Promise<void> {
        return this.firestore.setDone(task.id, !task.done);
    }

    remove(id: string): Promise<void> {
        return this.firestore.remove(id);
    }
}