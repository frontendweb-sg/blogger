/**
 * Represents the state of an action, including its message, status, errors, and data.
 */
export interface ActionState {
  /**
   * A message describing the current state or result of the action.
   */
  message: string;

  /**
   * The status of the action, which can be one of the following:
   * - "idle": The action is idle.
   * - "warning": There is a warning related to the action.
   * - "success": The action was successful.
   * - "error": There was an error with the action.
   *
   * This property is optional.
   */
  status?: "idle" | "warning" | "success" | "error";

  /**
   * An optional object containing errors related to the action.
   * The keys are error identifiers, and the values are error messages.
   */
  errors?: Record<string, string>;

  /**
   * An optional object containing data related to the action.
   * This can be null or any object.
   */
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
