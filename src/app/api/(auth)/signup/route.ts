import { BadRequestError, ValidationError } from "@/lib/errors";
import { CustomError } from "@/lib/errors/custom-error";
import { errorHandler } from "@/lib/middleware/error-handler";
import { User } from "@/lib/model";
import { NextResponse } from "next/server";

import { z } from "zod";

const signupSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  mobile: z.string().min(10).max(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("body", body);
    const parse = signupSchema.safeParse(body);
    console.log(parse.error, "errors");
    if (!parse.success) {
      throw new ValidationError(parse.error.errors);
    }

    // check user exists
    const user = await User.findOne({ where: { email: body.email } });
    if (user) {
      throw new BadRequestError("User already exists");
    }

    // create user
    const result = await User.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
