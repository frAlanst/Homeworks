import { Injectable, computed, signal } from '@angular/core';

export interface User {
    email: string;
    name: string;
}

const VALID_EMAIL = 'user@mail.com';
const VALID_PASSWORD = '123';
const STORAGE_KEY = 'demo-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly _user = signal<User | null>(this.restore());

    readonly user = this._user.asReadonly();
    readonly isLoggedIn = computed(() => this._user() !== null);
    readonly username = computed(() => this._user()?.name ?? '');

    login(email: string, password: string): boolean {
        if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
            const user: User = { email: VALID_EMAIL, name: 'user' };
            this._user.set(user);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return true;
        }
        return false;
    }

    logout(): void {
        this._user.set(null);
        sessionStorage.removeItem(STORAGE_KEY);
    }

    private restore(): User | null {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    }
}