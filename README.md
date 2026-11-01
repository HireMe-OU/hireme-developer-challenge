# HireMe full-stack developer challenge

Build **Shiftboard**, a small fictional app where a demo worker browses shifts, applies for a place, and cancels an application.

This exercise evaluates how you connect a React interface, a TypeScript backend, and persistent data. Shiftboard's rules and data are invented for this exercise; they do not describe HireMe's production application.

The central guarantee: **an application reserves one place for the current worker, and the server preserves capacity, uniqueness, and ownership even when requests race or the browser is stale.**

## Time budget

Spend **3–4 hours maximum**, including setup, tests, and notes. Stop at the limit and explain what remains. A smaller working implementation with clear tradeoffs is useful evidence. Extra features and extra hours earn no extra credit.

If the format or time budget creates an accessibility constraint, ask your hiring contact about an alternative before starting.

Around the first 30–45 minutes, save a brief initial plan in [SUBMISSION.md](SUBMISSION.md). Keep that version and add short decision notes as your approach changes. Planning and notes are part of the same four-hour budget; a few bullets are enough.

## Start here

1. Read [the requirements](CHALLENGE.md) and [API contract](docs/API.md).
2. Review the [fictional fixtures](fixtures/seed.json) and [shared types](contracts/domain.ts).
3. Check the [published evaluation criteria](EVALUATION.md).
4. Create your implementation in `solution/`. This repository supplies the assignment, data, and a fixture check; **it does not contain a runnable application or a completed solution**.

Use React and TypeScript for the frontend and TypeScript on the server. Next.js is a convenient choice; a separate React + Node server is equally acceptable. Use SQLite or PostgreSQL for persistence, with any appropriate library. No paid services or external accounts are required. Existing scaffolds and libraries are welcome.

The starter checks require Node.js 22 or newer and no installed dependencies:

```bash
node --version
npm test
```

That command checks the supplied fixtures only. Add your own application tests and document their separate commands. Pin your application dependencies and commit the corresponding lockfile.

## What to deliver

- A locally runnable frontend and backend in `solution/`, including persistence and repeatable seed/reset commands.
- Tests for the important behavior in the brief.
- A completed [submission template](SUBMISSION.md), including exact setup commands, time spent, tradeoffs, and honestly recorded untested states.
- Enough screenshots or a short recording to explain the result, if convenient. A hosted deployment is optional and earns no extra credit.

## AI and other tools

AI assistants, documentation, libraries, and your own reusable scaffolding are allowed. Describe meaningful AI assistance in your submission, explain the code you submit, and verify it yourself. Never upload confidential code, credentials, or personal data to this repository or an AI tool. Do not claim tests passed unless you ran them.

If you use AI, describe one specific suggestion you checked, how you checked it, and the result. If you caught a mistake, explain the correction; if you did not, say so. You do not need to manufacture a failure or share raw sessions, prompt histories, or personal conversations.

## After submission

We use a [30-minute follow-up](docs/REVIEW_SESSION.md) to walk through your implementation, try different inputs under the published rules, and discuss a small requirement change. No additional take-home implementation is required. Your hiring contact confirms the submission deadline, reviewer account, and session arrangements privately; this repository has no shared application deadline.

## Submit privately

Create your own repository or download this assignment. A private solution repository is welcome: share it with the GitHub reviewer account supplied by your hiring contact and send the link through your existing hiring conversation. Ask that contact for the reviewer account if it has not been provided. A source ZIP sent through that conversation is also acceptable.

**Do not open a public pull request containing your solution, CV, contact details, or hiring discussion.** Public issues are for non-sensitive questions about the assignment only. You are not required to publish your work.

See [evaluation criteria](EVALUATION.md) for the follow-up discussion. This is a fictional evaluation exercise, not work on the production product. You retain ownership of your submission.

## Repository contents

| Path | Purpose |
| --- | --- |
| `CHALLENGE.md` | Required behavior, limits, and acceptance scenarios |
| `docs/API.md` | HTTP request and response contract |
| `contracts/domain.ts` | Data shapes; no business logic |
| `fixtures/seed.json` | Fully synthetic seed data and fixed exercise clock |
| `scripts/check-fixtures.mjs` | Checks seed consistency; does not grade solutions |
| `EVALUATION.md` | Transparent scoring and review procedure |
| `SUBMISSION.md` | Candidate notes template |
| `docs/REVIEW_SESSION.md` | Live review format and representative input variations |
| `LICENSE` | License for the supplied assignment materials |

## Acknowledgement

The early planning checkpoint, decision notes, and live input variations were inspired by [Byro's Evidence Memory challenge](https://github.com/byro-ee/evidence-memory-challenge/tree/44ebd9789753b7dcf90a07c340eeafcfda625093). The Shiftboard brief, contracts, code, and fixtures are independently written for this exercise.
