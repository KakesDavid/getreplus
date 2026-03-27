import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

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

export function useDashboardData() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Listen to user document in Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const unsubscribeFirestore = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUser({
              uid: firebaseUser.uid,
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
          }
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching user data:', err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  return { user, loading, error };
}
