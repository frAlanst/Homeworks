import { Injectable, computed } from '@angular/core';
import { useFirebaseAuth } from '../hooks/use-firebase-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private firebase = useFirebaseAuth();

    readonly user = this.firebase.user;
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly username = computed(() => this.user()?.name || this.user()?.email || '');

    register(name: string, email: string, password: string): Promise<void> {
        return this.firebase.register(name, email, password);
    }

    login(email: string, password: string): Promise<void> {
        return this.firebase.login(email, password);
    }

    logout(): Promise<void> {
        return this.firebase.logout();
    }

    whenReady(): Promise<void> {
        return this.firebase.whenReady();
    }
}