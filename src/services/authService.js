import { apiClient, legacyAuthStorage } from '@/api/client';

export const authService = {
  async register(payload) {
    return apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async login(payload) {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async me() {
    return apiClient('/auth/me');
  },

  async logout() {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } finally {
      legacyAuthStorage.clear();
    }
  }
};
