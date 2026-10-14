import { Injectable, NgZone } from '@angular/core';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { auth } from '../../firebase/config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user$: Observable<User | null>;

    constructor(private zone: NgZone) {
        this.user$ = new Observable<User | null>(subscriber => {
            const unsubscribe = onAuthStateChanged(
                auth,
                user => this.zone.run(() => subscriber.next(user)),
                err => this.zone.run(() => subscriber.error(err))
            );
            return () => unsubscribe();
        });
    }

    async login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async register(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    async logout(): Promise<void> {
        await signOut(auth);
    }

    get currentEmail(): string | null {
        return auth.currentUser?.email ?? null;
    }
}