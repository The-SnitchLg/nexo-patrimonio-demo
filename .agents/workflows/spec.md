---
name: spec
description: Initiate the Spec-Driven Development workflow to draft and validate requirements before coding.
---

# /spec: Spec-Driven Development Workflow

Execute specification drafting and requirement freeze.

## Steps:
1. **Clarify Objective**: Review the target user request or feature scope.
2. **Draft Technical Specification**:
   - Create or update a spec in `.opencode/specifications/workflow_spec.md`.
   - Specify goals, invariants, input/output schemas, and Given/When/Then acceptance criteria.
3. **Anti-Overengineering Check**:
   - Apply Ponytail rules to prune speculative abstractions or premature generalizations.
4. **Present Spec for Review**:
   - Present the proposed specification for confirmation before generating implementation code.
