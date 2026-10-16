# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 656 nodes · 1412 edges · 35 communities (27 shown, 8 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3a8b4766`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- validate_data.py
- useFinance
- DesignSystemGenerator
- core.py
- finance.ts
- package.json
- design_system.py
- search
- CatalogRefreshTest
- compilerOptions
- BM25
- search_stack
- dependencies
- compilerOptions
- _palette_is_dark
- detect_domain
- test_design_system_mode.py
- _get_bm25
- _select_palette_for_mode
- devDependencies
- test_relevance_evaluator.py
- csv
- TestNativeDesktopStackFreshness
- test_text_layout_resilience.py
- format_ascii_box
- _search_csv_detailed
- generate_design_system
- _filter_anti_patterns_for_mode
- TestThresholdGate
- verify-app.mjs
- test_core.py
- .oxlintrc.json
- scripts
- vite.config.ts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `useFinance()` - 43 edges
2. `search()` - 43 edges
3. `DesignSystemGenerator` - 35 edges
4. `search_stack()` - 35 edges
5. `react` - 26 edges
6. `formatUSD()` - 23 edges
7. `compilerOptions` - 19 edges
8. `BM25` - 18 edges
9. `detect_domain()` - 18 edges
10. `lucide-react` - 17 edges

## Surprising Connections (you probably didn't know these)
- `TestBm25CoreBehavior` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/core.py
- `TestEndToEndCoherence` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `AccountSourcesListProps` --references--> `AccountType`  [EXTRACTED]
  src/components/finance/AccountSourcesList.tsx → src/types/finance.ts
- `AddAccountModalProps` --references--> `AccountType`  [EXTRACTED]
  src/components/modals/AddAccountModal.tsx → src/types/finance.ts
- `TestTokenizer` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/core.py

## Import Cycles
- None detected.

## Communities (35 total, 8 thin omitted)

### Community 0 - "validate_data.py"
Cohesion: 0.07
Nodes (43): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, TestGeneratedCatalogContract, _catalog_date(), _check_app_interface_contract() (+35 more)

### Community 1 - "useFinance"
Cohesion: 0.12
Nodes (42): lucide-react, react, recharts, App(), MainRouter(), AllocationDonut(), EVOLUTION_DATA, SnapshotEvolution() (+34 more)

### Community 2 - "DesignSystemGenerator"
Cohesion: 0.06
Nodes (13): DesignSystemGenerator, apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), TestReasoningMatch, read_rows(), split_values() (+5 more)

### Community 3 - "core.py"
Cohesion: 0.09
Nodes (16): _contains_phrase(), _exact_match_diagnostic(), _exact_row_identity(), _legacy_successor_guidance(), _normalize(), _passes_threshold(), _project_row(), _query_coverage() (+8 more)

### Community 4 - "finance.ts"
Cohesion: 0.13
Nodes (24): @supabase/supabase-js, vitest, FinanceContext, FinanceContextType, FinanceProvider(), getInitialStorage(), INITIAL_DOCS, INITIAL_MOVEMENTS (+16 more)

### Community 5 - "package.json"
Cohesion: 0.08
Nodes (25): name, private, type, version, clsx, date-fns, decimal.js, @hookform/resolvers (+17 more)

### Community 6 - "design_system.py"
Cohesion: 0.11
Nodes (8): _detect_page_type(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), persist_design_system(), _resolve_dial(), safe_slug(), format_output()

### Community 7 - "search"
Cohesion: 0.14
Nodes (3): search(), TestSearchDomains, TestStyleTaxonomy

### Community 9 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 10 - "BM25"
Cohesion: 0.18
Nodes (3): BM25, _suggest_identities(), TestTokenizer

### Community 11 - "search_stack"
Cohesion: 0.16
Nodes (4): _exact_stack_identifier(), search_stack(), _rows(), TestWebStackFreshness

### Community 12 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 13 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 14 - "_palette_is_dark"
Cohesion: 0.18
Nodes (4): _palette_is_dark(), _relative_luminance(), TestEndToEndCoherence, TestLuminance

### Community 16 - "test_design_system_mode.py"
Cohesion: 0.21
Nodes (4): _query_wants_dark(), _resolve_color_mode(), _style_is_dark_primary(), TestModeResolution

### Community 17 - "_get_bm25"
Cohesion: 0.19
Nodes (7): _domain_keywords(), _file_signature(), _get_bm25(), _load_csv(), _load_csv_snapshot(), _load_product_keywords(), _load_rows_or_empty()

### Community 18 - "_select_palette_for_mode"
Cohesion: 0.22
Nodes (4): _contrast_ratio(), _derive_dark_palette(), _select_palette_for_mode(), TestPaletteSelection

### Community 19 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 23 - "test_text_layout_resilience.py"
Cohesion: 0.20
Nodes (3): read_rows(), TestTextLayoutDataContracts, TestTextLayoutRetrieval

### Community 24 - "format_ascii_box"
Cohesion: 0.22
Nodes (4): ansi_ljust(), format_ascii_box(), hex_to_ansi(), section_header()

### Community 25 - "_search_csv_detailed"
Cohesion: 0.29
Nodes (3): _search_csv(), _search_csv_detailed(), TestBm25CoreBehavior

### Community 26 - "generate_design_system"
Cohesion: 0.29
Nodes (3): format_markdown(), generate_design_system(), TestPersistence

### Community 29 - "verify-app.mjs"
Cohesion: 0.29
Nodes (3): @playwright/test, SCREENSHOTS_DIR, VIEWPORTS

### Community 31 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 32 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 33 - "vite.config.ts"
Cohesion: 0.40
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 34 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **19 isolated node(s):** `clsx`, `date-fns`, `@hookform/resolvers`, `jsdom`, `motion` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 230 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `DesignSystemGenerator`, `core.py`, `design_system.py`, `BM25`, `detect_domain`, `_get_bm25`, `csv`, `test_text_layout_resilience.py`, `_search_csv_detailed`, `test_core.py`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `@hookform/resolvers` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06559356136820925 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `design_system.py`, `_palette_is_dark`, `test_design_system_mode.py`, `_select_palette_for_mode`, `generate_design_system`, `test_core.py`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Should `useFinance` be split into smaller, more focused modules?**
  _Cohesion score 0.11940298507462686 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search_stack` to `core.py`, `design_system.py`, `search`, `_get_bm25`, `csv`, `TestNativeDesktopStackFreshness`, `test_text_layout_resilience.py`, `_search_csv_detailed`, `test_core.py`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._