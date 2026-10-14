import { Injectable } from '@angular/core';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { auth, db } from '../../firebase/config';
import { TreeNode, NodeType } from '../models/tree-node';

@Injectable({ providedIn: 'root' })
export class TreeService {

    getNodes(): Observable<TreeNode[]> {
        const nodesRef = collection(db, 'nodes');

        return new Observable<TreeNode[]>(subscriber => {
            const unsubscribe = onSnapshot(
                nodesRef,
                snapshot => {
                    const flatNodes = snapshot.docs.map(d => ({
                        id: d.id,
                        ...d.data()
                    }));
                    subscriber.next(this.buildTree(flatNodes));
                },
                error => subscriber.error(error)
            );

            return () => unsubscribe();
        });
    }

    async createNode(name: string, type: NodeType, parentId: string | null): Promise<void> {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuario no autenticado');

        if (parentId) {
            const parentSnap = await getDoc(doc(db, 'nodes', parentId));
            if (parentSnap.exists() && parentSnap.data()['type'] === 'file') {
                throw new Error('Un archivo no puede contener hijos');
            }
        }

        const nodesRef = collection(db, 'nodes');
        await addDoc(nodesRef, {
            name,
            type,
            parentId: parentId ?? null,
            ownerEmail: user.email,
            createdAt: new Date(),
            children: []
        });
    }

    async deleteNode(id: string): Promise<void> {
        await deleteDoc(doc(db, 'nodes', id));
    }

    private buildTree(flatNodes: any[]): TreeNode[] {
        const map = new Map<string, TreeNode>();
        const roots: TreeNode[] = [];

        flatNodes.forEach(n => map.set(n.id, { ...n, children: [] }));

        map.forEach(node => {
            if (node.parentId && map.has(node.parentId)) {
                map.get(node.parentId)!.children.push(node);
            } else {
                roots.push(node);
            }
        });

        return roots;
    }
}