import { ROLES } from "./constants";

export const formatRoleName = (role: string): string => {
  switch (role) {
    case ROLES.USER:
      return "User";
    case ROLES.ADMIN:
      return "Admin";
    case ROLES.SUPER_ADMIN:
      return "Super Admin";
    default:
      return role;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatSecretForManualEntry = (secret: string): string => {
  return secret.replace(/(.{4})/g, "$1 ").trim();
};

export const hasRole = (userRoles: string[], requiredRole: string): boolean => {
  return userRoles.includes(requiredRole);
};
