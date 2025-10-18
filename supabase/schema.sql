-- Supabase schema for the product catalogue.
create extension if not exists "pgcrypto";

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.labels (
  slug text primary key,
  name text not null,
  display_name text,
  type text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_url text not null,
  price double precision not null,
  category_slug text not null references public.categories (slug) on delete restrict,
  is_bio boolean default false,
  is_label_rouge boolean default false,
  rating numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.product_labels (
  product_id uuid not null references public.products (id) on delete cascade,
  label_slug text not null references public.labels (slug) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, label_slug)
);

create index if not exists products_category_slug_idx
  on public.products (category_slug);

create index if not exists product_labels_label_slug_idx
  on public.product_labels (label_slug);
