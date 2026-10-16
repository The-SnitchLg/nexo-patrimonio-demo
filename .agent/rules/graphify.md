---
trigger: always_on
description: Consult the graphify knowledge graph at graphify-out/ before running repository-wide searches.
---

# Graphify Knowledge Graph Rule

This project maintains a structural and semantic knowledge graph powered by `graphify`.

## Guidelines:
1. **Check Before Grepping**:
   - Before executing repository-wide text searches (`grep`, full-repo scans, or broad pattern matching), check if `graphify-out/GRAPH_REPORT.md` exists and consult it for structural navigation, call-flows, and module dependencies.
   - When `graphify-out/graph.json` exists, prefer querying the graph using `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"`.
2. **Wiki Index Navigation**:
   - If `graphify-out/wiki/index.md` exists, consult its categorized articles before reading raw files.
3. **Graph Synchronization**:
   - When modifying code or adding major modules in this session, run `/graphify` or `graphify update .` to keep the structural knowledge graph up to date.
