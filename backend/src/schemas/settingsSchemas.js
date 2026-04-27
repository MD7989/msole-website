import { z } from 'zod';

export const updateSettingsSchema = z.object({
  body: z.object({
    siteName: z.string().trim().min(1).max(120).optional(),
    authRequired: z.boolean().optional(),
    contactEmail: z.string().trim().email().optional(),
    calendlyUrl: z.string().trim().url().optional(),
    socialLinks: z.object({
      linkedin: z.string().trim().url().optional(),
      upwork: z.string().trim().url().optional(),
      whatsapp: z.string().trim().url().optional()
    }).optional(),
    maintenanceMode: z.boolean().optional()
  })
});
