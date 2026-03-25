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
  const re = /^(070|071|080|081|090|091)\d{8}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const validateFullName = (name: string) => {
  // Min 3 chars, at least two words, only letters/hyphens/apostrophes
  const words = name.trim().split(/\s+/);
  const re = /^[a-zA-Z'\-\s]+$/;
  return words.length >= 2 && name.length >= 3 && re.test(name);
};

export const validateUsername = (username: string) => {
  // 3-20 characters. Letters, numbers, and underscores only.
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};
