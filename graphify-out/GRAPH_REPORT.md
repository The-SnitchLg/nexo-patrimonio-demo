# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 652 nodes · 1402 edges · 25 communities (22 shown, 3 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18a73f99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useFinance
- validate_data.py
- DesignSystemGenerator
- test_design_system_mode.py
- design_system.py
- search_stack
- core.py
- package.json
- search
- compilerOptions
- BM25
- test_relevance_evaluator.py
- dependencies
- compilerOptions
- CatalogRefreshTest
- detect_domain
- _get_bm25
- devDependencies
- _search_csv_detailed
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

## Communities (25 total, 3 thin omitted)

### Community 0 - "useFinance"
Cohesion: 0.08
Nodes (63): lucide-react, react, recharts, vitest, App(), MainRouter(), AllocationDonut(), EVOLUTION_DATA (+55 more)

### Community 1 - "validate_data.py"
Cohesion: 0.05
Nodes (45): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, read_rows(), read_rows(), TestTextLayoutDataContracts (+37 more)

### Community 2 - "DesignSystemGenerator"
Cohesion: 0.06
Nodes (14): DesignSystemGenerator, apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), TestReasoningMatch, read_rows(), split_values() (+6 more)

### Community 3 - "test_design_system_mode.py"
Cohesion: 0.07
Nodes (14): _contrast_ratio(), _derive_dark_palette(), _filter_anti_patterns_for_mode(), _palette_is_dark(), _query_wants_dark(), _relative_luminance(), _resolve_color_mode(), _select_palette_for_mode() (+6 more)

### Community 4 - "design_system.py"
Cohesion: 0.06
Nodes (16): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides() (+8 more)

### Community 5 - "search_stack"
Cohesion: 0.09
Nodes (7): _exact_stack_identifier(), search_stack(), _rows(), TestNativeDesktopStackFreshness, TestTextLayoutRetrieval, _rows(), TestWebStackFreshness

### Community 6 - "core.py"
Cohesion: 0.09
Nodes (16): _contains_phrase(), _exact_match_diagnostic(), _exact_row_identity(), _legacy_successor_guidance(), _normalize(), _passes_threshold(), _project_row(), _query_coverage() (+8 more)

### Community 7 - "package.json"
Cohesion: 0.07
Nodes (26): name, private, type, version, clsx, date-fns, decimal.js, @hookform/resolvers (+18 more)

### Community 8 - "search"
Cohesion: 0.14
Nodes (3): search(), TestSearchDomains, TestStyleTaxonomy

### Community 9 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 10 - "BM25"
Cohesion: 0.18
Nodes (3): BM25, _suggest_identities(), TestTokenizer

### Community 11 - "test_relevance_evaluator.py"
Cohesion: 0.12
Nodes (3): TestFixtureValidation, TestMetricMath, TestThresholdGate

### Community 12 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 13 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 16 - "_get_bm25"
Cohesion: 0.19
Nodes (7): _domain_keywords(), _file_signature(), _get_bm25(), _load_csv(), _load_csv_snapshot(), _load_product_keywords(), _load_rows_or_empty()

### Community 17 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 18 - "_search_csv_detailed"
Cohesion: 0.29
Nodes (3): _search_csv(), _search_csv_detailed(), TestBm25CoreBehavior

### Community 19 - "verify-app.mjs"
Cohesion: 0.29
Nodes (3): @playwright/test, SCREENSHOTS_DIR, VIEWPORTS

### Community 21 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 22 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 23 - "vite.config.ts"
Cohesion: 0.40
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 24 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **20 isolated node(s):** `clsx`, `date-fns`, `@hookform/resolvers`, `jsdom`, `motion` (+15 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 231 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `DesignSystemGenerator`, `design_system.py`, `search_stack`, `core.py`, `BM25`, `detect_domain`, `_get_bm25`, `_search_csv_detailed`, `test_core.py`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `@hookform/resolvers` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useFinance` be split into smaller, more focused modules?**
  _Cohesion score 0.08050645007166746 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `test_design_system_mode.py`, `design_system.py`, `test_core.py`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.05426356589147287 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search_stack` to `validate_data.py`, `design_system.py`, `core.py`, `search`, `_get_bm25`, `_search_csv_detailed`, `test_core.py`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._