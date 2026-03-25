'use client';

/**
 * Maps Firebase Auth error codes and custom application error strings 
 * to user-friendly display messages.
 */
const ERROR_MAP: Record<string, string> = {
  // Firebase Auth Error Codes
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password is too weak. Use at least 8 characters with uppercase, lowercase, and numbers.',
  'auth/user-not-found': 'Invalid email or password. Please try again.',
  'auth/wrong-password': 'Invalid email or password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection and try again.',

  // Custom Application Error Keys
  'email_not_verified': 'Please verify your email before signing in. Check your inbox.',
  'invalid_credentials': 'Invalid email or password. Please try again.',
  'too_many_attempts': 'Too many failed attempts. Please try again later.',
  'username_taken': 'This username is already taken. Please choose another.',
  'email_taken': 'This email is already registered.',
  'invalid_referral': 'Invalid or inactive referral code. Please check the code and try again.',
  'invalid_referral_format': 'Referral code must be in format GETR-XXXXXXXX (8 alphanumeric characters).',
  'weak_password': 'Password is too weak. Use at least 8 characters with uppercase, lowercase, and numbers.',
  'invalid_email': 'Please enter a valid email address.',
  'network_error': 'Network error. Please check your connection and try again.',
  'timeout': 'Request timed out. Please try again.',
  'login_failed': 'Login failed. Please try again.',
  'cannot_delete_verified_user': 'Cannot delete a verified account. Contact support for assistance.',
};

/**
 * Returns a user-friendly error message based on a Firebase error object or a custom error string.
 * @param error - The error object from Firebase or a custom string identifier.
 * @returns A clear, descriptive string for UI display.
 */
export function getFirebaseErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  // If it's a string, look it up directly
  if (typeof error === 'string') {
    return ERROR_MAP[error] || error;
  }

  // If it's a Firebase error object, check the .code property
  const code = error.code || error.message;
  return ERROR_MAP[code] || 'An unexpected error occurred. Please try again.';
}
