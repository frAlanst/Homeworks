//firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4XJ_e2bIN7tleezP0A0m23cnQenSDsrE",
    authDomain: "parcial-2-8b56a.firebaseapp.com",
    projectId: "parcial-2-8b56a",
    storageBucket: "parcial-2-8b56a.firebasestorage.app",
    messagingSenderId: "648560699854",
    appId: "1:648560699854:web:b77404d632d2a79d67639f",
    measurementId: "G-4MNXPGS5XS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, analytics, auth, db };