'use client';

/**
 * Redirects to the modular Firebase directory.
 * This satisfies imports from '@/firebase' when src/firebase.tsx takes precedence over the directory.
 */
export * from './firebase/index';
