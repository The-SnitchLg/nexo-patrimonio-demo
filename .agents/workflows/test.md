---
name: test
description: Run automated test suite and execute Test-Driven Development verification cycles.
---

# /test: Test-Driven Development Workflow

Run test suites and drive implementation through Red-Green-Refactor cycles.

## Steps:
1. **Identify Target Behavior**:
   - Locate corresponding specification or acceptance scenario.
2. **Execute Red Phase**:
   - Write or locate failing test case asserting expected behavior.
   - Run test suite:
     ```bash
     npm test
     ```
   - Verify test fails for the intended reason.
3. **Execute Green Phase**:
   - Write the minimal code required to pass the failing test.
4. **Execute Refactor Phase**:
   - Clean up code while re-running the test suite to ensure green status.
5. **Report Results**:
   - Output passed/failed test matrix and coverage notes.
