
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Define the User type
export interface UserData {
  uid: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  tier: 'standard' | 'premium';
  isActive: boolean;
  earningWallet: number;
  mainWallet: number;
  referralCountCycle: number;
  totalReferrals: number;
  weeklyReferrals: number;
  spinAccessExpiry: Date | null;
  createdAt: Date;
  bankName: string;
  bankAccountNumber: string;
  bankAccountName: string;
  profilePictureUrl: string | null;
}

/**
 * Hook to fetch and subscribe to the current user's Firestore document in real-time.
 * Uses the centralized Firebase SDKs from @/firebase.
 */
export function useDashboardData() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const uid = auth.currentUser.uid;
    const userDocRef = doc(db, 'users', uid);

    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUser({
            uid: docSnapshot.id,
            fullName: data.fullName || '',
            username: data.username || '',
            email: data.email || '',
            phone: data.phone || '',
            tier: data.tier || 'standard',
            isActive: data.isActive || false,
            earningWallet: data.earningWallet || 0,
            mainWallet: data.mainWallet || 0,
            referralCountCycle: data.referralCountCycle || 0,
            totalReferrals: data.totalReferrals || 0,
            weeklyReferrals: data.weeklyReferrals || 0,
            spinAccessExpiry: data.spinAccessExpiry?.toDate() || null,
            createdAt: data.createdAt?.toDate() || new Date(),
            bankName: data.bankName || '',
            bankAccountNumber: data.bankAccountNumber || '',
            bankAccountName: data.bankAccountName || '',
            profilePictureUrl: data.profilePictureUrl || null,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      async (err) => {
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'get',
        });
        console.error('Error fetching user data:', err);
        setError(permissionError);
        setLoading(false);
        errorEmitter.emit('permission-error', permissionError);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser, db]);

  return { user, loading, error };
}
