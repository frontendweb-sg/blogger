import { IError } from "@/utils/types";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(
    message: string = "Bad request",
    field?: string,
    meta?: Record<string, any>
  ) {
    super(message || "Resource not found", field, meta);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // Customize the serialization of this error (e.g., including additional info)
  serializeError(): IError[] {
    const serialized = super.serializeError();
    return serialized;
  }
}
