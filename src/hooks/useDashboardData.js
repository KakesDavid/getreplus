'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';

/**
 * Hook to fetch and subscribe to the current user's Firestore document in real-time.
 */
export function useDashboardData() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const uid = auth.currentUser.uid;
    const docRef = doc(db, 'users', uid);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUser({ ...docSnap.data(), uid: docSnap.id });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching dashboard data:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser, db]);

  return { user, loading, error };
}
