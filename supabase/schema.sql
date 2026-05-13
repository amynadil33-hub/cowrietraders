-- Cowrie Traders — Supabase schema
-- Run this once in a fresh Supabase project (SQL editor) before mock-data.sql and policies.sql.

create extension if not exists "pgcrypto";

create table if not exists countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text,
  is_import_origin boolean default false,
  is_export_destination boolean default false,
  created_at timestamptz default now()
);

create table if not exists product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('import','export','both')),
  description text,
  created_at timestamptz default now()
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  abbreviation text not null,
  description text
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_id uuid references product_categories(id),
  trade_type text check (trade_type in ('import','export')),
  description text,
  default_unit text,
  origin_country_id uuid references countries(id),
  availability_status text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  trade_type text not null,
  product_category_id uuid references product_categories(id),
  product_id uuid references products(id),
  origin_country_id uuid references countries(id),
  destination_country_id uuid references countries(id),
  quantity numeric not null,
  unit_id uuid references units(id),
  preferred_delivery_date date,
  delivery_location text,
  customer_name text not null,
  company_name text,
  email text not null,
  phone text,
  notes text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  phone text,
  email text,
  office_hours text,
  created_at timestamptz default now()
);

create table if not exists freight_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists customer_service_topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz default now()
);
