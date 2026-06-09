export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
export const DEFAULT_TIMEOUT = parseInt(
  import.meta.env.VITE_DEFAULT_TIMEOUT || "5000"
);

export const ROLES = {
  USER: "ROLE_USER",
  ADMIN: "ROLE_ADMIN",
  SUPER_ADMIN: "ROLE_SUPER_ADMIN",
};

export const MFA_TYPES = {
  TOTP: "TOTP",
  SMS: "SMS",
  EMAIL: "EMAIL",
};

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
