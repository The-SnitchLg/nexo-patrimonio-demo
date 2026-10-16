-- ====================================================================
-- MIGRACIÓN INICIAL: ESQUEMA DE BASE DE DATOS SUPABASE / POSTGRESQL 17
-- Nexo Patrimonio — Plataforma Privada de Gestión Patrimonial
-- Fecha: 16 de octubre de 2026
-- Seguridad: Zero-Trust, Row Level Security (RLS) en todas las tablas
-- Precisión monetaria: numeric(18,2) y numeric(18,6) sin coma flotante
-- ====================================================================

-- 0. Extensiones requeridas
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ====================================================================
-- 1. TABLAS DEL MODELO RELACIONAL
-- ====================================================================

-- 1.1 Entidades financieras o brokers (Hapi, Bancolombia, Nu, Littio, etc.)
create table if not exists public.financial_sources (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 100),
  provider text not null,
  institution_type text not null check (institution_type in ('brokerage', 'bank', 'fintech', 'wallet')),
  currency varchar(3) not null default 'USD',
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 1.2 Cuentas contables específicas dentro de una entidad
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.financial_sources(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 100),
  account_category text not null check (account_category in ('investment', 'savings_cop', 'savings_usd')),
  currency varchar(3) not null default 'USD',
  account_number_mask text,
  internal_cash numeric(18,2) not null default 0.00 check (internal_cash >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 1.3 Catálogo normalizado de instrumentos de inversión
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  symbol text not null unique check (symbol = upper(trim(symbol))),
  name text not null,
  asset_type text not null check (asset_type in ('stock', 'etf', 'crypto', 'bond', 'other')),
  currency varchar(3) not null default 'USD',
  created_at timestamptz not null default now()
);

-- 1.4 Metadatos de documentos y extractos soportados
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  source_id uuid references public.financial_sources(id) on delete set null,
  file_name text not null,
  file_size_bytes bigint not null check (file_size_bytes > 0),
  mime_type text not null,
  storage_path text not null unique,
  sha256_hash char(64) not null unique,
  period_start date,
  period_end date,
  processing_status text not null default 'uploaded' check (processing_status in ('uploaded', 'extracted', 'reconciled', 'rejected', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- 1.5 Cortes históricos de saldo inmutables (Snapshots)
create table if not exists public.account_snapshots (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  as_of_date date not null,
  total_balance numeric(18,2) not null check (total_balance >= 0),
  securities_value numeric(18,2) not null default 0.00 check (securities_value >= 0),
  cash_value numeric(18,2) not null default 0.00 check (cash_value >= 0),
  document_id uuid references public.documents(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (account_id, as_of_date)
);

-- 1.6 Posiciones de activos por corte y cuenta
create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  asset_id uuid not null references public.assets(id) on delete restrict,
  owner_id uuid not null references auth.users(id) on delete cascade,
  quantity numeric(18,6) not null check (quantity >= 0),
  market_price numeric(18,4) not null check (market_price >= 0),
  market_value numeric(18,2) not null check (market_value >= 0),
  as_of_date date not null,
  document_id uuid references public.documents(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (account_id, asset_id, as_of_date)
);

-- 1.7 Movimientos y transacciones (aportes, retiros, compras, ventas)
create table if not exists public.movements (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  transaction_date date not null,
  amount numeric(18,2) not null,
  currency varchar(3) not null default 'USD',
  movement_type text not null check (movement_type in ('deposit', 'withdrawal', 'buy', 'sell', 'dividend', 'fee', 'interest')),
  reconciliation_status text not null default 'pending' check (reconciliation_status in ('pending', 'reconciled', 'excluded', 'discrepancy')),
  description text,
  external_reference text,
  document_id uuid references public.documents(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 1.8 Historial de tasas de cambio (TRM)
create table if not exists public.fx_rates (
  id uuid primary key default gen_random_uuid(),
  base_currency varchar(3) not null default 'USD',
  quote_currency varchar(3) not null default 'COP',
  rate numeric(12,4) not null check (rate > 0),
  effective_date date not null,
  source_type text not null default 'official_trm' check (source_type in ('official_trm', 'manual_override', 'demo_fallback')),
  created_at timestamptz not null default now(),
  unique (base_currency, quote_currency, effective_date)
);

-- 1.9 Registro de auditoría inmutable
create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  payload_before jsonb,
  payload_after jsonb,
  created_at timestamptz not null default now()
);

-- ====================================================================
-- 2. ÍNDICES DE RENDIMIENTO
-- ====================================================================

create index if not exists idx_sources_owner on public.financial_sources(owner_id);
create index if not exists idx_accounts_owner on public.accounts(owner_id);
create index if not exists idx_accounts_source on public.accounts(source_id);
create index if not exists idx_positions_account_date on public.positions(account_id, as_of_date);
create index if not exists idx_snapshots_account_date on public.account_snapshots(account_id, as_of_date);
create index if not exists idx_movements_account_status on public.movements(account_id, reconciliation_status);
create index if not exists idx_documents_hash on public.documents(sha256_hash);
create index if not exists idx_fx_effective_date on public.fx_rates(effective_date);

-- ====================================================================
-- 3. TRIGGERS Y FUNCIONES DE INTEGRIDAD
-- ====================================================================

create or replace function public.fn_actualizar_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_financial_sources_updated
  before update on public.financial_sources
  for each row execute function public.fn_actualizar_timestamp();

create trigger trg_accounts_updated
  before update on public.accounts
  for each row execute function public.fn_actualizar_timestamp();

-- ====================================================================
-- 4. SEGURIDAD ZERO-TRUST: ROW LEVEL SECURITY (RLS)
-- ====================================================================

alter table public.financial_sources enable row level security;
alter table public.accounts enable row level security;
alter table public.assets enable row level security;
alter table public.documents enable row level security;
alter table public.account_snapshots enable row level security;
alter table public.positions enable row level security;
alter table public.movements enable row level security;
alter table public.fx_rates enable row level security;
alter table public.audit_events enable row level security;

-- Revocar todos los privilegios a usuarios anónimos (anon)
revoke all on public.financial_sources from anon;
revoke all on public.accounts from anon;
revoke all on public.assets from anon;
revoke all on public.documents from anon;
revoke all on public.account_snapshots from anon;
revoke all on public.positions from anon;
revoke all on public.movements from anon;
revoke all on public.fx_rates from anon;
revoke all on public.audit_events from anon;

-- Políticas de aislamiento por propietario (owner_id = auth.uid())
create policy "owner_sources" on public.financial_sources
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_accounts" on public.accounts
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_documents" on public.documents
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_snapshots" on public.account_snapshots
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_positions" on public.positions
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_movements" on public.movements
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "owner_audit_events" on public.audit_events
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

-- Catálogos compartidos de solo lectura para usuarios autenticados
create policy "authenticated_read_assets" on public.assets
  for select to authenticated
  using (true);

create policy "authenticated_read_fx" on public.fx_rates
  for select to authenticated
  using (true);
