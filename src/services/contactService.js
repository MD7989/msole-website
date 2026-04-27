import { apiClient } from '@/api/client';

export const contactService = {
  createMessage(payload) {
    return apiClient('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};
