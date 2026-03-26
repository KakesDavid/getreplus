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
  // Nigerian phone format: 11 digits starting with 07, 08, or 09
  // Clean non-digits first
  const cleaned = phone.replace(/\D/g, '');
  const re = /^(07|08|09)\d{9}$/;
  return re.test(cleaned);
};

export const validateFullName = (name: string) => {
  // Min 3 chars, at least two words, only letters/hyphens/apostrophes
  const trimmed = name.trim();
  const words = trimmed.split(/\s+/);
  const re = /^[a-zA-Z'\-\s]+$/;
  return words.length >= 2 && trimmed.length >= 3 && re.test(trimmed);
};

export const validateUsername = (username: string) => {
  // 3-20 characters. Lowercase letters, numbers, and underscores only.
  const re = /^[a-z0-9_]{3,20}$/;
  return re.test(username);
};
