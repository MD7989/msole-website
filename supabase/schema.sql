create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'user' check (role in ('user', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null default '',
  service text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  ip_address text not null default '',
  user_agent text not null default '',
  email_delivery_attempted boolean not null default false,
  email_delivery_sent boolean not null default false,
  email_delivery_error text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

create index if not exists contact_messages_created_at_idx
on public.contact_messages (created_at desc);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null default 'MSole',
  auth_required boolean not null default false,
  contact_email text not null default 'daniyal.amjad7989@gmail.com',
  calendly_url text not null default 'https://calendly.com/daniyal-amjad7989/30min',
  social_links jsonb not null default '{}'::jsonb,
  maintenance_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

insert into public.site_settings (
  id,
  site_name,
  auth_required,
  contact_email,
  calendly_url,
  social_links,
  maintenance_mode
) values (
  1,
  'MSole',
  false,
  'daniyal.amjad7989@gmail.com',
  'https://calendly.com/daniyal-amjad7989/30min',
  '{
    "linkedin": "https://www.linkedin.com/in/muhammad-daniyal-amjad/",
    "upwork": "https://www.upwork.com/freelancers/~013899322c02a33e0d",
    "whatsapp": "https://wa.me/923356561702"
  }'::jsonb,
  false
) on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Profiles can read own row" on public.profiles;
create policy "Profiles can read own row"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

-- Contact messages are written and read through the Express backend using the
-- Supabase service role key. No anon/authenticated table policy is required.
