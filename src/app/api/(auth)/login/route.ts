import { AuthError, CustomError, ValidationError } from "@/lib/errors";
import { Jwt } from "@/lib/jwt";
import { errorHandler } from "@/lib/middleware/error-handler";
import { User } from "@/lib/model";
import { Password } from "@/lib/password";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid email"),
  password: z.string().min(8),
});
/**
 * Login user api
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const parse = loginSchema.safeParse({ email, password });

    if (!parse.success) {
      throw new ValidationError(parse.error.issues);
    }

    const user = (await User.findOne({ where: { email } })) as User;
    if (!user) {
      throw new AuthError("Invalid email", "email");
    }

    const isMatch = await Password.compare(password, user.password);

    if (!isMatch) {
      throw new AuthError("Invalid  password", "password");
    }

    const token = Jwt.token({
      user_id: user.user_id,
      email: user.email,
    });

    const { password: _, ...userData } = user.toJSON();
    return NextResponse.json({ ...userData, expiresIn: 3600, token });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
