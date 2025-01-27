"use client";

import Form from "../ui/form";
import Input from "../ui/input";
import { login } from "@/app/(auth)/action";

import { useActionState } from "react";
import SubmitButton from "../ui/submit-button";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { message: "" });

  return (
    <Form
      action={formAction}
      className="w-full max-w-sm text-white  p-6 shadow-md rounded-lg"
    >
      <div className="mb-5">
        <h1>Login</h1>
        <p className="text-xs">
          If you don't have an account, please click{" "}
          <Link href="/register" className="text-rose-500">
            Register
          </Link>
        </p>
      </div>
      <Input
        error={state.errors?.email}
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <Input
        error={state.errors?.password}
        name="password"
        type="password"
        label="Password"
        defaultValue="Admin$123@"
      />
      <SubmitButton>Login</SubmitButton>
    </Form>
  );
}
