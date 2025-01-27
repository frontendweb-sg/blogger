import { IError } from "@/utils/types";

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

    Object.setPrototypeOf(this, CustomError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Serialize the error into a standard format for logging or response.
   */
  serializeError(): IError[] {
    const errorDetails: IError = {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      field: this.field,
      meta: this.meta,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined, // Include stack trace only in dev
    };
    return [errorDetails];
  }
}
