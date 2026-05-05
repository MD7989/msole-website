import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const parseList = (value, fallback) => {
  return (value || fallback)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  clientUrls: parseList(
    process.env.CLIENT_URLS,
    process.env.CLIENT_URL || 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174'
  ),
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  },
  emailProvider: process.env.EMAIL_PROVIDER || (process.env.RESEND_API_KEY ? 'resend' : 'smtp'),
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.RESEND_FROM || process.env.MAIL_FROM || 'MSole Website <onboarding@resend.dev>'
  },
  brevo: {
    apiKey: process.env.BREVO_API_KEY || '',
    fromEmail: process.env.BREVO_FROM_EMAIL || '',
    fromName: process.env.BREVO_FROM_NAME || 'MSole Website'
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.MAIL_FROM || 'MSole Website <no-reply@msole.local>',
    contactTo: process.env.CONTACT_TO_EMAIL || 'daniyal.amjad7989@gmail.com'
  }
};
