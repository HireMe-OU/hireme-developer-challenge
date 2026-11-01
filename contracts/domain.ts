/**
 * Fictional exercise data contracts only. No production HireMe schema or logic.
 * API response types intentionally omit worker identifiers.
 */
export type City = "Tallinn" | "Tartu" | "Pärnu";
export type ApplicationStatus = "active" | "cancelled";

export interface Shift {
  id: string;
  title: string;
  employerName: string;
  city: City;
  startsAt: string;
  endsAt: string;
  hourlyRateCents: number;
  currency: "EUR";
  capacity: number;
}

export interface Worker {
  id: string;
  displayName: string;
}

export interface Application {
  id: string;
  workerId: string;
  shiftId: string;
  status: ApplicationStatus;
}

export interface SeedData {
  exerciseNow: string;
  currentWorkerId: string;
  workers: Worker[];
  shifts: Shift[];
  applications: Application[];
}

export interface ShiftView extends Shift {
  remainingPlaces: number;
  myApplicationStatus: ApplicationStatus | null;
}

export type ApplicationView = Pick<Application, "id" | "shiftId" | "status">;

export interface ApplicationWithShift extends ApplicationView {
  shift: ShiftView;
}

export interface DataResponse<T> {
  data: T;
}

export type ErrorCode =
  | "INVALID_CITY"
  | "INVALID_QUERY"
  | "INVALID_REQUEST"
  | "NOT_FOUND"
  | "SHIFT_STARTED"
  | "ALREADY_APPLIED"
  | "SHIFT_FULL"
  | "INTERNAL_ERROR";

export interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
  };
}
