// Assignment-data checks only. These do not implement or grade a candidate app.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const seed = JSON.parse(
  await readFile(new URL("../fixtures/seed.json", import.meta.url), "utf8"),
);
const allowedCities = new Set(["Tallinn", "Tartu", "Pärnu"]);

function exactKeys(value, expected) {
  assert.deepEqual(Object.keys(value).sort(), [...expected].sort());
}

function uniqueIds(records) {
  for (const record of records) {
    assert.equal(typeof record.id, "string");
    assert.match(record.id, /^[a-z][a-z0-9-]+$/);
  }
  assert.equal(new Set(records.map((record) => record.id)).size, records.length);
}

function utcInstant(value) {
  assert.equal(typeof value, "string");
  const timestamp = Date.parse(value);
  assert.ok(Number.isFinite(timestamp), "Timestamp must parse");
  assert.equal(new Date(timestamp).toISOString(), value);
  return timestamp;
}

function activeCount(shiftId) {
  return seed.applications.filter(
    (entry) => entry.shiftId === shiftId && entry.status === "active",
  ).length;
}

test("seed uses the fictional, fixed exercise context", () => {
  exactKeys(seed, [
    "exerciseNow", "currentWorkerId", "workers", "shifts", "applications",
  ]);
  assert.equal(seed.exerciseNow, "2030-06-03T06:00:00.000Z");
  utcInstant(seed.exerciseNow);
  assert.equal(seed.currentWorkerId, "worker-demo");
  assert.equal(seed.workers.length, 3);
  uniqueIds(seed.workers);
  assert.ok(seed.workers.some((worker) => worker.id === seed.currentWorkerId));
  for (const worker of seed.workers) {
    exactKeys(worker, ["id", "displayName"]);
    assert.match(worker.displayName, /^(Demo Worker|Example Worker [AB])$/);
  }
});

test("shift records contain only the agreed exercise fields and valid values", () => {
  assert.equal(seed.shifts.length, 6);
  uniqueIds(seed.shifts);
  for (const shift of seed.shifts) {
    exactKeys(shift, [
      "id", "title", "employerName", "city", "startsAt", "endsAt",
      "hourlyRateCents", "currency", "capacity",
    ]);
    assert.equal(typeof shift.title, "string");
    assert.ok(shift.title.length > 0);
    assert.match(shift.employerName, /^Example /);
    assert.ok(allowedCities.has(shift.city));
    assert.equal(shift.currency, "EUR");
    assert.ok(Number.isSafeInteger(shift.hourlyRateCents));
    assert.ok(shift.hourlyRateCents > 0);
    assert.ok(Number.isSafeInteger(shift.capacity));
    assert.ok(shift.capacity > 0);
    assert.ok(utcInstant(shift.startsAt) < utcInstant(shift.endsAt));
    assert.ok(activeCount(shift.id) <= shift.capacity);
  }
});

test("applications have valid references and unique worker/shift pairs", () => {
  assert.equal(seed.applications.length, 4);
  uniqueIds(seed.applications);
  const pairs = new Set();
  for (const application of seed.applications) {
    exactKeys(application, ["id", "workerId", "shiftId", "status"]);
    assert.ok(seed.workers.some((worker) => worker.id === application.workerId));
    assert.ok(seed.shifts.some((shift) => shift.id === application.shiftId));
    assert.ok(["active", "cancelled"].includes(application.status));
    const pair = JSON.stringify([application.workerId, application.shiftId]);
    assert.ok(!pairs.has(pair), "Duplicate worker/shift pair");
    pairs.add(pair);
  }
});

test("fixtures provide the documented acceptance-scenario starting states", () => {
  const findShift = (id) => {
    const shift = seed.shifts.find((entry) => entry.id === id);
    assert.ok(shift, "Expected scenario shift to exist");
    return shift;
  };
  const remaining = (id) => findShift(id).capacity - activeCount(id);
  assert.equal(remaining("shift-last-place"), 1);
  assert.equal(remaining("shift-full"), 0);
  assert.equal(remaining("shift-stockroom"), 2);
  assert.equal(remaining("shift-market"), 2);
  assert.equal(remaining("shift-library"), 2);
  assert.ok(
    utcInstant(findShift("shift-started").startsAt) < utcInstant(seed.exerciseNow),
  );
  for (const shift of seed.shifts.filter((entry) => entry.id !== "shift-started")) {
    assert.ok(utcInstant(shift.startsAt) > utcInstant(seed.exerciseNow));
  }
  assert.equal(seed.shifts.filter((shift) => shift.city === "Tartu").length, 2);
  assert.equal(seed.shifts.filter((shift) => shift.city === "Pärnu").length, 0);
  const demoApplications = seed.applications.filter(
    (application) => application.workerId === seed.currentWorkerId,
  );
  assert.equal(demoApplications.length, 2);
  assert.equal(
    demoApplications.find((entry) => entry.id === "application-demo-active")?.status,
    "active",
  );
  assert.equal(
    demoApplications.find((entry) => entry.id === "application-demo-cancelled")?.status,
    "cancelled",
  );
  assert.equal(
    seed.applications.find((entry) => entry.id === "application-other-last-place")?.workerId,
    "worker-example-a",
  );
});
