import { ZodIssue } from "zod";
import { CustomError } from "./custom-error";
import { IError } from "@/utils/types";

export class ValidationError extends CustomError {
  statusCode: number = 400;
  constructor(
    public errors: ZodIssue[],
    field?: string,
    meta?: Record<string, any>
  ) {
    super("Validation error", field, meta);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serialize() {
    return this.errors.map((error: ZodIssue) => ({
      name: error.code,
      message: error.message,
      field: error.path.join("."),
      statusCode: this.statusCode,
      meta: this.meta,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    }));
  }
  serializeError(): IError[] {
    return this.serialize();
  }
}
