---
name: test-driven-development
description: Enforce disciplined test-first practices and reliable automated verification. Implements Red-Green-Refactor cycles, the Beyoncé Rule, and pyramid-aligned testing.
triggers:
  - "/test"
  - "run tests"
  - "tdd"
  - "test-driven development"
  - "write tests"
---

# Test-Driven Development (TDD)

Based on engineering principles from `addyosmani/agent-skills`.

TDD ensures that code behavior is validated continuously through automated tests rather than speculative manual checking.

---

## Core Engineering Principles

1. **The Beyoncé Rule**: *"If you liked it, you should have put a test on it."* If a piece of behavior or business invariant matters, there must be an automated test asserting it.
2. **The Test Pyramid**: Target ~80% fast unit tests, ~15% integration tests, ~5% end-to-end user journeys.
3. **DAMP over DRY in Tests**: Prefer *Descriptive And Meaningful Phrases* over extreme deduplication. Test cases must be readable in isolation without deep indirection or hidden fixtures.
4. **Tests as Specifications**: A test suite should serve as executable documentation of system requirements.

---

## Anti-Rationalization Guardrails

| Shortcut / Excuse | Guardrail Policy |
| :--- | :--- |
| *"I'll write the code first and add tests after."* | Tests written post-hoc suffer from confirmation bias and rarely test edge conditions. Write the failing test first. |
| *"This is just frontend UI code, it can't be tested."* | Component render tests, interaction handlers, and state reducers can all be tested with standard harnesses. |
| *"The test passed in my head."* | Assumptions are not assertions. Run the test command in the terminal to see it pass green. |

---

## The Red-Green-Refactor Cycle

1. **Red**: Write a focused, failing test for the next increment of functionality. Run the test to confirm it fails for the expected reason.
2. **Green**: Write the minimal code necessary to make the test pass. Avoid adding unrelated logic.
3. **Refactor**: Clean up implementation, eliminate duplication, and improve naming while keeping the test suite green.
