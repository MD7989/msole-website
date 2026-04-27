import { env } from './env.js';
import { assertSupabaseConfig } from './supabase.js';

export const connectDB = async () => {
  assertSupabaseConfig();
  const host = new URL(env.supabase.url).host;
  console.log(`Supabase Postgres configured: ${host}`);
};
