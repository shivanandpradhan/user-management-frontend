import { PASSWORD_REGEX } from "./constants";

export const validateEmail = (email: string): boolean => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password);
};

export const validateUsername = (username: string): boolean => {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};

export const validateMfaCode = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};
