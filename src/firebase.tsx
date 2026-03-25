import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDPdyp3-PgYld-ilw-QIOXIkTK_aeayWBs",
  authDomain: "studio-5917963819-d467a.firebaseapp.com",
  projectId: "studio-5917963819-d467a",
  storageBucket: "studio-5917963819-d467a.firebasestorage.app",
  messagingSenderId: "600681350449",
  appId: "1:600681350449:web:88677510c087d89064dc10"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Simple auth hook
export const useAuth = () => {
  return { user: null, loading: false };
};

// Simple firestore hook
export const useFirestore = () => {
  return { db };
};

// Simple provider
export const FirebaseClientProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export { app, db, auth };