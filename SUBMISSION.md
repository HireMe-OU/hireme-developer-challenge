# Submission notes

Copy or complete this file with your submission. Do not put private contact details in a public repository.

## Run locally

- Required runtime and versions:
- Install command:
- Database setup/migration command:
- Seed command:
- Deliberate reset command (including what it deletes):
- Development command and local URL:
- Test command(s):
- Build/typecheck/lint commands, where provided:

## Time spent

- Total (stop by four hours):
- Rough allocation:

## Initial plan checkpoint

Save a few bullets around the first 30–45 minutes and keep them here as written. A Git checkpoint is useful if you are using Git, but a ZIP submission can preserve the same notes here. If you missed the checkpoint, say so rather than reconstructing an earlier plan after the fact.

- Approximate elapsed time:
- Proposed data model and transaction boundary:
- First behavior and tests to implement:
- Assumptions or questions:

## Decisions as the work develops

Keep this brief; two or three entries are enough. Include one alternative you considered and why you chose your approach. If the initial plan changes, explain what evidence led to the change; if it holds, say what you checked.

| Approximate elapsed time | Decision or revision | Alternative / evidence / tradeoff |
| --- | --- | --- |
| | | |

## Implementation

- Architecture and persistence choice:
- How worker identity stays on the server:
- How duplicate applies and last-place races are handled:
- Clock and timezone handling:
- Main tradeoffs:

## Verification

List commands you actually ran and their outcomes. Include the real database integration test and concurrency cases. Do not report supplied fixture checks as application tests.

| Check or UI state | Result | Evidence / remaining limitation |
| --- | --- | --- |
| Application tests | | |
| Last-place and duplicate request races | | |
| Data survives server restart | | |
| Loading / empty / error / pending / success | | |
| Keyboard navigation and status announcements | | |
| Mobile-width layout | | |

## Known gaps and next steps

What is incomplete or untested? What would you do first with another hour?

## Tools and reuse

List significant scaffolds, libraries, reused code, and AI assistance. What did you verify or change yourself?

If you used AI, give one concrete verification example: what it suggested, the test or check you used, what happened, and any correction. It is fine to report that the checked suggestion was correct or that you did not use AI. No raw session exports or prompt histories are required.

## Production discussion

How would you replace the fixed demo identity and clock? What assumptions make this local exercise unsuitable for direct production use?

In three to five bullets, what would you inspect first with 2,000 shifts and 100 simultaneous attempts to reserve the same final place? Discuss queries/indexes, transaction contention, and how you would test the guarantee. A short explanation is enough; do not implement load tests, queues, caching, or new infrastructure for this exercise. The numbers are hypothetical exercise inputs, not HireMe usage data.
