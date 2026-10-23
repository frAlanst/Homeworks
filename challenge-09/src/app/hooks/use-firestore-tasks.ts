import { Signal, effect, signal } from '@angular/core';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Task } from '../models/task';

const COLLECTION = 'tasks';

export function useFirestoreTasks(uid: Signal<string | null>) {
    const tasks = signal<Task[]>([]);
    const loading = signal(true);

    effect((onCleanup) => {
        const userId = uid();

        if (!userId) {
            tasks.set([]);
            loading.set(false);
            return;
        }

        loading.set(true);
        const q = query(collection(db, COLLECTION), where('userId', '==', userId));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Task);
                list.sort((a, b) => b.createdAt - a.createdAt);
                tasks.set(list);
                loading.set(false);
            },
            () => loading.set(false)
        );

        onCleanup(unsubscribe);
    });

    function add(data: { title: string; description: string; userId: string }) {
        return addDoc(collection(db, COLLECTION), {
            ...data,
            done: false,
            createdAt: Date.now(),
        });
    }

    function update(id: string, changes: Partial<Pick<Task, 'title' | 'description'>>) {
        return updateDoc(doc(db, COLLECTION, id), changes);
    }

    function setDone(id: string, done: boolean) {
        return updateDoc(doc(db, COLLECTION, id), { done });
    }

    function remove(id: string) {
        return deleteDoc(doc(db, COLLECTION, id));
    }

    return {
        tasks: tasks.asReadonly(),
        loading: loading.asReadonly(),
        add,
        update,
        setDone,
        remove,
    };
}