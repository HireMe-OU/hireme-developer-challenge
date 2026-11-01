# The exercise: Shiftboard

An adult demo worker wants to find a short shift and reserve a place. Build one small app with a shift list and a "My applications" view. These can be sections of one page.

All employers, workers, and records in this assignment are fictional. These simplified rules are the complete product rules for this exercise.

## The central guarantee

An active application consumes exactly one place for its worker. A server write must preserve shift capacity, one application record per worker/shift pair, and cancellation ownership, including during concurrent requests. The interface should make the resulting state understandable when its earlier view is out of date.

Use that guarantee to explain your priorities and test choices. If you find an ambiguity, record your assumption or ask your hiring contact. You may critique a requirement in your notes; clearly identify any implemented deviation from the published contract.

## Fixed context

- The server's current worker is always `worker-demo`. Resolve that identity on the server; do not accept a worker ID from a request body, query string, or client header.
- No login, registration, identity verification, employer/admin interface, or real user accounts.
- Use `exerciseNow` from the fixture as the server clock: **2030-06-03T06:00:00.000Z**. Do not use the machine's current date for eligibility.
- Store timestamps as UTC instants. Display them in `Europe/Tallinn` and label the timezone. English UI is sufficient.
- Amounts are integer EUR cents per hour. Display the hourly amount; no total pay, deductions, taxes, invoices, payment collection, or employment contracts.
- A successful application immediately reserves one place. There is no approval queue.
- A worker may apply to multiple shifts, including overlapping ones; overlap checks are outside this exercise.

## Required user experience

### Browse shifts

Show all supplied shifts, ordered by start time ascending, with title, fictional employer, city, start/end time, hourly rate, and remaining places.

Provide one city filter plus "All cities". Keep full and started shifts visible with an understandable state. Filtering happens on the server; the interface must use the API rather than importing the fixture as its data source.

Show an Apply action for an eligible shift. Make the reason clear when a shift is full, has started, or already has an active application from the demo worker.

### Apply and cancel

Apply to a shift, show feedback, and update the relevant list/application state without requiring a manual page refresh. Show a pending state while a write is in progress.

"My applications" shows this worker's active and cancelled applications, with the related shift information and status. Allow cancellation only for active applications whose shifts have not started.

After cancellation, the place becomes available immediately. The worker may reapply before the shift starts if there is space; reuse the existing application ID and set its status back to `active`. No history beyond the current status is required.

### Handle real interface states

Handle loading, no matching shifts, no applications, request errors, pending/disabled actions, and successful writes. A stale browser can attempt an action that the server rejects: show that error and refresh the affected data.

Use readable responsive layouts, visible focus states, keyboard-operable controls, semantic labels, and announced status/error feedback. A confirmation dialog is optional for this reversible cancellation; if used, make it accessible. No brand artwork or elaborate visual system is needed.

## Required server behavior

- Persist shifts and applications in SQLite or PostgreSQL; data must survive a server restart.
- Seed the fixture data exactly, and provide a deliberate reset command. Do not reset on each app launch or mutate the source fixture.
- A shift has started when `startsAt <= exerciseNow`. Check this on the server for apply and cancellation.
- Remaining places are `capacity - activeApplicationCount`; cancelled applications do not consume capacity.
- There can be at most one application record for a given worker and shift.
- Applying twice returns a conflict and creates no additional record or reservation.
- Reject an apply when the shift is full or has started.
- Enforce capacity and uniqueness atomically. Two concurrent requests competing for the final place must never both succeed. A disabled button alone is not sufficient.
- Look up cancellation targets within the current worker's applications. Another worker's application must behave like an unknown ID.
- Validate request bodies, unknown IDs, and city values according to [the API contract](docs/API.md). Do not expose stack traces or database errors in responses.
- Keep the fixed demo identity on the server. This shortcut is only for the local exercise; identify its production limitation in your notes.
- The demo worker can cancel an already-cancelled application again: return the unchanged cancelled record, provided the shift has not started. A started shift always rejects cancellation.

## Acceptance scenarios

| Scenario | Expected result |
| --- | --- |
| Load unfiltered list | Six shifts in start-time order, with accurate availability |
| Filter by Tartu | Only the two Tartu shifts |
| Filter by a valid city with no shifts (Pärnu) | Empty result with a clear UI message |
| Apply to `shift-market` | 201; one active application and one fewer place |
| Apply to it again | 409 `ALREADY_APPLIED`; unchanged reservation count |
| Two distinct workers compete for the last place on `shift-last-place` | Exactly one reservation succeeds; the other gets 409 `SHIFT_FULL` |
| Two duplicate requests from the demo worker | Exactly one succeeds; the other gets 409 `ALREADY_APPLIED` |
| Apply to `shift-full` | 409 `SHIFT_FULL` |
| Apply to `shift-started` | 409 `SHIFT_STARTED` |
| Apply exactly at a shift's start | 409 `SHIFT_STARTED` |
| Cancel demo worker's `application-demo-active` | 200; status cancelled and one place released |
| Cancel that record again before start | 200; capacity unchanged |
| Reapply to `shift-stockroom` | 201; same application ID becomes active if space remains |
| Cancel `application-other-last-place` | 404; another worker's record is unchanged |
| Cancel an application whose shift has started | 409 `SHIFT_STARTED`; no write |
| Restart the server after a write | Application state is preserved |

For the two-worker concurrency test, race `worker-demo` against `worker-example-b` through your storage/service layer; `worker-example-a` already holds the other place. **Do not add a public impersonation endpoint.** Use an isolated test database and reset state between cases. Add tests for the time boundary by injecting a test clock or arranging test data; production exercise behavior stays on the fixed fixture clock.

Prioritize tests for duplicate applies, full/started shifts, cancellation ownership, cancellation releasing capacity, reapplication, and concurrent access. Include at least one automated API or service integration test that exercises your real database write path.

Implement the rules for valid records generally. Apart from the fixed demo identity and exercise clock, do not branch on fixture IDs or assume the supplied capacities, rates, or list size. The city allowlist stays as defined in the API contract. In the follow-up, we may use different IDs, capacities, or timestamps within the same data shapes and rules. An existing test setup or a small test-only seed is sufficient; no new import endpoint, scenario runner, or administration interface is required. See [the review format](docs/REVIEW_SESSION.md).

## Scope and time management

A practical allocation is 30 minutes for setup/model/seed, 75 minutes for API and persistence, 60 minutes for UI, and 45 minutes for tests and notes. Around the first 30–45 minutes, preserve a few bullets describing your initial model, transaction boundary, test priorities, and assumptions in `SUBMISSION.md`; commit that checkpoint if you are using Git. Keep the original plan and append short decisions rather than rewriting it to match the final result. If submitting a ZIP, retaining the initial plan in the notes is enough. Adjust the allocation to your strengths and stop by four hours.

No deployment, containers, real authentication, notifications, maps, uploads, analytics, localization, payments, or production integrations are required. Do not add features to earn points. If you run out of time, submit the working portion and explain the remaining gaps.
