import { apiClient } from '@/api/client';

export const settingsService = {
  getPublicSettings() {
    return apiClient('/settings/public');
  },

  updateSettings(payload) {
    return apiClient('/settings', {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }
};
