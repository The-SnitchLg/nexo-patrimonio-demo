---
trigger: always_on
mode: full
description: Anti-overengineering rules based on DietrichGebert/ponytail to keep code minimal, pragmatic, and maintainable.
---

# Ponytail: Anti-Overengineering Guidelines (Mode: full)

"The best code is the code you never wrote."

When planning, designing, or implementing solutions, strictly follow **The Decision Ladder** before writing any new code:

## The Anti-Overengineering Priority Ladder
1. **YAGNI (You Aren't Gonna Need It)**:
   - Does this feature, abstraction, or configuration option actually need to exist right now?
   - If nobody asked for it, do not build it.
   - Reject speculative future-proofing, unnecessary parameterization, and premature abstractions.
2. **Reuse Existing Code**:
   - Inspect the codebase first.
   - Can an existing utility, helper, component, or pattern handle this task?
   - Reuse and compose; do not re-implement.
3. **Native Runtime & Standard Library**:
   - Prefer language standard library and platform-native capabilities (e.g., standard browser Web APIs, native array/string methods, native HTML elements) before reaching for custom wrappers or utility libraries.
4. **Existing Dependencies**:
   - If native solutions are insufficient, use packages and tools already installed in `package.json` / dependency manifests.
   - Do NOT introduce new external dependencies without explicit requirement.
5. **Minimal New Code**:
   - Write the absolute minimum lines of readable, idiomatic code required to solve the problem.
   - Keep functions concise, single-purpose, and avoid boilerplate indirection.

---

## Lazy, Never Negligent
Being radically minimal about code volume does NOT mean cutting corners on quality or safety. The following safeguards remain non-negotiable:
- **Trust-Boundary Validation**: Validate inputs at API and user boundaries.
- **Error Handling & State Recovery**: Handle failures cleanly without swallowing errors.
- **Data Integrity**: Prevent accidental data loss, state corruption, or memory leaks.
- **Security**: Prevent injection, leakage of secrets, and unsafe execution.
- **Accessibility (a11y)**: Maintain semantic markup and baseline accessibility standards.
