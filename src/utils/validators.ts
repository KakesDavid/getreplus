export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export const validatePhone = (phone: string) => {
  // Clean non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Nigerian phone formats:
  // 11 digits starting with 07, 08, 09
  // 10 digits starting with 7, 8, 9 (the leading zero is implied by +234)
  const re = /^0?(7|07|8|08|9|09)\d{8,9}$/;
  
  // Must be either 10 or 11 digits after cleaning
  return (cleaned.length === 10 || cleaned.length === 11) && (
    cleaned.startsWith('0') ? /^(07|08|09)\d{8}$/.test(cleaned) : /^(7|8|9)\d{9}$/.test(cleaned)
  );
};

/**
 * Normalizes a Nigerian phone number to the 11-digit 080... format
 */
export const normalizePhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && /^[789]/.test(cleaned)) {
    cleaned = '0' + cleaned;
  }
  return cleaned;
};

export const validateFullName = (name: string) => {
  // Relaxed: At least 3 characters, typically two words but we allow one for flexibility 
  // as long as it's a reasonable length (e.g. "Chukwuemeka")
  const trimmed = name.trim();
  const re = /^[a-zA-Z'\-\s]+$/;
  return trimmed.length >= 3 && re.test(trimmed);
};

export const validateUsername = (username: string) => {
  // 3-20 characters. Lowercase letters, numbers, and underscores only.
  const re = /^[a-z0-9_]{3,20}$/;
  return re.test(username);
};
