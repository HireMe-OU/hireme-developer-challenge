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

## Production discussion

How would you replace the fixed demo identity and clock? What assumptions make this local exercise unsuitable for direct production use?
