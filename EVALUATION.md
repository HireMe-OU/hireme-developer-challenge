# How we review submissions

We evaluate the scope in this repository. There are no secret feature requirements, preferred CSS library, or points for adding services. Reviewers should score the same submission against this rubric and note concrete evidence.

| Area | Points | Evidence |
| --- | ---: | --- |
| Required behavior | 30 | Browse/filter, apply, cancel, reapply, correct clock/availability and API responses |
| Backend and data integrity | 25 | Persistent data, atomic capacity and uniqueness, worker ownership, validation and safe errors |
| Tests | 20 | Meaningful assertions for failure cases and concurrency; at least one integration test of real database writes |
| Frontend usability | 15 | Clear async feedback, empty/error/disabled states, responsive layout and basic keyboard accessibility |
| Communication and maintainability | 10 | Reproducible setup, understandable code, deliberate tradeoffs, time/tool disclosure and honest gaps |
| **Total** | **100** | |

## Scoring anchors

Award full points for an area when the requirements work and the implementation provides evidence. Award roughly half when a useful portion works but meaningful requirements are missing or unverified. Award zero when the area is absent or the claimed behavior cannot be demonstrated. Record specific deductions; do not invent a different challenge during review.

A partial submission within the time budget can still support a useful interview. Extra features, visual ornament, number of commits, hosting, use/non-use of AI, and working beyond the time budget receive no extra points. Do not use this score alone to make a hiring decision.

## Review procedure

1. Read the candidate's setup notes, time spent, tool disclosure, limitations, and untested states.
2. Inspect install/seed commands before running unfamiliar code; use an isolated local environment with no production credentials.
3. Follow the documented setup and verify that reset works from a clean database.
4. Run candidate tests, then check the acceptance scenarios in `CHALLENGE.md`.
5. Check persistence across a restart and exercise one stale-client failure in the browser.
6. Record the score with evidence and any states that were not tested. Never infer a passing test from a filename or a screenshot.
7. Use a 30-minute follow-up to discuss decisions, walk through one write and its transaction, and explore one small change together.

Useful follow-up prompts: How does a last-place race resolve? What happens when the same request arrives twice? Which behavior is enforced by the database? What would replacing the fixed worker require? What did you leave unfinished, and why?

Candidate feedback and reviewer notes belong in private hiring communication, never in public issues or pull requests.
