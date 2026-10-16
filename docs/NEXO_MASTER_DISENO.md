# NEXO PATRIMONIO — MASTER DE DISEÑO

> **Versión:** 1.0 · **Fecha:** 16 de octubre de 2026  
> **Estado:** Especificación visual de referencia para implementación  
> **Producto:** plataforma privada de seguimiento de inversiones y ahorros personales  
> **Referencia estética:** [Syncore — Framer Marketplace](https://www.framer.com/marketplace/templates/syncore/)  
> **Prototipo aprobado:** `nexo_patrimonio_syncore_demo.html`

---

## 0. Alcance y criterio de fidelidad

Este documento define **solo el lenguaje visual y la experiencia de usuario (UX/UI)**. Mantiene la arquitectura funcional aprobada: **Vista general, Inversiones, Ahorros COP, Ahorros USD, Documentos y Configuración**. La referencia Syncore se utiliza por su dirección de arte: monocromía, contraste, tipografía editorial, bordes finos, precisión de grillas y acento naranja; **no** se debe copiar su código, materiales, imágenes o branding de terceros.

**Prioridades, en este orden:** (1) fidelidad financiera, (2) claridad de la información, (3) facilidad de uso, (4) estética premium, (5) animación. Cualquier adorno que comprometa legibilidad o consistencia debe eliminarse.

**Principios rectores:**

1. **Editorial + financiero:** titulares de carácter editorial, datos con precisión tabular.
2. **Oscuro por defecto:** superficies casi negras, sin gradientes saturados ni efectos neón.
3. **Un solo acento:** naranja cálido como señal de acción/selección; color financiero reservado a estados.
4. **Estructura visible:** separación por contornos de 1 px, ritmo vertical y espacios amplios; sombras mínimas.
5. **Datos con procedencia:** importe, moneda, fecha de corte, origen y estado de conciliación siempre identificables.
6. **Responsive genuino:** arquitectura adaptada a móvil, no reducción de la versión desktop.
7. **Privacidad visual:** nunca mostrar nombre personal, números completos de cuenta, documentos privados o saldos ajenos como texto decorativo.

---

## 1. Identidad visual

### 1.1 Nombre y tono

- **Marca:** `nexo.` en minúsculas, con el punto naranja.
- **Descriptor:** `PATRIMONIO PERSONAL` (mayúsculas, tracking amplio, tipografía monoespaciada).
- **Tono de microcopy:** directo, calmado, claro, no comercial; tratamiento de **tú**.
- **Promesa de interfaz:** "Tus inversiones y ahorros, organizados en un solo lugar".
- **Vocabulario preferido:** Patrimonio registrado, Fuente, Saldo, Extracto, Posiciones, Por conciliar, Última actualización, Valor al corte.
- **Evitar:** crecimiento garantizado, beneficio seguro, rentabilidad no calculada, saldo en vivo cuando es un extracto histórico.

### 1.2 Tokens de color: tema oscuro (principal)

| Token | HEX | Uso |
|---|---|---|
| `--bg` | `#070707` | Fondo general |
| `--shell` | `#0B0B0B` | Sidebar y contenedores de navegación |
| `--card` | `#0D0D0D` | Tarjetas y paneles |
| `--card-2` | `#191919` | Inputs, estados secundarios, superficies elevadas |
| `--stroke` | `#303030` | Bordes, divisores, cuadrícula |
| `--text` | `#F3F0E9` | Cifras y encabezados |
| `--muted` | `#97948E` | Texto secundario |
| `--hover` | `#202020` | Superficie al pasar el cursor |
| `--signal` | `#FF7849` | Acento principal, señal activa, destacados |
| `--positive` | `#B6CEAC` | Estado positivo, nunca único indicador |
| `--warning` | `#FC9A71` | Advertencias y elementos por conciliar |
| `--negative` | `#FB806D` | Deterioro / valor negativo |

**Uso del color:** 75–85 % fondo/superficies neutras; 10–20 % tipografía y bordes; **menos de 5 %** naranja como elemento de dirección. Las cifras de depósitos o variaciones no deben colorearse por intuición: el color expresa estados semánticos confirmados.

### 1.3 Tokens de color: tema claro (secundario)

| Token | HEX | Uso |
|---|---|---|
| `--bg` | `#F5F3EF` | Fondo |
| `--shell` | `#ECEAE5` | Sidebar |
| `--card` | `#FFFEFB` | Paneles |
| `--card-2` | `#E9E7E1` | Controles |
| `--stroke` | `#D4D0C8` | Bordes |
| `--text` | `#1B1A18` | Texto principal |
| `--muted` | `#69665F` | Texto secundario |
| `--hover` | `#E9E7E2` | Hover |
| `--signal` | `#D7542B` | Acento accesible sobre claro |
| `--positive` | `#3B6650` | Estado positivo |
| `--warning` | `#B15C35` | Advertencia |
| `--negative` | `#B63E34` | Estado negativo |

> Ambos temas conservan jerarquía visual y semántica. No basta con invertir colores: revisar gráficos, líneas y contrastes de estados.

### 1.4 Paleta de representación de las tres fuentes

- **Inversiones:** marfil `#EEE9DE` en oscuro; grafito `#34312C` en claro.
- **Ahorros COP:** gris cálido `#77746E` en oscuro; gris `#A29E96` en claro.
- **Ahorros USD:** naranja `#FF7849` en oscuro; naranja profundo `#D7542B` en claro.
- Usar **también** nombres y porcentajes; el color no debe ser la única codificación.

### 1.5 Tipografía

| Función | Familia | Peso | Tamaño recomendado |
|---|---|---:|---|
| Titular principal desktop | Georgia / serif editorial compatible | 400 | 48–53 px, line-height 1.1 |
| Titular principal móvil | Georgia / serif editorial compatible | 400 | 34–44 px |
| Patrimonio total desktop | Georgia / serif editorial compatible | 400 | 42–63 px |
| Valor de tarjeta | Georgia / serif editorial compatible | 400 | 25–34 px |
| Texto de aplicación | Inter / system sans | 400–650 | 12–14 px |
| Encabezado de panel | Inter | 600–650 | 13–15 px |
| Metadatos / ticker / fechas | SFMono-Regular / Consolas / monospace | 400–600 | 9–11 px |
| Etiquetas superiores | Monospace, uppercase | 500–600 | 9–10 px; tracking 1–1.7 px |

**Números:** activar `font-variant-numeric: tabular-nums`. Separar la unidad monetaria del valor en formatos de resumen cuando mejore la lectura. El texto de accesibilidad deberá leer la moneda completa.

### 1.6 Espaciado, radios y contornos

- Retícula base: **4 px**; distancias recurrentes: 8, 12, 16, 20, 24, 32, 40 y 48 px.
- Sidebar desktop: **247 px**. Main: máximo aproximado **1700 px**.
- Panel: padding **22–24 px**; separación entre paneles **16 px**.
- Tarjeta héroe: padding **30–34 px**; altura visual mínima de ~182 px.
- Bordes: `1px solid var(--stroke)`; divisores discretos.
- Radios: controles **4–5 px**, paneles **6–7 px**, modal **6 px**, etiquetas **3–4 px**. Evitar tarjetas excesivamente redondeadas.
- Sombras: ausentes o muy suaves; priorizar contraste de planos.
- Patrón decorativo permitido: retícula de puntos extremadamente tenue, limitada a la tarjeta de patrimonio (sin distraer).

### 1.7 Variables CSS de referencia

```css
:root {
  --bg: #070707;
  --shell: #0b0b0b;
  --card: #0d0d0d;
  --card-2: #191919;
  --stroke: #303030;
  --text: #f3f0e9;
  --muted: #97948e;
  --hover: #202020;
  --signal: #ff7849;
  --positive: #b6ceac;
  --warning: #fc9a71;
  --negative: #fb806d;
  --font-editorial: Georgia, 'Times New Roman', serif;
  --font-interface: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-data: 'SFMono-Regular', Consolas, monospace;
}
:root[data-theme='light'] {
  --bg: #f5f3ef; --shell: #eceae5; --card: #fffefb;
  --card-2: #e9e7e1; --stroke: #d4d0c8; --text: #1b1a18;
  --muted: #69665f; --hover: #e9e7e2; --signal: #d7542b;
  --positive: #3b6650; --warning: #b15c35; --negative: #b63e34;
}
```

---

## 2. Layout e interacción

### 2.1 Shell desktop (≥ 951 px)

- Sidebar izquierda fija/pegajosa, 247 px, con logo, navegación y bloque de privacidad.
- Área de contenido centrada, adaptable con padding lateral `clamp(20px, 3.3vw, 54px)`.
- Franja superior técnica de 31 px con descriptor y estado general.
- Toolbar de 67 px con breadcrumbs, estado del producto, cambio de tema y configuración.
- Página: eyebrow de sección, titular editorial y descripción breve; CTA arriba a la derecha.
- Dashboard: héroe de ancho completo → franja de tres métricas → dos paneles de análisis → actividad e insights.

### 2.2 Tablet (651–950 px)

- Sidebar compacta ~75 px, solo íconos con `aria-label`/tooltip.
- Paneles principales apilados si se compromete legibilidad.
- Tablas con desplazamiento horizontal dentro de su propio contenedor.
- No truncar cantidades relevantes ni crear scroll horizontal del `body`.

### 2.3 Móvil (≤ 650 px)

- Ocultar sidebar; usar navegación inferior fija con safe-area.
- Cabecera breve y CTA de ancho completo.
- Héroe vertical con conversión de moneda accesible.
- Métrica de inversiones a ancho completo; ahorros COP y USD en dos columnas si caben; bajo ~360 px, apilar.
- Gráficos, distribución e insights en una columna.
- Tablas: permitir scroll local o tarjetas por posición (priorizar ticker, valor, porcentaje y fecha).
- Zona táctil recomendada: al menos **44 × 44 px** para acciones principales.
- Evitar hover como único medio para descubrir información.

### 2.4 Reglas de estados

Todo componente de datos debe contemplar: **sin datos**, **cargando**, **con datos**, **error**, **información desactualizada** y **requiere conciliación**. Nunca reemplazar `0` por `—` salvo que el dato sea desconocido, y nunca reemplazar "sin información" por un cero si no se ha registrado una fuente.

---

## 3. Catálogo de componentes (contratos UI)

| Componente | Elementos mínimos | Interacción/estado |
|---|---|---|
| `AppShell` | Sidebar, breadcrumbs, toolbar, bottom-nav móvil | Navegación activa, atajos, accesibilidad |
| `PageHeading` | Eyebrow, título, descripción, CTA | Variantes por módulo |
| `PatrimonyHero` | Total, moneda, etiqueta PARCIAL/COMPLETO, fuente/fecha | Cambio de moneda con TRM visible |
| `MetricStrip` | Inversiones, Ahorros COP, Ahorros USD | Valor, moneda, fuente, fecha, estado |
| `AllocationDonut` | Dona, leyenda, proporciones | Filtros y tooltip accesible |
| `SnapshotEvolution` | Valores documentados por fecha | No interpolar rendimientos ficticios |
| `AccountSourceCard` | Nombre de fuente, tipo, saldo, fecha | Ver detalle, editar o archivar |
| `HoldingsTable` | Ticker, nombre, cantidad, precio/valor, peso | Buscar, ordenar, filtrar, responsive |
| `PositionBar` | Posición, porcentaje, barra | Muestra concentración real |
| `MovementRow` | Tipo, fecha, importe y moneda, fuente | Confirmar, excluir o conciliar |
| `InsightCard` | Hallazgo, explicación, evidencia y CTA | Disclaimers cuando sea estimación |
| `FileDropzone` | Carga PDF/CSV, extensiones, peso máximo | Progreso, error, validación |
| `ImportReview` | Previos vs. nuevos, diferencias, duplicados | **Confirmación antes de guardar** |
| `FxControl` | Moneda base, tasa, origen, fecha | Editar tasa manual o fuente oficial |
| `ThemeToggle` | Oscuro / claro | Persistir preferencia |
| `EmptyState` | Explicación breve y acción | No inventar saldos iniciales |
| `StatusBadge` | Confirmado / Pendiente / Rechazado / Histórico | Texto + icono + color semántico |
| `PrivacyMask` | Importes y datos sensibles ocultables | Ocultar/mostrar, persistencia opcional |

**Button:** primario marfil sobre negro, hover naranja; secundario transparente con borde; peligro reservado a eliminación; CTA máximo uno por bloque.  
**Inputs:** fondo `--card-2`, borde `--stroke`, label superior, helper/error debajo, foco visible con `--signal`.  
**Charts:** fondo discreto, gridline punteada y etiquetas reales; gráfico nunca sustituye la tabla de valores de origen.  
**Toast:** confirma operaciones locales y sincrónicas; para procesamiento de documentos, indicar estado de trabajo explícito.  
**Modal/Sheet:** formularios cortos, foco administrado, Escape cierra y retorno del foco al elemento activador.

---

## 4. Arquitectura de vistas

### 4.1 Vista general (dashboard)

**Objetivo:** responder en 10 segundos "¿cuánto tengo, dónde está y con qué grado de actualización?".

Orden visual:

1. `PageHeading`: "Tu panorama financiero".
2. `PatrimonyHero`: patrimonio registrado con estado **PARCIAL** mientras falten fuentes.
3. Tres KPIs de inversiones, ahorros COP y ahorros USD.
4. `SnapshotEvolution` de saldos históricos (sin atribuir variación a rendimiento).
5. `AllocationDonut` por categoría (inversión / COP / USD).
6. `MovementRow` para pendientes de conciliar.
7. `InsightCard` con exposición, fechas vencidas, movimientos no conciliados.

**No hacer:** agregar efectivo interno de Hapi nuevamente como ahorro USD; sumar depósitos sin conciliación; rotular variaciones de patrimonio como ganancias de inversión.

### 4.2 Inversiones

1. Resumen total por plataforma y fecha de corte.
2. Tarjetas de fuente (por ejemplo, Hapi) y composición por instrumento.
3. Tabla de posiciones con buscador, orden y filtro.
4. Insights de concentración y solapamiento; fuente del precio/fecha visible.
5. Acceso a extractos y movimientos asociados.

**Ejemplo validado de Hapi al 30/09/2026:** valor total **USD 2.308,53**, compuesto por valores **USD 2.041,43** y efectivo interno **USD 267,10**. Existen **25 posiciones bursátiles**. Todos son **datos históricos de ejemplo de la fuente proporcionada**, no valores actuales del mercado.

### 4.3 Ahorros en COP

- Valor agregado en COP; listado de fuentes independientes: cuentas, bolsillos, CDT u otras.
- Registrar nombre, saldo, fecha del saldo, institución opcional y documento opcional.
- El estado inicial es **SIN CUENTAS REGISTRADAS** (no confundir con patrimonio cero).
- Balance por fuente, metas de ahorro y cambios documentados cuando existan.

### 4.4 Ahorros en USD

- Igual patrón visual que COP para crear predictibilidad.
- **No** duplicar el efectivo de una inversión si está incluido en el saldo total de esa plataforma.
- Permitir USD externo manual, plataforma de origen, fecha, observaciones.

### 4.5 Documentos

- Área de carga (PDF/CSV, otros formatos solo cuando se habiliten).
- Lista de documentos con fuente, período, fecha de carga y estado.
- Flujo visual: **archivo → lectura → detección de datos → comparación → revisión → confirmación → actualización**.
- Panel para detectar **períodos superpuestos, registros repetidos y discrepancias**.
- No declarar "importado correctamente" hasta validar y guardar; el demo HTML actual **solo registra nombres** para archivos nuevos.

### 4.6 Configuración

- Moneda de visualización (`USD` / `COP`) y TRM/tasa vigente con origen.
- Tema claro/oscuro y preferencia de privacidad.
- Gestión de fuentes, fechas y alertas de desactualización.
- Importación/exportación personal y respaldos (cuando se implemente).

---

## 5. Reglas especiales de visualización financiera

1. **Tres cifras distintas:** saldo de mercado, aportes netos y rentabilidad deben modelarse/mostrarse por separado.
2. **Tres fechas distintas:** fecha de movimiento, fecha de valoración y fecha de importación no son equivalentes.
3. **No duplicidad:** efectivo dentro de una cuenta de inversión forma parte de esa cuenta y no de otra categoría.
4. **Patrimonio parcial:** la ausencia de cuentas COP/USD no significa saldo 0 confirmado.
5. **Importaciones idempotentes:** repetir un extracto no suma dos veces el valor al corte.
6. **Conversión:** mostrar `tipo de cambio + fuente + fecha`, permitir comparación nominal y en moneda consolidada.
7. **Cifras sensibles:** nunca incluir datos de identificación personal ni números completos de cuenta en ejemplos o imágenes públicas.
8. **Insights auditables:** cada insight debe permitir descubrir qué cifras lo sustentan.
9. **Gráficos honestos:** dos snapshots son dos puntos, no una serie diaria observada; si hay interpolación, etiquetarla.
10. **Terminología:** "estimado" y "no actualizado" deben verse sin entrar a detalle.

**Movimientos de ejemplo pendientes:** tres depósitos de octubre de 2026 por USD 45 + USD 30 + USD 225 (**USD 300**) se mantienen fuera del total hasta su conciliación con la cuenta y un corte posterior.

---

## 6. Motion y microinteracciones

- Duración: hover **120–180 ms**, aparición de vistas **180–240 ms**, carga/confirmación **200–300 ms**.
- Easing recomendado: `cubic-bezier(.2,.8,.2,1)` para interacción; no animaciones permanentes.
- Animar solo estados auténticos: cambio de sección, apertura de modal, actualización confirmada, expansión de insight.
- Respetar `prefers-reduced-motion: reduce`.
- Evitar contadores que aparenten cotizaciones en vivo si el dato es estático.

---

## 7. Accesibilidad, privacidad y QA visual

### Reglas mínimas

- Objetivo: **WCAG 2.2 AA** para controles críticos (verificar contrastes reales; no presumir que cada combinación pasa).
- Foco visible y navegación completa por teclado.
- Gráficas con resumen textual y tabla subyacente.
- Iconos siempre con etiqueta accesible; moneda + número leídos correctamente.
- `aria-live` para resultados de importación/conciliación, sin anuncios excesivos.
- Tooltips no deben contener datos indispensables exclusivamente.
- Modo claro, modo oscuro y móvil: igual cobertura funcional.
- En escenarios de compartición de pantalla, opción de ocultar saldos.

### Matriz de revisión responsive

| Viewport | Verificar |
|---|---|
| 360 × 800 | Unidades monetarias sin truncamiento, bottom-nav y CTA |
| 390 × 844 | Dashboard y panel de inversiones con controles táctiles |
| 768 × 1024 | Sidebar compacta, tablas y tarjetas adaptativas |
| 1280 × 800 | Jerarquía completa, dos columnas de análisis |
| 1440 × 900 | Proporciones y blancos apropiados |
| 1920 × 1080 | Ancho máximo y lectura cómoda |

### Criterios de aceptación visual

- [ ] La interfaz mantiene el lenguaje Syncore reinterpretado, sin parecer un clon de marketing.
- [ ] Las seis vistas emplean la **misma** escala tipográfica, espaciado, contornos y componentes.
- [ ] Los saldos corresponden a la fuente y a su fecha, y las cuentas faltantes aparecen como faltantes.
- [ ] Se puede navegar, filtrar, añadir, confirmar y consultar desde móvil.
- [ ] Tema claro y oscuro comparten semántica y jerarquía.
- [ ] No hay datos sensibles, imágenes de usuarios reales ni credenciales en mockups.
- [ ] La pantalla usa estados de carga, vacío, error, histórico y por conciliar.
- [ ] No se muestran rendimientos ficticios ni duplicados de efectivo.

---

## 8. Archivos de referencia y handoff

| Archivo | Uso |
|---|---|
| `NEXO_MASTER_DISENO.md` | Fuente canónica de diseño |
| `NEXO_STACK_INSTALACION.md` | Arquitectura y preparación técnica |
| `NEXO_VISTAS_CLAVE.png` | Referencia de layout general/responsive |
| `NEXO_COMPONENTES_CLAVE.png` | Referencia de estilo para componentes |
| `nexo_patrimonio_syncore_demo.html` | Comportamiento del prototipo anterior; no es la arquitectura definitiva de React |

**Regla para implementadores / agentes:** antes de escribir código, leer ambos `.md`, revisar el HTML de referencia y construir un mapa de componentes reutilizables. El rediseño **no autoriza cambios a la contabilidad, categorías, importación o políticas de privacidad**. Si diseño y fidelidad de datos entran en conflicto, gana la fidelidad de datos.

### Fuentes de inspiración y documentación

- Framer Marketplace — Syncore: https://www.framer.com/marketplace/templates/syncore/
- Tailwind CSS (Vite): https://tailwindcss.com/docs/installation/using-vite
- shadcn/ui (Vite): https://ui.shadcn.com/docs/installation/vite
- Recharts: https://recharts.org/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

*Este documento especifica el diseño propio de Nexo Patrimonio; no concede derechos de uso sobre elementos con licencia de la plantilla Syncore.*
