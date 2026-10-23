import { signal } from '@angular/core';
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { AppUser } from '../models/user';

const messages: Record<string, string> = {
    'auth/invalid-credential': 'Correo o contraseña incorrectos',
    'auth/user-not-found': 'Correo o contraseña incorrectos',
    'auth/wrong-password': 'Correo o contraseña incorrectos',
    'auth/email-already-in-use': 'Ese correo ya está registrado',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/invalid-email': 'El correo no es válido',
    'auth/too-many-requests': 'Demasiados intentos, espera un momento',
    'auth/network-request-failed': 'Sin conexión con el servidor',
};

export function authErrorMessage(error: unknown): string {
    const code = (error as { code?: string })?.code ?? '';
    return messages[code] ?? 'Ocurrió un error inesperado, intenta de nuevo';
}

function toAppUser(user: User | null): AppUser | null {
    return user
        ? { uid: user.uid, email: user.email ?? '', name: user.displayName ?? '' }
        : null;
}

export function useFirebaseAuth() {
    const user = signal<AppUser | null>(null);

    onAuthStateChanged(auth, (firebaseUser) => user.set(toAppUser(firebaseUser)));

    async function register(name: string, email: string, password: string): Promise<void> {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        user.set(toAppUser(auth.currentUser));
    }

    async function login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password);
    }

    function logout(): Promise<void> {
        return signOut(auth);
    }

    function whenReady(): Promise<void> {
        return auth.authStateReady();
    }

    return { user: user.asReadonly(), register, login, logout, whenReady };
}