# Skills Management & Integration Policies

These rules govern how skills are discovered, installed, and utilized in this workspace.

## 1. Skill Discovery Before Custom Implementation
- **Prioritize Existing Skills**: Before writing boilerplate, custom integrations, or reinventing complex workflows for common tools (e.g., testing setups, deployment scripts, design systems, or third-party SDKs), check whether an official or verified agent skill already exists.
- **Consult Catalog / Ecosystem**: Search the local skills or run `npx -y skills find <topic>` to locate established community or official solutions.

## 2. Non-Interactive CLI Execution
- **Mandatory `-y` Flag**: Always execute the Skills CLI and related package runners non-interactively using `-y` or `--yes` (e.g., `npx -y skills add ...`).
- **Never Block**: Do not invoke interactive prompts that pause background task execution. Ensure default directories and confirmation flags are passed automatically.

## 3. Skill Cataloging & Post-Install Auditing
- **Location Verification**: Verify that installed skills reside in the workspace customization tree (`.agent/skills/` or `.agents/skills/`).
- **Integrity Check**: Check `skills-lock.json` and review the skill's `SKILL.md` for clear documentation, valid YAML frontmatter, and safe execution commands.
- **Cataloging**: Whenever a new skill is installed, immediately catalog its trigger phrases, purpose, and invocation guidelines in the conversation summary for future reference.
