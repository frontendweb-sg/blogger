import { IError } from "@/utils/types";
import { CustomError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode = 401;

  constructor(
    message: string = "Unauthorized",
    field?: string,
    meta?: Record<string, any>
  ) {
    super(message, field, meta);
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeError(): IError[] {
    return super.serializeError();
  }
}
