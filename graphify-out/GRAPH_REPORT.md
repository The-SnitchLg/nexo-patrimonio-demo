# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 670 nodes · 1457 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `67f352f0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useFinance
- DesignSystemGenerator
- validate_data.py
- design_system.py
- test_design_system_mode.py
- BM25
- finance.ts
- core.py
- search_stack
- package.json
- search
- compilerOptions
- detect_domain
- dependencies
- compilerOptions
- CatalogRefreshTest
- csv
- devDependencies
- test_text_layout_resilience.py
- TestThresholdGate
- verify-app.mjs
- _load_csv
- .oxlintrc.json
- scripts
- vite.config.ts
- TestMetricMath
- tsconfig.json
- TestFixtureValidation
- TestDiagnosticsContracts

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
- `TestEndToEndCoherence` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `AccountSourcesListProps` --references--> `AccountType`  [EXTRACTED]
  src/components/finance/AccountSourcesList.tsx → src/types/finance.ts
- `AddAccountModalProps` --references--> `AccountType`  [EXTRACTED]
  src/components/modals/AddAccountModal.tsx → src/types/finance.ts
- `TestReasoningMatch` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `TestReasoningContract` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "useFinance"
Cohesion: 0.10
Nodes (50): lucide-react, react, recharts, vitest, App(), MainRouter(), AllocationDonut(), EVOLUTION_DATA (+42 more)

### Community 1 - "DesignSystemGenerator"
Cohesion: 0.06
Nodes (14): DesignSystemGenerator, apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), TestReasoningMatch, read_rows(), split_values() (+6 more)

### Community 2 - "validate_data.py"
Cohesion: 0.07
Nodes (42): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, _catalog_date(), _check_app_interface_contract(), _check_catalog_contract() (+34 more)

### Community 3 - "design_system.py"
Cohesion: 0.06
Nodes (16): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides() (+8 more)

### Community 4 - "test_design_system_mode.py"
Cohesion: 0.07
Nodes (14): _contrast_ratio(), _derive_dark_palette(), _filter_anti_patterns_for_mode(), _palette_is_dark(), _query_wants_dark(), _relative_luminance(), _resolve_color_mode(), _select_palette_for_mode() (+6 more)

### Community 5 - "BM25"
Cohesion: 0.10
Nodes (9): BM25, _file_signature(), _get_bm25(), _load_csv_snapshot(), _search_csv(), _search_csv_detailed(), _suggest_identities(), TestBm25CoreBehavior (+1 more)

### Community 6 - "finance.ts"
Cohesion: 0.13
Nodes (25): decimal.js, @supabase/supabase-js, ImportReviewModalProps, FinanceContext, FinanceContextType, FinanceProvider(), getInitialStorage(), INITIAL_DOCS (+17 more)

### Community 7 - "core.py"
Cohesion: 0.09
Nodes (15): _exact_match_diagnostic(), _exact_row_identity(), _exact_stack_identifier(), _legacy_successor_guidance(), _normalize(), _passes_threshold(), _project_row(), _query_coverage() (+7 more)

### Community 8 - "search_stack"
Cohesion: 0.12
Nodes (5): search_stack(), _rows(), TestNativeDesktopStackFreshness, _rows(), TestWebStackFreshness

### Community 9 - "package.json"
Cohesion: 0.08
Nodes (24): name, private, type, version, clsx, date-fns, @hookform/resolvers, jsdom (+16 more)

### Community 10 - "search"
Cohesion: 0.14
Nodes (3): search(), TestSearchDomains, TestStyleTaxonomy

### Community 11 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 12 - "detect_domain"
Cohesion: 0.18
Nodes (5): _contains_phrase(), detect_domain(), _domain_keywords(), _rewrite_query_for_domain(), TestDomainDetection

### Community 13 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 14 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 17 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 18 - "test_text_layout_resilience.py"
Cohesion: 0.20
Nodes (3): read_rows(), TestTextLayoutDataContracts, TestTextLayoutRetrieval

### Community 20 - "verify-app.mjs"
Cohesion: 0.29
Nodes (3): @playwright/test, SCREENSHOTS_DIR, VIEWPORTS

### Community 21 - "_load_csv"
Cohesion: 0.33
Nodes (3): _load_csv(), _load_product_keywords(), _load_rows_or_empty()

### Community 22 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 23 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 24 - "vite.config.ts"
Cohesion: 0.33
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 26 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **19 isolated node(s):** `clsx`, `date-fns`, `@hookform/resolvers`, `jsdom`, `motion` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 234 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `DesignSystemGenerator`, `validate_data.py`, `design_system.py`, `BM25`, `core.py`, `detect_domain`, `csv`, `test_text_layout_resilience.py`, `_load_csv`, `TestDiagnosticsContracts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `@hookform/resolvers` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useFinance` be split into smaller, more focused modules?**
  _Cohesion score 0.09607270366764038 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `design_system.py`, `test_design_system_mode.py`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `DesignSystemGenerator` be split into smaller, more focused modules?**
  _Cohesion score 0.056314699792960665 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search_stack` to `design_system.py`, `BM25`, `core.py`, `search`, `csv`, `test_text_layout_resilience.py`, `_load_csv`, `TestDiagnosticsContracts`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._