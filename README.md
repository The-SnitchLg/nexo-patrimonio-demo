# nexo. — Patrimonio Personal

Plataforma privada y responsive de gestión financiera personal para el seguimiento riguroso de inversiones, ahorros en COP y USD, trazabilidad documental y reconciliación patrimonial.

Diseñada bajo un lenguaje visual **editorial financiero** (inspirado en la dirección de arte de Syncore): monocromático por defecto, números tabulares exactos, tipografía Georgia / Inter / SFMono y acento naranja cálido (`#FF7849`).

---

## 1. Principios y Reglas Contables

1. **Fidelidad y No Duplicidad:** El efectivo interno de una cuenta de inversión (ej. USD 267,10 en Hapi) forma parte de la cuenta de inversión y **nunca se suma** a la categoría de Ahorros USD.
2. **Conciliación Estricta:** Los movimientos o depósitos pendientes (ej. USD 300 en depósitos recientes) se mantienen en estado **POR CONCILIAR** y no se integran al patrimonio confirmado hasta su verificación oficial.
3. **Aritmética Decimal Segura:** Todos los cálculos monetarios utilizan `Decimal.js` en el cliente y tipos `numeric(18,2)` / `numeric(18,6)` en PostgreSQL, previniendo errores de punto flotante binario.
4. **Privacidad Total (Zero-Trust):** Todos los datos están aislados por usuario mediante **Row Level Security (RLS)** en Supabase. Cero exposición de datos personales o credenciales.

---

## 2. Pila Tecnológica (Stack)

- **Frontend:** React 19, TypeScript estricto, Vite 6+.
- **Estilos & Diseño:** Tailwind CSS v4, tokens de diseño en `src/index.css`, Lucide Icons.
- **Gráficos & Visualización:** Recharts, TanStack Table v9.
- **Formularios & Validación:** React Hook Form + Zod.
- **Cálculo Monetario:** Decimal.js + `Intl.NumberFormat('es-CO')`.
- **Backend & Seguridad:** Supabase (PostgreSQL 17, Supabase Auth con email/contraseña, RLS en todas las tablas, Storage privado con acceso restringido).
- **Calidad & Testing:** Oxlint (linter de alto rendimiento), Vitest, Playwright.

---

## 3. Instalación y Ejecución Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno locales
cp .env.example .env.local
# Editar .env.local con las credenciales privadas de Supabase

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Análisis estático (linter)
npm run lint

# 5. Pruebas unitarias
npm test

# 6. Compilar para producción
npm run build
```

---

## 4. Estructura de Repositorios

- **Nexo Production (Privado):** `The-SnitchLg/nexo-patrimonio` — Aplicación productiva privada conectada a Supabase con datos patrimoniales reales.
- **Nexo Artifact (Público):** `The-SnitchLg/nexo-patrimonio-demo` — Prototipo interactivo autónomo con datos sintéticos para demostración en GitHub Pages.

---

## 5. Licencia y Créditos

Proyecto privado de gestión patrimonial desarrollado con la orquestación de Antigravity AI.
