export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  profileImage?: string;
  phoneNumber?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

