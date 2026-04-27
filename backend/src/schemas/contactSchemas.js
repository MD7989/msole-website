import { z } from 'zod';

export const createContactMessageSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(180),
    company: z.string().trim().max(160).optional().default(''),
    service: z.string().trim().max(120).optional().default(''),
    message: z.string().trim().min(10).max(5000)
  })
});
