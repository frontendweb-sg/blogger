/**
 * Interface representing a standardized error structure.
 */
export interface IError extends Error {
  /**
   * A human-readable message explaining the error.
   */
  message: string;

  /**
   * The HTTP status code associated with the error (e.g., 404 for "Not Found").
   */
  statusCode: number;

  /**
   * An optional field representing the specific field or resource that caused the error.
   * This is commonly used for form validation errors.
   */
  field?: string;

  /**
   * A unique error code to help identify specific errors programmatically (e.g., 'USER_NOT_FOUND').
   * Useful for error categorization or localization.
   */
  errorCode?: string;

  /**
   * A stack trace providing details on where the error occurred.
   * This is typically used for debugging and is often omitted in production environments.
   */
  stack?: string;
  /**
   * Optional additional metadata related to the error (e.g., request data or system state).
   * This allows for greater flexibility in tracking and debugging errors.
   */
  meta?: Record<string, any>;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  field?: string;
  meta?: Record<string, any>;

  constructor(
    public message: string,
    field?: string,
    meta?: Record<string, any>
  ) {
    super(message);
    this.field = field;
    this.meta = meta;
    // Set the prototype explicitly (to fix the prototype chain)
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Custom method to serialize error into a standard format
  serializeError(): IError[] {
    return [
      {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        field: this.field,
        meta: this.meta,
        stack: process.env.NODE_ENV === "development" ? this.stack : undefined, // Include stack trace only in dev
      },
    ];
  }
}
