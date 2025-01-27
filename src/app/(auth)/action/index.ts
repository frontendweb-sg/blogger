"use server";
import { signOut, signIn, auth } from "@/auth";
import { zodError } from "@/lib/zod-error";
import { http } from "@/network/http";
import { ActionState } from "@/utils/types";
import { User } from "next-auth";
import { redirect } from "next/navigation";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty("Email is required!").email("Invalid email"),
  password: z.string().min(8),
});

const signupSchema = z.object({
  first_name: z.string().nonempty("First name is required!"),
  last_name: z.string().nonempty("Last name is required!"),
  email: z.string().nonempty("Email is required!").email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobile: z.string().min(10, "Invalid mobile number"),
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

  await signIn("credentials", {
    ...parse.data,
    redirectTo: "/user/dashboard",
  });

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

  const parse = signupSchema.safeParse({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: body.password,
    mobile: body.mobile,
  });
  if (!parse.success) {
    return {
      ...prevState,
      status: "warning",
      errors: zodError(parse.error),
    };
  }

  const response = await http<User>("signup", {
    method: "POST",
    body: JSON.stringify(parse.data),
  });

  if (!response.ok) {
    return {
      ...prevState,
      status: "error",
      errors: response.errors?.reduce((acc, error) => {
        acc[error.field!] = error.message || "An error occurred";
        return acc;
      }, {} as Record<string, string>),
    };
  }

  return {
    ...prevState,
    status: "success",
    message: "Registration successful",
    data: response.data,
  };
}

export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}
