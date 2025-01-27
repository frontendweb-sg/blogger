import { IError } from "@/utils/types";
import { CustomError } from "./custom-error";

export class ServerError extends CustomError {
  statusCode = 500;

  constructor(message: string, field?: string, meta?: Record<string, any>) {
    super(message || "Resource not found", field, meta);
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  // Customize the serialization of this error (e.g., including additional info)
  serializeError(): IError[] {
    return super.serializeError();
  }
}
