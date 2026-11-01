# HTTP contract

Implement these endpoints under `/api`. Return JSON. Successful list responses use `{ "data": [...] }`; successful writes use `{ "data": application }`. Types are in [domain.ts](../contracts/domain.ts).

## Endpoints

| Method | Path | Success |
| --- | --- | --- |
| GET | `/api/shifts` | 200; all shifts with availability |
| GET | `/api/shifts?city=Tallinn` | 200; exact city match |
| GET | `/api/applications` | 200; demo worker's applications, including related shift |
| POST | `/api/shifts/:shiftId/applications` | 201; created or reactivated application |
| POST | `/api/applications/:applicationId/cancel` | 200; cancelled application |

Sort shifts by `startsAt`, then `id`, ascending. Sort applications by `id` ascending for deterministic output.

The allowed filter values are `Tallinn`, `Tartu`, and `Pärnu`. No city parameter means all cities. A repeated, empty, or unsupported city parameter returns 400 `INVALID_CITY`. Reject other query parameters on any endpoint with 400 `INVALID_QUERY`. Treat IDs as opaque strings and use bound database parameters.

Both POST endpoints accept either no request body or an empty JSON object `{}`. If a body is present, it must be valid JSON, with Content-Type `application/json`. Reject malformed JSON, arrays, null, non-empty objects (including `workerId`), or an unsupported content type with 400 `INVALID_REQUEST`. Reject request bodies on GET endpoints with 400 `INVALID_REQUEST`.

New application IDs may use any stable unique string format. Keep the seed IDs and reuse a cancelled record's ID on reapplication. The response exposes no worker ID, and client input never selects the worker.

## Shift response

```json
{
  "id": "shift-last-place",
  "title": "Event setup assistant",
  "employerName": "Example Events",
  "city": "Tallinn",
  "startsAt": "2030-06-03T09:00:00.000Z",
  "endsAt": "2030-06-03T13:00:00.000Z",
  "hourlyRateCents": 1250,
  "currency": "EUR",
  "capacity": 2,
  "remainingPlaces": 1,
  "myApplicationStatus": null
}
```

`myApplicationStatus` is `active`, `cancelled`, or null. Return all other fields exactly as defined by `ShiftView`. Compute availability from persisted active applications.

## Application response

Writes return `ApplicationView` (ID, shift ID, status). Listing returns `ApplicationWithShift`, which adds `shift` as a complete `ShiftView`.

```json
{
  "data": {
    "id": "application-demo-active",
    "shiftId": "shift-stockroom",
    "status": "cancelled"
  }
}
```

## Errors

```json
{
  "error": {
    "code": "SHIFT_FULL",
    "message": "This shift has no places left."
  }
}
```

The code and HTTP status are contractual; wording can differ. Show a useful user-facing message.

| Status | Code | Meaning |
| --- | --- | --- |
| 400 | `INVALID_CITY` | City filter is invalid |
| 400 | `INVALID_QUERY` | An unsupported query parameter was supplied |
| 400 | `INVALID_REQUEST` | Request body or content type is invalid |
| 404 | `NOT_FOUND` | Unknown shift, unknown application, or someone else's application |
| 409 | `SHIFT_STARTED` | The shift has started |
| 409 | `ALREADY_APPLIED` | This worker already has an active application |
| 409 | `SHIFT_FULL` | No remaining places |
| 500 | `INTERNAL_ERROR` | Unexpected server failure; safe generic message |

Validate query parameters first (unsupported keys before city values), then the body. For apply: check shift existence, started state, this worker's active application, then capacity, in that order. For cancellation: check application ownership/existence, then started state, then cancel or return the already-cancelled record.

Database constraints/transactions must still hold when requests race. Translate expected write conflicts into the error contract rather than returning raw database exceptions. A repeated apply by an already-active worker returns `ALREADY_APPLIED` even when that worker took the final place.

## Local development boundary

The server supplies `worker-demo` without real authentication. Keep this local-only demonstration separate from any production service. Explain how you would replace the fixed identity in a real application; do not implement that integration.
