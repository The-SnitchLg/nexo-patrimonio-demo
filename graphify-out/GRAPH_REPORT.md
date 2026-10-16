# Graph Report - Finanzas  (2026-10-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 565 nodes · 1066 edges · 25 communities (23 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- validate_data.py
- core.py
- DesignSystemGenerator
- test_design_system_mode.py
- search_stack
- search
- package.json
- BM25
- design_system.py
- compilerOptions
- test_relevance_evaluator.py
- dependencies
- compilerOptions
- csv
- CatalogRefreshTest
- test_data_contracts.py
- devDependencies
- test_core.py
- format_ascii_box
- App.tsx
- test_catalog_refresh.py
- .oxlintrc.json
- scripts
- vite.config.ts
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `search()` - 43 edges
2. `DesignSystemGenerator` - 35 edges
3. `search_stack()` - 35 edges
4. `compilerOptions` - 19 edges
5. `BM25` - 18 edges
6. `detect_domain()` - 18 edges
7. `read_rows()` - 16 edges
8. `CatalogRefreshTest` - 15 edges
9. `TestReasoningContract` - 15 edges
10. `compilerOptions` - 15 edges

## Surprising Connections (you probably didn't know these)
- `TestEndToEndCoherence` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `TestReasoningMatch` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `TestReasoningContract` --uses--> `DesignSystemGenerator`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py → .agents/skills/ui-ux-pro-max/scripts/design_system.py
- `TestBm25CoreBehavior` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/core.py
- `TestTokenizer` --uses--> `BM25`  [INFERRED]
  .agents/skills/ui-ux-pro-max/scripts/tests/test_core.py → .agents/skills/ui-ux-pro-max/scripts/core.py

## Import Cycles
- None detected.

## Communities (25 total, 2 thin omitted)

### Community 0 - "validate_data.py"
Cohesion: 0.06
Nodes (44): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, TestGeneratedCatalogContract, _catalog_date(), _check_app_interface_contract() (+36 more)

### Community 1 - "core.py"
Cohesion: 0.06
Nodes (25): _contains_phrase(), detect_domain(), _domain_keywords(), _exact_match_diagnostic(), _exact_row_identity(), _file_signature(), _legacy_successor_guidance(), _load_csv() (+17 more)

### Community 2 - "DesignSystemGenerator"
Cohesion: 0.07
Nodes (9): DesignSystemGenerator, _resolve_dial(), TestReasoningMatch, read_rows(), split_values(), style_identities(), TestLandingAndStackContract, TestReasoningContract (+1 more)

### Community 3 - "test_design_system_mode.py"
Cohesion: 0.07
Nodes (14): _contrast_ratio(), _derive_dark_palette(), _filter_anti_patterns_for_mode(), _palette_is_dark(), _query_wants_dark(), _relative_luminance(), _resolve_color_mode(), _select_palette_for_mode() (+6 more)

### Community 4 - "search_stack"
Cohesion: 0.10
Nodes (6): _exact_stack_identifier(), search_stack(), _rows(), TestNativeDesktopStackFreshness, _rows(), TestWebStackFreshness

### Community 5 - "search"
Cohesion: 0.09
Nodes (6): search(), _style_search_destination(), TestDiagnosticsContracts, TestSearchDomains, TestStyleTaxonomy, TestTextLayoutRetrieval

### Community 6 - "package.json"
Cohesion: 0.07
Nodes (29): name, private, type, version, clsx, date-fns, decimal.js, @hookform/resolvers (+21 more)

### Community 7 - "BM25"
Cohesion: 0.14
Nodes (5): BM25, _get_bm25(), _suggest_identities(), TestBm25CoreBehavior, TestTokenizer

### Community 8 - "design_system.py"
Cohesion: 0.13
Nodes (7): _detect_page_type(), format_master_md(), format_page_override_md(), _generate_intelligent_overrides(), persist_design_system(), safe_slug(), format_output()

### Community 9 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 10 - "test_relevance_evaluator.py"
Cohesion: 0.12
Nodes (3): TestFixtureValidation, TestMetricMath, TestThresholdGate

### Community 11 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, clsx, date-fns, decimal.js, @hookform/resolvers, lucide-react, motion, react (+11 more)

### Community 12 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 13 - "csv"
Cohesion: 0.18
Nodes (3): read_rows(), read_rows(), TestTextLayoutDataContracts

### Community 15 - "test_data_contracts.py"
Cohesion: 0.22
Nodes (4): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action()

### Community 16 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, jsdom, oxlint, @playwright/test, @testing-library/jest-dom, @testing-library/react, @types/node, @types/react (+5 more)

### Community 17 - "test_core.py"
Cohesion: 0.24
Nodes (3): format_markdown(), generate_design_system(), TestPersistence

### Community 18 - "format_ascii_box"
Cohesion: 0.22
Nodes (4): ansi_ljust(), format_ascii_box(), hex_to_ansi(), section_header()

### Community 19 - "App.tsx"
Cohesion: 0.28
Nodes (3): react, react-dom, App()

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
- **25 isolated node(s):** `clsx`, `date-fns`, `decimal.js`, `@hookform/resolvers`, `jsdom` (+20 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 219 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `core.py`, `DesignSystemGenerator`, `BM25`, `design_system.py`, `csv`, `test_core.py`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `clsx`, `date-fns`, `decimal.js` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06338028169014084 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `design_system.py`, `test_core.py`, `test_design_system_mode.py`, `test_data_contracts.py`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `core.py` be split into smaller, more focused modules?**
  _Cohesion score 0.05669199298655757 - nodes in this community are weakly interconnected._
- **Why does `search_stack()` connect `search_stack` to `core.py`, `search`, `design_system.py`, `csv`, `test_core.py`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._