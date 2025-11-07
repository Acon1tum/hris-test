import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  modules: string[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  hasModuleAccess: (moduleSlug: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken) => {
        set({ user, accessToken, isAuthenticated: true });
        localStorage.setItem('accessToken', accessToken);
      },

      clearAuth: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
        localStorage.removeItem('accessToken');
      },

      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions.includes(permission) ?? false;
      },

      hasAnyPermission: (permissions) => {
        const { user } = get();
        return permissions.some((p) => user?.permissions.includes(p)) ?? false;
      },

      hasAllPermissions: (permissions) => {
        const { user } = get();
        return permissions.every((p) => user?.permissions.includes(p)) ?? false;
      },

      hasModuleAccess: (moduleSlug) => {
        const { user } = get();
        return user?.modules.includes(moduleSlug) ?? false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

