import { apiClient } from '@/api/client';

export const settingsService = {
  getPublicSettings() {
    return apiClient('/settings/public');
  }
};
