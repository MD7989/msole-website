import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

const requiredSupabaseVars = {
  SUPABASE_URL: env.supabase.url,
  SUPABASE_ANON_KEY: env.supabase.anonKey,
  SUPABASE_SERVICE_ROLE_KEY: env.supabase.serviceRoleKey
};

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
};

export const assertSupabaseConfig = () => {
  const missing = Object.entries(requiredSupabaseVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`);
  }
};

export const createSupabaseAnonClient = () => {
  assertSupabaseConfig();
  return createClient(env.supabase.url, env.supabase.anonKey, clientOptions);
};

export const supabaseAdmin = (() => {
  assertSupabaseConfig();
  return createClient(env.supabase.url, env.supabase.serviceRoleKey, clientOptions);
})();
