import { apiClient, tokenStorage } from '@/api/client';

export const authService = {
  async register(payload) {
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    tokenStorage.set(data.token, data.refreshToken);
    return data;
  },

  async login(payload) {
    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    tokenStorage.set(data.token, data.refreshToken);
    return data;
  },

  async me() {
    return apiClient('/auth/me');
  },

  async logout() {
    try {
      await apiClient('/auth/logout', { method: 'POST' });
    } finally {
      tokenStorage.clear();
    }
  },

  hasToken() {
    return Boolean(tokenStorage.get() || tokenStorage.getRefresh());
  }
};
