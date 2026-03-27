'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  writeBatch,
  getDocs,
  where
} from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';

/**
 * Hook to fetch and manage user notifications in real-time.
 */
export function useNotifications() {
  const auth = useAuth();
  const db = useFirestore();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const uid = auth.currentUser.uid;
    const notifsRef = collection(db, 'users', uid, 'notifications');
    const q = query(notifsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(items);
      setUnreadCount(items.filter(n => !n.isRead).length);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching notifications:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser, db]);

  const markAsRead = async (id) => {
    if (!auth.currentUser) return;
    const docRef = doc(db, 'users', auth.currentUser.uid, 'notifications', id);
    try {
      await updateDoc(docRef, { isRead: true });
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllRead = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    const batch = writeBatch(db);
    
    notifications.forEach(n => {
      if (!n.isRead) {
        const ref = doc(db, 'users', uid, 'notifications', n.id);
        batch.update(ref, { isRead: true });
      }
    });

    try {
      await batch.commit();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  return { notifications, unreadCount, loading, markAsRead, markAllRead };
}
