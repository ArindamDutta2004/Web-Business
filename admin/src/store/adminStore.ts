import { create } from 'zustand';
import api from '@/lib/api';

interface Admin {
  id: string; firstName: string; lastName: string; email: string; role: string;
}

interface AdminAuthState {
  admin: Admin | null; isAuthenticated: boolean; isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAdminStore = create<AdminAuthState>((set) => ({
  admin: null, isAuthenticated: false, isLoading: true,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.data.user.role !== 'admin' && data.data.user.role !== 'superadmin') {
      throw new Error('Admin access required');
    }
    localStorage.setItem('adminAccessToken', data.data.accessToken);
    localStorage.setItem('adminRefreshToken', data.data.refreshToken);
    set({ admin: data.data.user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    set({ admin: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('adminAccessToken');
      if (!token) { set({ isLoading: false }); return; }
      const { data } = await api.get('/auth/me');
      if (data.data.role !== 'admin' && data.data.role !== 'superadmin') {
        throw new Error('Not admin');
      }
      set({ admin: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('adminAccessToken');
      localStorage.removeItem('adminRefreshToken');
      set({ admin: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
