import { ZodError, ZodIssue } from "zod";

export function zodError(error: ZodError): { [key: string]: string } {
  return error.errors.reduce(
    (obj, error: ZodIssue) =>
      Object.assign(obj, {
        [error.path[0]]: error.message,
      }),
    {}
  );
}
