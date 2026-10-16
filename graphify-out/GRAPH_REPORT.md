# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 669 nodes · 1456 edges · 36 communities (26 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `595a3017`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useFinance
- validate_data.py
- DesignSystemGenerator
- finance.ts
- BM25
- design_system.py
- detect_domain
- _select_palette_for_mode
- package.json
- core.py
- search_stack
- test_design_system_mode.py
- compilerOptions
- dependencies
- compilerOptions
- search
- CatalogRefreshTest
- test_data_contracts.py
- devDependencies
- test_core.py
- TestNativeDesktopStackFreshness
- _normalize
- TestStyleTaxonomy
- generate_design_system
- TestThresholdGate
- verify-app.mjs
- _row_identities
- TestTextLayoutDataContracts
- .oxlintrc.json
- scripts
- TestMetricMath
- vite.config.ts
- tsconfig.json
- TestFixtureValidation
- TestDiagnosticsContracts
- TestTextLayoutRetrieval

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
- `ImportReviewModalProps` --references--> `ExtractedStatementData`  [EXTRACTED]
  src/components/documents/ImportReviewModal.tsx → src/domain/reconciliation.ts
- `AccountSourcesListProps` --references--> `AccountType`  [EXTRACTED]
  src/components/finance/AccountSourcesList.tsx → src/types/finance.ts
- `AddAccountModalProps` --references--> `AccountType`  [EXTRACTED]
  src/components/modals/AddAccountModal.tsx → src/types/finance.ts
- `ExtractedStatementData` --references--> `Holding`  [EXTRACTED]
  src/domain/reconciliation.ts → src/types/finance.ts

## Import Cycles
- None detected.

## Communities (36 total, 10 thin omitted)

### Community 0 - "useFinance"
Cohesion: 0.11
Nodes (46): lucide-react, react, recharts, App(), MainRouter(), AllocationDonut(), EVOLUTION_DATA, SnapshotEvolution() (+38 more)

### Community 1 - "validate_data.py"
Cohesion: 0.07
Nodes (42): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, _catalog_date(), _check_app_interface_contract(), _check_catalog_contract() (+34 more)

### Community 2 - "DesignSystemGenerator"
Cohesion: 0.06
Nodes (10): DesignSystemGenerator, _resolve_dial(), TestReasoningMatch, read_rows(), split_values(), style_identities(), TestGeneratedCatalogContract, TestLandingAndStackContract (+2 more)

### Community 3 - "finance.ts"
Cohesion: 0.10
Nodes (29): decimal.js, @supabase/supabase-js, vitest, FinanceContext, FinanceContextType, FinanceProvider(), getInitialStorage(), INITIAL_DOCS (+21 more)

### Community 4 - "BM25"
Cohesion: 0.11
Nodes (7): BM25, _get_bm25(), _search_csv(), _search_csv_detailed(), _suggest_identities(), TestBm25CoreBehavior, TestTokenizer

### Community 5 - "design_system.py"
Cohesion: 0.09
Nodes (11): ansi_ljust(), _detect_page_type(), format_ascii_box(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), hex_to_ansi(), persist_design_system() (+3 more)

### Community 6 - "detect_domain"
Cohesion: 0.11
Nodes (10): _contains_phrase(), detect_domain(), _domain_keywords(), _file_signature(), _load_csv(), _load_csv_snapshot(), _load_product_keywords(), _load_rows_or_empty() (+2 more)

### Community 7 - "_select_palette_for_mode"
Cohesion: 0.11
Nodes (8): _contrast_ratio(), _derive_dark_palette(), _palette_is_dark(), _relative_luminance(), _select_palette_for_mode(), TestEndToEndCoherence, TestLuminance, TestPaletteSelection

### Community 8 - "package.json"
Cohesion: 0.08
Nodes (24): name, private, type, version, clsx, date-fns, @hookform/resolvers, jsdom (+16 more)

### Community 9 - "core.py"
Cohesion: 0.14
Nodes (4): _passes_threshold(), _query_coverage(), _suggest_terms(), read_rows()

### Community 10 - "search_stack"
Cohesion: 0.14
Nodes (6): _exact_stack_identifier(), _project_row(), search_stack(), _valid_max_results(), _rows(), TestWebStackFreshness

### Community 11 - "test_design_system_mode.py"
Cohesion: 0.14
Nodes (6): _filter_anti_patterns_for_mode(), _query_wants_dark(), _resolve_color_mode(), _style_is_dark_primary(), TestAntiPatternGating, TestModeResolution

### Community 12 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 13 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 14 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 15 - "search"
Cohesion: 0.21
Nodes (3): search(), _style_search_destination(), TestSearchDomains

### Community 17 - "test_data_contracts.py"
Cohesion: 0.23
Nodes (5): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), _check_reasoning_contract()

### Community 18 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 21 - "_normalize"
Cohesion: 0.22
Nodes (5): _exact_match_diagnostic(), _legacy_successor_guidance(), _normalize(), _stack_query_requests_legacy(), _stack_row_filter()

### Community 23 - "generate_design_system"
Cohesion: 0.29
Nodes (3): format_markdown(), generate_design_system(), TestPersistence

### Community 25 - "verify-app.mjs"
Cohesion: 0.29
Nodes (3): @playwright/test, SCREENSHOTS_DIR, VIEWPORTS

### Community 26 - "_row_identities"
Cohesion: 0.33
Nodes (3): _exact_row_identity(), _row_identities(), _style_identity()

### Community 28 - ".oxlintrc.json"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 29 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 31 - "vite.config.ts"
Cohesion: 0.40
Nodes (3): @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 32 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **19 isolated node(s):** `clsx`, `date-fns`, `@hookform/resolvers`, `jsdom`, `motion` (+14 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `DesignSystemGenerator`, `TestDiagnosticsContracts`, `BM25`, `design_system.py`, `detect_domain`, `TestTextLayoutRetrieval`, `core.py`, `search_stack`, `test_core.py`, `_normalize`, `TestStyleTaxonomy`, `_row_identities`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `@hookform/resolvers` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useFinance` be split into smaller, more focused modules?**
  _Cohesion score 0.10915492957746478 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `design_system.py`, `_select_palette_for_mode`, `test_design_system_mode.py`, `test_data_contracts.py`, `test_core.py`, `generate_design_system`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.07067307692307692 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search_stack` to `TestDiagnosticsContracts`, `TestTextLayoutRetrieval`, `BM25`, `design_system.py`, `detect_domain`, `core.py`, `search`, `test_core.py`, `TestNativeDesktopStackFreshness`, `_normalize`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._