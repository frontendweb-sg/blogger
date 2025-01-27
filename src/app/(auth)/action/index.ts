"use server";
import { signIn } from "@/auth";
import { zodError } from "@/lib/zod-error";
import { http } from "@/networ/http";
import { ActionState } from "@/utils/types";
import { User } from "next-auth";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid email"),
  password: z.string().min(8),
});

/**
 * Login a user
 * @param prevState
 * @param formData
 * @returns
 */
export async function login(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const body = Object.fromEntries(formData); // body is an object

  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return { ...prevState, errors: zodError(parse.error) };
  }

  await signIn("credentials", { ...parse.data });

  return prevState;
}

/**
 * Register a new user
 * @param prevState
 * @param formData
 * @returns
 */
export async function register(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const body = Object.fromEntries(formData); // body is an object

  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return {
      ...prevState,
      errors: zodError(parse.error),
    };
  }

  const response = await http<User>("login", {
    method: "POST",
    body: JSON.stringify(parse.data),
  });

  if (!response.ok) {
    return {
      ...prevState,
      errors: response.errors?.reduce((acc, error) => {
        acc[error.field!] = error.message || "An error occurred";
        return acc;
      }, {} as Record<string, string>),
    };
  }

  return prevState;
}

export async function logout() {
  await signIn("credentials", { redirectTo: "/login" });
}
