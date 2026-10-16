# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 665 nodes · 1445 edges · 30 communities (27 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b7b9b46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useFinance
- validate_data.py
- DesignSystemGenerator
- search
- _select_palette_for_mode
- package.json
- finance.ts
- core.py
- design_system.py
- test_design_system_mode.py
- compilerOptions
- BM25
- csv
- test_relevance_evaluator.py
- dependencies
- compilerOptions
- CatalogRefreshTest
- detect_domain
- _get_bm25
- devDependencies
- test_core.py
- format_ascii_box
- _search_csv_detailed
- generate_design_system
- verify-app.mjs
- _row_identities
- .oxlintrc.json
- scripts
- vite.config.ts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `useFinance()` - 45 edges
2. `search()` - 43 edges
3. `DesignSystemGenerator` - 35 edges
4. `search_stack()` - 35 edges
5. `react` - 27 edges
6. `formatUSD()` - 25 edges
7. `compilerOptions` - 19 edges
8. `BM25` - 18 edges
9. `detect_domain()` - 18 edges
10. `lucide-react` - 18 edges

## Surprising Connections (you probably didn't know these)
- `TestBm25CoreBehavior` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/core.py
- `TestEndToEndCoherence` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `AccountSourcesListProps` --references--> `AccountType`  [EXTRACTED]
  src/components/finance/AccountSourcesList.tsx → src/types/finance.ts
- `AddAccountModalProps` --references--> `AccountType`  [EXTRACTED]
  src/components/modals/AddAccountModal.tsx → src/types/finance.ts
- `ImportReviewModalProps` --references--> `ExtractedStatementData`  [EXTRACTED]
  src/components/documents/ImportReviewModal.tsx → src/domain/reconciliation.ts

## Import Cycles
- None detected.

## Communities (30 total, 3 thin omitted)

### Community 0 - "useFinance"
Cohesion: 0.09
Nodes (55): decimal.js, lucide-react, react, react-dom, recharts, vitest, App(), MainRouter() (+47 more)

### Community 1 - "validate_data.py"
Cohesion: 0.06
Nodes (44): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, TestGeneratedCatalogContract, _catalog_date(), _check_app_interface_contract() (+36 more)

### Community 2 - "DesignSystemGenerator"
Cohesion: 0.06
Nodes (13): DesignSystemGenerator, _resolve_dial(), apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), TestReasoningMatch, read_rows() (+5 more)

### Community 3 - "search"
Cohesion: 0.05
Nodes (12): _exact_stack_identifier(), search(), search_stack(), _style_search_destination(), TestDiagnosticsContracts, TestSearchDomains, _rows(), TestNativeDesktopStackFreshness (+4 more)

### Community 4 - "_select_palette_for_mode"
Cohesion: 0.11
Nodes (8): _contrast_ratio(), _derive_dark_palette(), _palette_is_dark(), _relative_luminance(), _select_palette_for_mode(), TestEndToEndCoherence, TestLuminance, TestPaletteSelection

### Community 5 - "package.json"
Cohesion: 0.08
Nodes (23): name, private, type, version, clsx, date-fns, @hookform/resolvers, jsdom (+15 more)

### Community 6 - "finance.ts"
Cohesion: 0.18
Nodes (19): @supabase/supabase-js, FinanceContext, FinanceContextType, FinanceProvider(), getInitialStorage(), INITIAL_DOCS, INITIAL_MOVEMENTS, calculateTotals() (+11 more)

### Community 7 - "core.py"
Cohesion: 0.12
Nodes (12): _contains_phrase(), _exact_match_diagnostic(), _legacy_successor_guidance(), _normalize(), _passes_threshold(), _project_row(), _query_coverage(), _rewrite_query_for_domain() (+4 more)

### Community 8 - "design_system.py"
Cohesion: 0.13
Nodes (7): _detect_page_type(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), persist_design_system(), safe_slug(), format_output()

### Community 9 - "test_design_system_mode.py"
Cohesion: 0.14
Nodes (6): _filter_anti_patterns_for_mode(), _query_wants_dark(), _resolve_color_mode(), _style_is_dark_primary(), TestAntiPatternGating, TestModeResolution

### Community 10 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 11 - "BM25"
Cohesion: 0.18
Nodes (3): BM25, _suggest_identities(), TestTokenizer

### Community 12 - "csv"
Cohesion: 0.17
Nodes (3): read_rows(), read_rows(), TestTextLayoutDataContracts

### Community 13 - "test_relevance_evaluator.py"
Cohesion: 0.12
Nodes (3): TestFixtureValidation, TestMetricMath, TestThresholdGate

### Community 14 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 15 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 18 - "_get_bm25"
Cohesion: 0.19
Nodes (7): _domain_keywords(), _file_signature(), _get_bm25(), _load_csv(), _load_csv_snapshot(), _load_product_keywords(), _load_rows_or_empty()

### Community 19 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 21 - "format_ascii_box"
Cohesion: 0.22
Nodes (4): ansi_ljust(), format_ascii_box(), hex_to_ansi(), section_header()

### Community 22 - "_search_csv_detailed"
Cohesion: 0.29
Nodes (3): _search_csv(), _search_csv_detailed(), TestBm25CoreBehavior

### Community 23 - "generate_design_system"
Cohesion: 0.29
Nodes (3): format_markdown(), generate_design_system(), TestPersistence

### Community 24 - "verify-app.mjs"
Cohesion: 0.29
Nodes (3): @playwright/test, SCREENSHOTS_DIR, VIEWPORTS

### Community 25 - "_row_identities"
Cohesion: 0.33
Nodes (3): _exact_row_identity(), _row_identities(), _style_identity()

### Community 26 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 27 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 28 - "vite.config.ts"
Cohesion: 0.40
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 29 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **19 isolated node(s):** `clsx`, `date-fns`, `@hookform/resolvers`, `jsdom`, `motion` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 232 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `DesignSystemGenerator`, `core.py`, `design_system.py`, `BM25`, `csv`, `detect_domain`, `_get_bm25`, `test_core.py`, `_search_csv_detailed`, `_row_identities`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `@hookform/resolvers` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useFinance` be split into smaller, more focused modules?**
  _Cohesion score 0.08835341365461848 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `_select_palette_for_mode`, `design_system.py`, `test_design_system_mode.py`, `test_core.py`, `generate_design_system`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06455399061032864 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search` to `core.py`, `design_system.py`, `csv`, `_get_bm25`, `test_core.py`, `_search_csv_detailed`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._