---
name: spec-driven-development
description: Enforce disciplined specification-first engineering before writing implementation code. Drafts comprehensive PRDs, defines boundaries, acceptance criteria, and task breakdowns.
triggers:
  - "/spec"
  - "create spec"
  - "write specification"
  - "spec-driven development"
---

# Spec-Driven Development (SDD)

Based on engineering principles from `addyosmani/agent-skills`.

Spec-Driven Development ensures that requirements, architectural decisions, and edge cases are rigorously documented and agreed upon *before* any implementation code is written.

---

## Anti-Rationalization Guardrails

| Shortcut / Excuse | Guardrail Policy |
| :--- | :--- |
| *"The task is too small to need a spec."* | Micro-specs take under 2 minutes and prevent multi-hour rework. Write at least goal, boundaries, and acceptance tests. |
| *"I'll write the spec while writing code."* | Writing code shifts focus to syntax details. Specs must freeze requirements before implementation begins. |
| *"The user gave clear prompt instructions."* | Prompts rarely define error paths, boundary limits, and rollback states. Unpack them explicitly in a spec. |

---

## Standard Workflow

### Step 1: Draft the Specification
Create or update a specification file (e.g., in `.opencode/specifications/` or `specs/`) with:
1. **Objective & Problem Statement**: What problem is being solved and why?
2. **Technical Boundaries**: What is in-scope vs. out-of-scope?
3. **Data Schema & State Changes**: Any new models, fields, or mutations.
4. **Acceptance Criteria**: Concrete Given/When/Then scenarios.
5. **Rollback Strategy**: Recovery plan if the feature introduces unexpected errors.

### Step 2: Review & Validate
Present the specification to the user and obtain validation before touching code.

### Step 3: Implement to Spec
Execute code changes strictly aligned with the agreed specification, referencing each acceptance criterion during testing.
