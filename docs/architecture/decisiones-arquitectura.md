# Nexo Patrimonio — Registro de Decisiones de Arquitectura (ADRs)

**Versión:** 1.0  
**Fecha:** 16 de octubre de 2026  
**Estado:** Aprobado e Implementado

---

## ADR 01: Selección de SPA con React 19 + TypeScript + Vite frente a Next.js

- **Contexto:** Nexo Patrimonio es una plataforma privada de gestión patrimonial personal. No requiere indexación por motores de búsqueda (SEO) ni renderizado en servidor (SSR).
- **Decisión:** Implementar una Single Page Application (SPA) cliente pura con React 19, TypeScript estricto y Vite.
- **Consecuencias Positivas:** Tiempos de compilación ultrarrápidos (<1s), empaquetado mínimo (chunk de aplicación de solo 80 kB), cero costo de cómputo en servidor, facilidad para desplegar en GitHub Pages o almacenamiento estático.
- **Riesgos Mitigados:** Se eliminó la sobreingeniería de microservicios y servidores Node.js dedicados innecesarios.

---

## ADR 02: Aritmética Monetaria con Decimal.js y Tipos Postgres Numeric

- **Contexto:** Los cálculos financieros con coma flotante binaria nativa (`IEEE 754`) en JavaScript introducen errores de precisión (ej. `0.1 + 0.2 !== 0.3`).
- **Decisión:** Todas las agregaciones, conversiones TRM y balances se calculan exclusivamente mediante `Decimal.js` en frontend y tipos `numeric(18,2)` y `numeric(18,6)` en PostgreSQL.
- **Consecuencias Positivas:** Se garantiza la igualdad estricta `2041.43 + 267.10 === 2308.53` en pruebas y en interfaz.

---

## ADR 03: Política de No Duplicidad de Efectivo y Movimientos Pendientes

- **Contexto:** Las cuentas de broker como Hapi incluyen tanto activos bursátiles como saldo no invertido (efectivo interno).
- **Decisión:** El efectivo interno se atribuye como atributo de la cuenta de inversión (`accounts.internal_cash`). Bajo ninguna circunstancia se suma a la categoría de Ahorros USD. Asimismo, movimientos no conciliados se mantienen con estado `pending` fuera del balance confirmado.
- **Consecuencias Positivas:** Fidelidad contable honesta, prevención de inflación artificial del patrimonio.

---

## ADR 04: Estrategia de Doble Repositorio (Producción vs Demo)

- **Contexto:** Se requiere mostrar el artefacto interactivo y la arquitectura sin comprometer datos financieros privados.
- **Decisión:** Dos repositorios GitHub físicamente independientes:
  1. `The-SnitchLg/nexo-patrimonio` (Privado): Aplicación productiva con Supabase y datos reales.
  2. `The-SnitchLg/nexo-patrimonio-demo` (Público): Artefacto interactivo demostrativo con datos sintéticos para GitHub Pages.
- **Consecuencias Positivas:** Aislamiento total de credenciales y privacidad garantizada.
