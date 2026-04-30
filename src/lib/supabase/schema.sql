-- AnalystOS Supabase schema
-- Required environment variables:
-- NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-public-anon-key>

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  role text not null default 'learner',
  created_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  lab_id text not null,
  sql_answer text not null default '',
  insight_note text not null default '',
  recommendation text not null default '',
  status text not null default 'draft' check (status in ('draft', 'submitted', 'reviewed')),
  score integer not null default 0 check (score between 0 and 100),
  feedback text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,
  headline text not null default '',
  bio text not null default '',
  skills text[] not null default '{}',
  projects text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id text primary key,
  title text not null,
  company text not null,
  role text not null check (role in ('DA', 'BA', 'DS')),
  location text not null default 'Remote',
  required_skills text[] not null default '{}',
  description text not null default '',
  salary_range text not null default '',
  difficulty text not null default 'entry' check (difficulty in ('entry', 'mid')),
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  lab_id text not null,
  status text not null default 'not_started',
  updated_at timestamptz not null default now(),
  unique (user_id, lab_id)
);

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists submissions_user_id_idx on public.submissions(user_id);
create index if not exists submissions_lab_id_idx on public.submissions(lab_id);
create index if not exists portfolios_user_id_idx on public.portfolios(user_id);
create index if not exists jobs_role_idx on public.jobs(role);
create index if not exists user_progress_user_lab_idx on public.user_progress(user_id, lab_id);
