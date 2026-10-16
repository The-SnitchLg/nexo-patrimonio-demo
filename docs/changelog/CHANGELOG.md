# Nexo Patrimonio — Historial de Cambios (Changelog)

Todas las modificaciones notables realizadas en este proyecto se documentan en este archivo.

---

## [1.0.0] — 2026-10-16

### Fase 0 — Auditoría y Plan Maestro
- Auditoría integral de solo lectura de `IA`, `T1`, `T2`, herramientas del sistema y repositorios.
- Aprobación explícita del Plan Maestro por parte del usuario.

### Fase 1 — Inicialización, Agentes, Skills y GitHub
- Creación del proyecto React 19 + TypeScript + Vite en `C:\Users\larry\Documents\Antigravity\Finanzas`.
- Configuración de Tailwind CSS v4 con variables CSS en línea para la paleta Nexo.
- Adopción de reglas operativas (`.agent/rules: graphify, ponytail, skills`) y habilidades (`ui-ux-pro-max`, `code-review`, `TDD`, `spec-driven`).
- Creación de repositorios GitHub: Privado (`The-SnitchLg/nexo-patrimonio`) y Público (`The-SnitchLg/nexo-patrimonio-demo`).

### Fase 2 — Sistema de Diseño y Frontend Responsive
- Maquetación fiel de las 6 vistas funcionales conforme a `NEXO_MASTER_DISENO.md`.
- Componentes gráficos interactivos con Recharts: `SnapshotEvolution` y `AllocationDonut`.
- Tabla tipada de 25 activos bursátiles de Hapi con buscador y ordenación.
- Verificación multi-resolución Playwright (1440, 1024, 768, 390px) con 0 errores y 0 desbordamientos horizontales.

### Fase 3 — Base de Datos Supabase, Auth y Seguridad
- DDL PostgreSQL 17 con 9 tablas relacionales en el proyecto Supabase `qnkonhqeptuxzpwewgcm`.
- Row Level Security (RLS) habilitado en el 100% de tablas con políticas `owner_id = auth.uid()`.
- Aprovisionamiento del bucket privado `nexo-documents` en Supabase Storage.
- Usuario propietario `larrygomezg@gmail.com` aprovisionado y verificado en `auth.users`.
- Seeding verificado de 25 posiciones y saldo base de Hapi al 30/09/2026 ($2.041,43 USD valores + $267,10 USD efectivo = $2.308,53 USD).

### Fase 4 — Inversiones, Ahorros, Cuentas y Movimientos
- Implementación de `FinanceDataService` para sincronización con Supabase.
- Manejo de cuentas de ahorro en COP, USD e inversiones con segregación de efectivo interno.

### Fase 5 — Importación PDF/CSV y Conciliación
- `StatementReconciliationEngine` para extracción y detección de diferencias y duplicados.
- Modal `ImportReviewModal` con previsualización obligatoria antes de confirmar actualizaciones.

### Fase 6 — Dashboard, Analítica e Insights
- `WealthAnalyticsEngine` con análisis de concentración tecnológica (VGT, SMH, NVDA = 36.8%), fuentes faltantes y sensibilidad TRM.

### Fase 7 — Testing, Accesibilidad, Performance y Seguridad
- 11 pruebas unitarias Vitest pasando (100%).
- 4 viewports auditados con Playwright E2E.
- Optimización de bundle con `manualChunks`: aplicación empaquetada en solo 80 kB.
- 0 advertencias y 0 errores en Oxlint.

### Fase 8 — Documentación y Despliegue
- Documentación de arquitectura (ADRs), modelo de datos, changelog y pipeline GitHub Actions (`deploy.yml`).
