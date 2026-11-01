# The 30-minute follow-up

This session helps us understand your code and reasoning. Your hiring contact arranges the time and any accessibility or scheduling adjustments. No additional take-home work, slides, hosted deployment, or production access is needed.

## Suggested agenda

| Minutes | Activity |
| --- | --- |
| 0–5 | Run the app or tests and identify the working scope and known gaps |
| 5–15 | Trace one application write, then try one or two input variations under the existing rules |
| 15–22 | Compare the initial plan with the implementation; discuss a tradeoff, a verification example, and scaling considerations |
| 22–27 | Agree on a small hypothetical requirement change and discuss its impact; pair on a test or small edit if practical |
| 27–30 | Candidate questions and remaining limitations |

If setup fails, use the code and recorded test evidence to continue and record what could not be verified. Do not spend the session silently troubleshooting the interviewer's environment.

## Input variations stay within the contract

The purpose is to see whether the implementation follows the rules generally. We can change test inputs, not the assignment's promised interface or product rules.

Representative checks include:

- Use new shift/application IDs and a different positive capacity with the same allowed cities and data shapes.
- Start with an isolated future shift of capacity one and no active applications. Race two different fixture workers through the storage/service layer: one succeeds and one receives `SHIFT_FULL`.
- Repeat a successful apply while that shift is full: the same worker receives `ALREADY_APPLIED` and no extra place is consumed.
- Cancel an application, let another worker take that place, then attempt to reapply: the cancelled record stays cancelled and the request receives `SHIFT_FULL`.
- Put the start time exactly at the injected exercise clock and try apply or cancellation: both reject with `SHIFT_STARTED`.
- Open two browser views and perform a write in one before acting in the other: the stale view handles the server response and refreshes the affected state.

Use an isolated test database and the candidate's existing test setup or test-only seed. Keep worker impersonation and clock changes inside the test/service boundary. Never ask for a new public endpoint or run these checks against real services. No generic scenario engine is expected.

## The small requirement change

We might ask: "How would you add an 'Available places only' filter?" First agree on the expected behavior and API change. Then discuss the affected query, UI states, and tests; a small edit together is useful if time permits. This feature is not required in the take-home and earns no advance credit.

The follow-up is evidence for the existing evaluation rubric. We assess reasoning, verification, and understanding of the submitted code. There is no typing-speed score, no requirement to finish a surprise feature, and no requirement to disclose private AI sessions.
