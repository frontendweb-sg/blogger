import { NextResponse } from "next/server";
import { CustomError } from "../errors/custom-error";

export function errorHandler(error: Error) {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }

  if (error instanceof CustomError) {
    return NextResponse.json(
      { errors: error.serializeError() },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    {
      errors: [
        {
          name: error.name,
          message: error.message,
          statusCode: 500,
          field: undefined,
          meta:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      ],
    },
    { status: 500 }
  );
}
