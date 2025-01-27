import { CustomError, IError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string, field?: string, meta?: Record<string, any>) {
    super(message || "Resource not found", field, meta);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  // Customize the serialization of this error (e.g., including additional info)
  serializeError(): IError[] {
    return [
      {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        field: this.field,
        meta: this.meta,
        stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
      },
    ];
  }
}
