# Nexo Patrimonio — Modelo de Datos y Seguridad (Supabase / PostgreSQL 17)

**Fecha:** 16 de octubre de 2026  
**Motor:** PostgreSQL 17.11 (Supabase)  
**Proyecto Ref:** `qnkonhqeptuxzpwewgcm` (us-east-2)  
**Aislamiento:** Zero-Trust con Row Level Security (RLS) mandatario en todas las tablas

---

## 1. Tablas del Modelo Relacional

| Tabla | Propósito | Llave Primaria | Restricciones y Reglas |
|---|---|---|---|
| `financial_sources` | Entidades o brokers | `id (uuid)` | `owner_id = auth.users(id)` |
| `accounts` | Cuentas contables | `id (uuid)` | `category in ('investment', 'savings_cop', 'savings_usd')`, `internal_cash >= 0` |
| `assets` | Catálogo de instrumentos | `id (uuid)` | `symbol unique uppercase`, tipo en stock, etf, crypto, bond |
| `documents` | Metadatos de extractos | `id (uuid)` | `sha256_hash unique`, path privado en storage |
| `account_snapshots` | Histórico inmutable de cortes | `id (uuid)` | `unique(account_id, as_of_date)` |
| `positions` | Tenencias por corte | `id (uuid)` | `quantity >= 0`, `unique(account_id, asset_id, as_of_date)` |
| `movements` | Transacciones y aportes | `id (uuid)` | Estado en pending, reconciled, excluded |
| `fx_rates` | Historial de TRM | `id (uuid)` | `rate > 0`, `unique(base, quote, effective_date)` |
| `audit_events` | Bitácora inmutable | `id (uuid)` | Registro de cambios con payload antes/después |

---

## 2. Reglas de Integridad y Aritmética Contable

1. **Efectivo Interno de Inversión:** Se almacena en `accounts.internal_cash` (`numeric(18,2)`). En Hapi: `securities_value (2041.43) + internal_cash (267.10) = 2308.53 USD`. **Nunca se duplica como ahorro USD**.
2. **Movimientos Pendientes:** Se guardan con `reconciliation_status = 'pending'`. No impactan `account_snapshots.total_balance` hasta ser conciliados.
3. **Storage Privado:** Bucket `nexo-documents` con acceso restringido `storage.foldername(name)[1] = auth.uid()`.

---

## 3. Estado de Políticas RLS

Todas las tablas cuentan con RLS activo:
- `financial_sources`: `owner_sources` (ALL)
- `accounts`: `owner_accounts` (ALL)
- `documents`: `owner_documents` (ALL)
- `account_snapshots`: `owner_snapshots` (ALL)
- `positions`: `owner_positions` (ALL)
- `movements`: `owner_movements` (ALL)
- `audit_events`: `owner_audit_events` (ALL)
- `assets`: `authenticated_read_assets` (SELECT)
- `fx_rates`: `authenticated_read_fx` (SELECT)
