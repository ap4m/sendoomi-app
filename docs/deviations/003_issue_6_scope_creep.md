# Deviation/Postmortem: 003 - Issue #6 Scope Creep (Deletion)

## Problem
I implemented **Deletion** functionality (`deleteLink` service method and UI delete buttons) during **Issue #6 (Link Persistence)**, despite this feature being explicitly deferred to future issues.

## Circumstances
During the implementation phase of the persistence layer, I followed a standard CRUD pattern without re-verifying the specific scope boundaries defined for this issue. I prioritized "Feature Completeness" over "Scope Adherence," resulting in the addition of unauthorized functionality.

## Root Cause
- **Assumptive Development:** I assumed that a persistence layer must include deletion by default, ignoring the specific constraints of the current iteration.
- **Scope Blindness:** I failed to cross-reference the implementation with the original requirements, leading to the inclusion of deferred features ("Scope Creep").
- **TDD Over-reach:** I wrote tests for deletion during the RED phase, which normalized the feature before I had even started the implementation.

## Remediation
1.  **Code Purge:** I am removing the `deleteLink` method from `storage.js` and the `handleDelete` logic from `App.jsx`.
2.  **Test Re-alignment:** I am removing all deletion-related assertions and test cases from `storage.test.js` and `App.test.jsx`.
3.  **Strict Scope Check:** For all future issues, I will explicitly list "Out of Scope" items in the Planning Document to prevent future creep.
