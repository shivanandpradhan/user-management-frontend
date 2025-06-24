export interface UserProfileDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  profileImageUrl?: string;
  bio?: string;
  email?: string;
  roles?: [String];
  enabled?: Boolean;
  username?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserSecurityDto {
  mfaEnabled: boolean;
  lastPasswordResetDate: string;
  activeSessions: Array<{
    id: string;
    device: string;
    ipAddress: string;
    lastAccessed: string;
  }>;
  failedLoginAttempts: number;
  accountLockedUntil?: string;
}
