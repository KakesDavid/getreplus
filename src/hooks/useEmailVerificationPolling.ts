'use client';
import { useEffect, useState, useCallback } from 'react';
import { User, reload } from 'firebase/auth';

/**
 * Hook to poll Firebase Auth for email verification status.
 */
export function useEmailVerificationPolling(user: User | null, onVerified: () => void) {
  const [isPolling, setIsPolling] = useState(true);

  const checkStatus = useCallback(async () => {
    if (!user) return;
    try {
      await reload(user);
      if (user.emailVerified) {
        setIsPolling(false);
        onVerified();
      }
    } catch (error) {
      console.error('Error reloading user:', error);
    }
  }, [user, onVerified]);

  useEffect(() => {
    if (!user || user.emailVerified) {
      setIsPolling(false);
      return;
    }

    const intervalId = setInterval(checkStatus, 4000);
    
    // Stop polling after 10 minutes
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsPolling(false);
    }, 600000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [user, checkStatus]);

  return { isPolling };
}
