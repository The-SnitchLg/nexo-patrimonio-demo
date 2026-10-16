---
name: review
description: Execute a 5-axis code quality and security review on recent changes.
---

# /review: Code Review & Quality Gate Workflow

Audit code changes across Correctness, Readability, Architecture, Security, and Performance.

## Steps:
1. **Audit Uncommitted Changes & Diffs**:
   - Inspect git status and changed files:
     ```bash
     git diff --stat
     ```
2. **Execute Mandatory Automated Gates**:
   - Lint check:
     ```bash
     npm run lint
     ```
   - Build verification:
     ```bash
     npm run build
     ```
3. **5-Axis Evaluation**:
   - Inspect diff against Correctness, Readability, Architecture, Security, and Performance axes.
   - Cross-check with Ponytail anti-overengineering ladder (reject YAGNI violations).
4. **Output Structured Review**:
   - Categorize findings into `[CRITICAL]`, `[REQUIRED]`, `[OPTIONAL]`, and `[NIT]`.
   - Issue final verdict: **APPROVED** or **CHANGES REQUESTED**.
