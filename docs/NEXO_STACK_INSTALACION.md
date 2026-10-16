# NEXO PATRIMONIO — STACK TECNOLÓGICO E INSTALACIÓN

> **Versión:** 1.0 · **Fecha:** 16 de octubre de 2026  
> **Objetivo:** pasar del prototipo HTML a una aplicación privada React, moderna, responsive y escalable.  
> **Referencia visual obligatoria:** `NEXO_MASTER_DISENO.md`  
> **Estado:** guía técnica propuesta; **no** significa que los comandos o integraciones ya se hayan ejecutado.

---

## 1. Decisión de arquitectura

**Arquitectura recomendada:** SPA privada / futura PWA con **React + TypeScript + Vite**, **Tailwind CSS v4**, **shadcn/ui**, **Supabase** y un proceso de importación documental validado. Evitar Next.js y backend a medida en el MVP salvo necesidad real: no hay requerimiento de SSR/SEO y el producto es solo para uso privado.

```text
Navegador (React + TypeScript + Vite)
 ├─ Diseño: Tailwind CSS v4 + shadcn/ui + Lucide
 ├─ Interacciones: React Router + TanStack Query + React Hook Form + Zod
 ├─ Visualización: Recharts + TanStack Table
 ├─ Cálculo monetario: Decimal.js + Intl.NumberFormat
 ├─ Importación: selector de archivos + validación previa
 └─ Cliente Supabase (clave publishable)
       │  sesión autenticada + políticas RLS
       ▼
   Supabase Auth ─── PostgreSQL (cuentas, posiciones, movimientos, snapshots)
       ├─────────── Storage privado (PDF/CSV originales)
       └─────────── Edge Functions (extracción, conciliación, validación)
                               └─ OCR solo cuando sea necesario

Conectores bancarios / de mercado: posteriores y solo por API oficial/autorizada.
```

**Privacidad:** la aplicación debe tener acceso restringido al propietario; impedir registro público o controlar por lista permitida; todas las tablas y objetos se segregan por `owner_id = auth.uid()`. El hecho de que sea "solo para mí" **no** vuelve seguro el HTML estático por sí mismo.

## 2. Selección tecnológica

| Capa | Herramienta | Uso | Fase |
|---|---|---|---|
| UI | React + TypeScript | Componentes reutilizables y tipado | MVP |
| Bundler | Vite | Desarrollo, build y despliegue | MVP |
| CSS | Tailwind CSS v4 | Diseño responsive y tokens | MVP |
| UI Kit | shadcn/ui (Radix, según componente) | Dialog, Sheet, Tabs, Inputs, Button | MVP |
| Iconos | lucide-react | Iconografía homogénea | MVP |
| Router | react-router | Dashboard / inversiones / COP / USD / documentos / ajustes | MVP |
| Datos asíncronos | @tanstack/react-query | Fetch, caché, invalidación | MVP |
| Formularios | react-hook-form + zod + @hookform/resolvers | Formularios validados | MVP |
| Gráficos | recharts | Series temporales y distribución | MVP |
| Tablas | @tanstack/react-table | Buscar, ordenar y filtrar posiciones | MVP |
| Dinero | decimal.js + `Intl.NumberFormat` | Evitar errores de punto flotante en cálculo | MVP |
| Fechas | date-fns | Cortes, periodos y visualización | MVP |
| Base de datos | Supabase Postgres | Saldos, cuentas, movimientos, valuaciones | MVP |
| Sesión | Supabase Auth | Acceso privado | MVP |
| Archivos | Supabase Storage (privado) | Extractos originales | Fase 2 |
| PDF | pdfjs-dist | Extracción de texto de PDF digital | Fase 2 |
| CSV | papaparse | Importación tabular | Fase 2 |
| Procesamiento | Supabase Edge Functions | Parseo, normalización, revisión, conciliación | Fase 2 |
| Animación | motion (opcional) | Interacciones discretas | Refinamiento |
| PWA | vite-plugin-pwa (opcional) | Instalación en celular | Fase 3 |
| Pruebas | Vitest + Testing Library | Componentes y cálculos | MVP |
| E2E | Playwright | Flujo de importación y navegación responsive | MVP |

**No hay dependencia técnica de Framer en producción.** Syncore es una **referencia visual**, no la fuente del frontend.

---

## 3. Requisitos previos

