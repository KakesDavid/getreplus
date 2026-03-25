'use client';

import { useFirebase } from '../provider';

/**
 * Hook to access the current Firebase user and auth state.
 */
export function useUser() {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
}
