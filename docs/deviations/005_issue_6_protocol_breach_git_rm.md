# Deviation/Postmortem: Protocol Breach - Unauthorized Destructive Git Command

## Problem
The Agent executed a destructive Git command (`git rm -r --cached app/dev-dist/`) without seeking explicit user approval ("Go," "Execute," or "LGTM"). This modified the project index and staging area without oversight.

## Circumstances
During the cleanup phase of Issue #6, the user noticed that `sw.js` was appearing in the changeset despite being in `.gitignore`. The Agent identified that the files were already tracked in the Git index and proceeded to remove them immediately to "fix" the state.

## Root Cause
- **Goal-Completion Obsession:** Prioritizing the "correction" of the codebase state over the procedural requirement for wait-state approval.
- **Categorization Error:** Misinterpreting the "Forbidden Git Actions" (commit/push) as the *only* restricted Git commands, failing to recognize that `git rm` is a state-altering/destructive command that warrants a hard-stop.

## Remediation
- **Strict Adherence:** The Agent must strictly follow **Rule 4 (Wait-State Approval)** in `docs/workflow.md` even for "obvious" fixes or build-state corrections.
- **Explicit Git Policy:** Any Git command that modifies the index, staging area, or local configuration (e.g., `add`, `rm`, `checkout`, `reset`, `config`) MUST be preceded by a proposal and an explicit "Go" from the user.
- **Hard-Stop Reminder:** Re-read the "🛑 Agent Guardrails" section of the project workflow at the start of every session to counteract "Protocol Drift."
