---
name: graphify
description: Rebuild and synchronize the codebase knowledge graph using graphify.
---

# /graphify: Rebuild Knowledge Graph

Re-indexes repository structure, AST symbols, dependencies, and call-flows into `graphify-out/`.

## Execution Steps:

1. **Verify Tool Installation**:
   Ensure `graphify` is installed and in the environment PATH:
   ```bash
   graphify --version
   ```

2. **Extract & Build Knowledge Graph**:
   Run full code extraction and generate reports:
   ```bash
   graphify extract . --code-only
   ```
   *(Optionally run without `--code-only` if an LLM API key like GEMINI_API_KEY is configured for semantic deep graph extraction).*

3. **Verify Generated Artifacts**:
   Confirm that the following output files are updated in `graphify-out/`:
   - `graphify-out/GRAPH_REPORT.md`: Architectural summary, component graph, and metrics.
   - `graphify-out/graph.json`: Full serialized dependency and AST graph.
   - `graphify-out/GRAPH_TREE.html`: Interactive visual graph tree.

4. **Status Report**:
   Inform the user of the updated node count, edge count, and key clusters identified.
