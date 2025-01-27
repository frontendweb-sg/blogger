"use server";
import { signIn } from "@/auth";
import { zodError } from "@/lib/zod-error";
import { ActionState } from "@/utils/types";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid email"),
  password: z.string().min(8),
});

export async function login(prevState: ActionState, formData: FormData) {
  const body = Object.fromEntries(formData); // body is an object

  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return {
      ...prevState,
      errors: zodError(parse.error),
    };
  }

  const result = await signIn("credentials", {
    ...parse.data,
  });

  console.log("result", result);

  return prevState;
}

export async function logout() {
  console.log("logout");
  await signIn("credentials", {
    redirectTo: "/login",
  });
}
