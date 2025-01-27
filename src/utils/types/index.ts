export interface ActionState {
  message: string;
  status?: "idle" | "warning" | "success" | "error";
  errors?: Record<string, string>;
  data?: null | object;
}

export interface IError extends Error {
  message: string;
  statusCode: number;
  field?: string;
  errorCode?: string;
  meta?: Record<string, any>;
}

export type HttpResponse<T> = {
  readonly data: T | null;
  readonly status: number;
  readonly ok: boolean;
  readonly statusText: string;
  readonly headers: Headers;
  readonly config: RequestInit;
  errors?: IError[];
};

export interface IHttpOptions extends RequestInit {
  body?: string | null;
}

export enum EventType {
  USER_LOGIN = "USER_LOGIN",
  USER_LOGOUT = "USER_LOGOUT",
  USER_REGISTRATION = "USER_REGISTRATION",
  USER_AUTH_FAILURE = "USER_AUTH_FAILURE",
  ACCESS_GRANTED = "ACCESS_GRANTED",
  ACCESS_DENIED = "ACCESS_DENIED",
  CONTENT_CREATED = "CONTENT_CREATED",
  CONTENT_UPDATED = "CONTENT_UPDATED",
  CONTENT_DELETED = "CONTENT_DELETED",
  API_REQUEST = "API_REQUEST",
  API_ERROR = "API_ERROR",
  ERROR_OCCURRED = "ERROR_OCCURRED",
  PAYMENT_INITIATED = "PAYMENT_INITIATED",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILURE = "PAYMENT_FAILURE",
  SYSTEM_STARTUP = "SYSTEM_STARTUP",
  SYSTEM_SHUTDOWN = "SYSTEM_SHUTDOWN",
  SERVER_ERROR = "SERVER_ERROR",
  USER_ACTIVITY = "USER_ACTIVITY",
  REDIRECT = "REDIRECT",
}