- **Node.js:** 22 LTS o superior compatible. El requisito mínimo actual de Vite es Node **20.19+ o 22.12+**; algunas plantillas pueden exigir versiones mayores.
- **npm** provisto por Node; usar un solo gestor por repositorio.
- **Git** instalado y repositorio privado.
- VS Code, Cursor o Antigravity (opcional para asistencia), navegador Chromium.
- Proyecto Supabase nuevo y aislado del resto de tus proyectos.

Comprobar:

```bash
node --version
npm --version
git --version
```

Documentación de compatibilidad: https://vite.dev/guide/

---

## 4. Instalación paso a paso (npm)

### Paso 1. Crear React + Vite + TypeScript

```bash
npm create vite@latest nexo-patrimonio -- --template react-ts
cd nexo-patrimonio
npm install
```

### Paso 2. Instalar Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

En `vite.config.ts`, **integrar** ambos plugins; si hay otras opciones preexistentes, preservarlas:

```ts
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

En `src/index.css`, usar:

```css
@import "tailwindcss";
/* Mantener después los tokens del MASTER DE DISEÑO y
   los estilos generados por shadcn/ui al inicializarlo. */
```

**Tailwind v4:** no copiar instalaciones antiguas basadas exclusivamente en `tailwind.config.js` o PostCSS si el plugin oficial de Vite ya está configurado.

Documentación: https://tailwindcss.com/docs/installation/using-vite

### Paso 3. Configurar alias TypeScript para shadcn/ui

Instalar los tipos de Node:

```bash
npm install -D @types/node
```

En `tsconfig.json`, incluir dentro de `compilerOptions` (sin eliminar las referencias existentes):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

En `tsconfig.app.json`, incorporar dentro de su **objeto `compilerOptions` existente**:

```json
{
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] }
}
```

> Los fragmentos anteriores son **campos para fusionar**, no reemplazos completos de los archivos `tsconfig`. En particular, conservar `references`, `jsx`, `target`, `moduleResolution` y demás campos generados por Vite.

### Paso 4. Inicializar shadcn/ui

```bash
npx shadcn@latest init
```

Seleccionar variables CSS, compatibilidad con Tailwind v4, import alias `@/*` y una base visual neutral. Luego incorporar la paleta Nexo; no aceptar un preset que reemplace todos los colores por azules, violetas o verdes.

Instalar componentes según necesidad:

```bash
npx shadcn@latest add button card badge input label select tabs dialog sheet tooltip separator skeleton alert table scroll-area switch sonner chart
```

Si alguna pieza cambia de nombre en una versión futura, consultar `npx shadcn@latest --help` y el registro oficial. **No crear un diseño paralelo** de botones, inputs y modales si shadcn permite componerlos.

Guía oficial: https://ui.shadcn.com/docs/installation/vite

### Paso 5. Instalar librerías funcionales

```bash
npm install react-router @tanstack/react-query @tanstack/react-table \
  lucide-react recharts react-hook-form zod @hookform/resolvers \
  decimal.js date-fns @supabase/supabase-js
```

**PowerShell (Windows):** ejecutar en **una sola línea** si `\` no funciona como continuación:

```powershell
npm install react-router @tanstack/react-query @tanstack/react-table lucide-react recharts react-hook-form zod @hookform/resolvers decimal.js date-fns @supabase/supabase-js
```

Opcionales, instalar solo al llegar a la fase:

```bash
# Fase 2: archivos e importación
npm install pdfjs-dist papaparse
npm install -D @types/papaparse

# Refinamiento visual
npm install motion

# Fase 3: PWA
npm install -D vite-plugin-pwa
```

### Paso 6. Instalar herramientas de prueba

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npx playwright install chromium
```

> Estos comandos instalan dependencias. Falta configurar archivos de test, scripts y CI antes de afirmar que hay pruebas automatizadas.

### Paso 7. Iniciar servidor

```bash
npm run dev
```

Abrir el enlace local que muestre Vite (habitualmente `http://localhost:5173`).

Verificar build de producción:

```bash
npm run build
npm run preview
```

---

## 5. Integrar los tokens visuales con Tailwind v4

La fuente canónica es el archivo `NEXO_MASTER_DISENO.md`. Una integración posible en `src/index.css`:

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  --bg: #070707; --shell: #0b0b0b; --card: #0d0d0d;
  --card-2: #191919; --stroke: #303030;
  --text: #f3f0e9; --muted: #97948e; --hover: #202020;
  --signal: #ff7849; --positive: #b6ceac;
  --warning: #fc9a71; --negative: #fb806d;
}
:root[data-theme="light"] {
  color-scheme: light;
  --bg: #f5f3ef; --shell: #eceae5; --card: #fffefb;
  --card-2: #e9e7e1; --stroke: #d4d0c8;
  --text: #1b1a18; --muted: #69665f; --hover: #e9e7e2;
  --signal: #d7542b; --positive: #3b6650;
  --warning: #b15c35; --negative: #b63e34;
}

@theme inline {
  --color-nexo-bg: var(--bg);
  --color-nexo-shell: var(--shell);
  --color-nexo-card: var(--card);
  --color-nexo-border: var(--stroke);
  --color-nexo-text: var(--text);
  --color-nexo-muted: var(--muted);
  --color-nexo-accent: var(--signal);
}

body { background: var(--bg); color: var(--text); }
.data-number { font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

**Atención con shadcn/ui:** su `init` puede generar nombres como `--background`, `--foreground`, `--primary` y `--border` con otros formatos de color. Vincularlos de manera coherente a los tokens Nexo en **una única capa de tema**, evitando redefiniciones contradictorias. Realizar este ajuste **después** de ejecutar el CLI.

---

## 6. Estructura recomendada del repositorio

```text
nexo-patrimonio/
├─ docs/
│  ├─ NEXO_MASTER_DISENO.md
│  ├─ NEXO_STACK_INSTALACION.md
│  └─ referencias/           # Imágenes de diseño, SIN documentos financieros reales
├─ public/
│  └─ icons/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ router.tsx
│  │  └─ providers.tsx
│  ├─ components/
│  │  ├─ ui/                 # shadcn/ui
│  │  ├─ layout/             # AppShell, Sidebar, BottomNav, Topbar
│  │  ├─ finance/            # Metric, MoneyDisplay, SourceBadge, FxControl
│  │  ├─ charts/             # AllocationDonut, SnapshotEvolution
│  │  ├─ investments/        # HoldingsTable, PositionBar
│  │  └─ documents/          # Dropzone, ImportReview, DiffTable
│  ├─ features/
│  │  ├─ dashboard/
│  │  ├─ investments/
│  │  ├─ savings-cop/
│  │  ├─ savings-usd/
│  │  ├─ documents/
│  │  └─ settings/
│  ├─ lib/
│  │  ├─ supabase.ts
│  │  ├─ currency.ts
│  │  ├─ valuations.ts
│  │  └─ import-validation.ts
│  ├─ hooks/
│  ├─ schemas/              # Zod
│  ├─ types/
│  ├─ test/
│  ├─ index.css
│  └─ main.tsx
├─ supabase/
│  ├─ migrations/
│  └─ functions/
├─ .env.example
├─ .gitignore
└─ package.json
```

### Mapa inicial de rutas

| Ruta | Vista |
|---|---|
| `/` | Dashboard |
| `/inversiones` | Inversiones |
| `/ahorros/cop` | Ahorros pesos |
| `/ahorros/usd` | Ahorros dólares |
| `/documentos` | Importaciones y archivos |
| `/configuracion` | Moneda, tema, privacidad |
| `/login` | Acceso privado |

No incorporar CRM, presupuestos, deudas, pagos, banca transaccional o funcionalidades sociales: **fuera del alcance**.

---

## 7. Supabase: configuración y secretos

### 7.1 Crear proyecto aislado

1. Crear un proyecto Supabase dedicado a Nexo, sin compartir tablas con proyectos corporativos.
2. Configurar autenticación por correo/contraseña o Magic Link; para uso personal, restringir usuarios permitidos y deshabilitar altas públicas si aplica.
3. Crear tablas por migraciones versionadas y habilitar **RLS en todas**.
4. Crear bucket de documentos **privado**, con carpetas por UID y reglas sobre `storage.objects`.
5. Mantener datos de prueba y producción separados.

### 7.2 Variables de entorno

`.env.example` (versionable, sin valores reales):

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_PUBLISHABLE_KEY
```

Copiar manualmente a `.env.local` y colocar los valores reales. Añadir `.env.local` a `.gitignore`.

**Nunca incluir** `service_role`, claves secretas, tokens bancarios ni claves de APIs privadas con prefijo `VITE_`: Vite publica esas variables en el cliente. Mantener secretos únicamente en Edge Functions / servicios seguros.

En `src/lib/supabase.ts`:

```ts
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !publishableKey) {
  throw new Error('Configura las variables de Supabase')
}

export const supabase = createClient(url, publishableKey)
```

Documentación oficial: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

### 7.3 Modelo de datos recomendado (conceptual)

| Tabla | Campos representativos | Regla |
|---|---|---|
| `financial_sources` | `id`, `owner_id`, `name`, `provider`, `type`, `currency`, `status` | Una fuente puede contener efectivo y valores |
| `accounts` | `id`, `source_id`, `owner_id`, `category`, `currency`, `last_statement_date` | Categoría contable única; sin duplicidad |
| `assets` | `id`, `symbol`, `name`, `asset_type`, `currency` | Catálogo de instrumentos |
| `positions` | `account_id`, `asset_id`, `quantity`, `valuation_date`, `market_value` | Cantidades decimales, valores al corte |
| `account_snapshots` | `account_id`, `date`, `balance`, `currency`, `document_id` | Histórico verificable |
| `movements` | `account_id`, `date`, `amount`, `currency`, `type`, `status` | Aporte ≠ rentabilidad |
| `documents` | `owner_id`, `source_id`, `storage_path`, `sha256`, `period`, `status` | Trazabilidad y deduplicación |
| `import_jobs` | `document_id`, `state`, `errors`, `reviewed_at` | Requiere revisión |
| `fx_rates` | `date`, `base`, `quote`, `rate`, `source` | Tipo de cambio trazable |
| `preferences` | `owner_id`, `theme`, `base_currency`, `privacy_mask` | Experiencia personalizada |

**Diseño contable:** diferenciar `cash_in_investment_account` de `independent_usd_savings`. En una inversión, **valores + efectivo interno = saldo de esa plataforma**. No sumar el efectivo interno como un segundo ahorro.

Usar `numeric` en PostgreSQL y `Decimal.js` en cálculos importantes; jamás guardar dinero como `float` binario ni como cadenas formateadas (`"US$ 2.308,53"`).

### 7.4 RLS — patrón de propiedad

Cada tabla personal debe tener `owner_id uuid not null` y políticas para **SELECT, INSERT, UPDATE y DELETE**, según los permisos deseados. Por ejemplo, para una tabla `accounts` previamente creada:

```sql
alter table public.accounts enable row level security;

create policy "owner reads own accounts"
on public.accounts for select to authenticated
using (owner_id = (select auth.uid()));

create policy "owner inserts own accounts"
on public.accounts for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "owner updates own accounts"
on public.accounts for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "owner deletes own accounts"
on public.accounts for delete to authenticated
using (owner_id = (select auth.uid()));
```

**No ejecutar literalmente** antes de crear la tabla y revisar índices, claves foráneas y reglas de negocio. RLS de Postgres no reemplaza las políticas de `storage.objects` para documentos. Evitar ejemplos de `USING (true)` en tablas patrimoniales.

Documentación: https://supabase.com/docs/guides/database/postgres/row-level-security

---

## 8. Importación de extractos (Fase 2)

### Flujo seguro

```text
Cargar PDF/CSV
  → validación de extensión/tamaño/formato
  → almacenamiento privado y hash SHA-256
  → extracción de texto (OCR si el PDF es escaneado)
  → identificación de proveedor y período
  → extracción de posiciones, efectivo, movimientos y valores al corte
  → normalización de moneda, fechas y decimales
  → deduplicación por documento + entidad + período
  → comparación con datos existentes
  → vista previa de altas/actualizaciones/conflictos
  → confirmación explícita
  → persistencia + registro de auditoría
  → recálculo de indicadores / invalidación de caché
```

### Reglas funcionales obligatorias

- PDF.js lee PDFs digitales; **no es un sistema OCR**. Para imágenes escaneadas, implementar OCR privado cuando sea necesario.
- Antes de reemplazar posiciones, comprobar que el documento corresponde a la misma cuenta y a un corte posterior (o permitir una importación histórica sin reemplazar el presente).
- Distinguir movimientos, snapshots y rentabilidad. Variación de saldo ≠ ganancia.
- Cada cifra importada debe llevar documento, página/extracción cuando sea posible, cuenta, moneda y período.
- Importación repetida no crea posiciones/movimientos duplicados.
- No inferir depósitos de una captura como ya acreditados en la misma cuenta sin verificación.
- Carga documental del prototipo HTML actual **no** procesa PDFs. Requiere desarrollar Fase 2; no anunciarla como disponible.
- Si se utiliza IA externa para interpretar extractos, solicitar autorización y aplicar criterios estrictos de tratamiento/retención de datos financieros. Preferir extracción determinista en el primer proveedor soportado.

### Primer caso de prueba conocido

Extracto Hapi/Apex con corte **30/09/2026**:

- Total de cuenta: **USD 2.308,53**.
- Valores: **USD 2.041,43**.
- Efectivo dentro de Hapi: **USD 267,10**.
- Posiciones bursátiles: **25**.
- Depósitos posteriores de la captura: **USD 300**, pendientes de conciliación y **no sumados**.

**Prueba de control:** `2041.43 + 267.10 === 2308.53` con decimal exacto, no con redondeos flotantes. Para cálculos futuros de performance se requerirá flujo de caja fechado y metodología explícita (TWR/XIRR).

---

## 9. Convenciones de UI y lógica financiera

- Usar `currency` y `asOfDate` como props explícitas en cualquier `MoneyDisplay`.
- Etiquetar `status: 'confirmed' | 'pending' | 'historical' | 'missing' | 'error'`.
- Mantener cálculo de net worth en función pura y testeable.
- Formatear para `es-CO` con `Intl.NumberFormat`; **almacenar números decimales sin formatear**.
- El total consolidado en COP o USD depende de tasa, fuente y fecha; si falta tasa, mostrar aviso o bloquear conversión, no improvisar.
- Indicadores positivos/negativos requieren contexto y fuente temporal.
- Para la evolución, mostrar snapshots reales; si solo hay dos, usar un tramo explícito "01/09 → 30/09" sin inventar datos diarios.
- La autenticación, RLS y almacenamiento privado son parte del MVP productivo, no tareas cosméticas del cierre.

---

## 10. Plan de ejecución / definición de terminado

### Iteración A — UI y datos locales

- [ ] Crear repositorio privado y stack base.
- [ ] Migrar todos los estilos a tokens y componentes reutilizables.
- [ ] Implementar layout adaptativo y las 6 rutas.
- [ ] Dashboard y tablas leyendo un proveedor de datos tipado.
- [ ] Emplear snapshots de ejemplo sin datos personales identificables.
- [ ] Formularios y edición local con validación.
- [ ] Pruebas básicas de navegación, dark/light, conversiones y responsive.

### Iteración B — Privacidad y persistencia

- [ ] Configurar Supabase y Auth restringida.
- [ ] Diseñar migraciones y RLS con pruebas de aislamiento.
- [ ] Registrar/actualizar fuentes independientes COP/USD e inversiones.
- [ ] Introducir historial de saldos y tipo de cambio con origen/fecha.
- [ ] Gestión de errores, backups y exportación verificable.

### Iteración C — Documentos

- [ ] Storage privado y carga controlada.
- [ ] Parser confiable para el extracto Hapi/Apex.
- [ ] Preview de cambios y conciliación.
- [ ] Detección de duplicados y auditoría.
- [ ] Pruebas con archivo idéntico, períodos cruzados y documento inválido.

### Iteración D — Inteligencia y mobile

- [ ] Insights explicables y métricas de rentabilidad válidas.
- [ ] Integraciones autorizadas cuando existan.
- [ ] PWA y estrategia de caché segura (evitar cachear documentos personales indiscriminadamente).
- [ ] Test de accesibilidad, rendimiento y privacidad.

### Criterios de aprobación global

1. El total puede desglosarse por fuente sin duplicar efectivo.
2. Un documento nunca modifica datos confirmados sin validación/conciliación.
3. Un usuario no autorizado no accede a datos ni objetos, incluso con llamadas directas.
4. Dashboard, Inversiones, COP, USD, Documentos y Configuración operan en móvil/desktop.
5. La interfaz coincide con `NEXO_MASTER_DISENO.md` (tokens, jerarquía y patrón editorial).
6. Build, tests y lint se ejecutan sin fallos conocidos.

---

## 11. Fuentes oficiales de los comandos

- Vite: https://vite.dev/guide/
- Tailwind v4 + Vite: https://tailwindcss.com/docs/installation/using-vite
- shadcn/ui + Vite: https://ui.shadcn.com/docs/installation/vite
- Supabase + React: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- Supabase Auth + React: https://supabase.com/docs/guides/auth/quickstarts/react
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Storage: https://supabase.com/docs/guides/storage
- React Router: https://reactrouter.com/
- TanStack Query: https://tanstack.com/query/latest
- TanStack Table: https://tanstack.com/table/latest
- Recharts: https://recharts.org/
- PDF.js: https://mozilla.github.io/pdf.js/
- Playwright: https://playwright.dev/docs/intro

> **Nota de versiones:** se documentan comandos con `@latest` para generar el proyecto. Cuando la instalación esté validada, subir al repositorio el `package-lock.json`, el `package.json` definitivo y registrar las versiones exactas. No afirmar que React/Vite u otras dependencias están "instaladas y probadas" hasta ejecutarlas efectivamente en el proyecto.
