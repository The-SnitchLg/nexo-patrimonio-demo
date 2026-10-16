---
name: code-review-and-quality
description: Multi-axis code review and quality gate evaluation. Audits changes across Correctness, Readability, Architecture, Security, and Performance using structured severity labeling.
triggers:
  - "/review"
  - "review code"
  - "code quality audit"
  - "run code review"
---

# Code Review & Quality Assurance

Based on engineering principles from `addyosmani/agent-skills` and Google Code Review guidelines.

---

## The 5-Axis Review Framework

Evaluate code modifications across five distinct dimensions:

1. **Correctness**:
   - Does the implementation satisfy all functional requirements and edge cases?
   - Are error states, empty states, and invalid inputs handled safely?
2. **Readability & Simplicity**:
   - Is the code self-documenting with clear, meaningful naming?
   - Does it adhere to the Ponytail anti-overengineering ladder (YAGNI, minimal code)?
3. **Architecture & Boundaries**:
   - Does the change respect directory conventions and component separation?
   - Are circular dependencies or tight couplings introduced?
4. **Security & Data Safety**:
   - Are trust boundaries respected with sanitized inputs?
   - Are secrets, credentials, or sensitive data kept out of client bundles and git history?
5. **Performance & Scalability**:
   - Does the change avoid wasteful re-renders, memory leaks, or unoptimized network calls?
   - Is bundle impact minimized (e.g., relative asset paths preserved)?

---

## Standardized Severity Tags

Categorize all review feedback with clear severity labels:

- **`[CRITICAL]`**: Severe bug, security vulnerability, data loss risk, or broken build. Must be resolved immediately before proceeding.
- **`[REQUIRED]`**: Logic error, unmet acceptance criterion, or violation of project architectural invariants.
- **`[OPTIONAL]`**: Recommended improvement or alternative approach that improves maintainability without blocking progress.
- **`[NIT]`**: Minor stylistic suggestion, typo, or aesthetic cleanup. Non-blocking.

---

## Review Output Format

```markdown
### Code Review Summary
- **Overall Verdict**: [ APPROVED | CHANGES REQUESTED ]
- **Scope Inspected**: [Files and commit range]

#### Findings by Severity:
- **`[CRITICAL]`**: None identified.
- **`[REQUIRED]`**: Issue description and suggested remediation.
- **`[NIT]`**: Minor cleanup suggestion.

#### Quality Gate Status:
- Build check: PASS
- Linter check: PASS
- Asset routing check: PASS
```
