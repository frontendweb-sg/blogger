"use client";

import { useActionState, useEffect } from "react";
import { register } from "../action";
import { Box } from "@/components/ui/box";
import Form from "../../../components/ui/form";
import AuthTitle from "./auth-title";
import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, {
    message: "",
  });

  useEffect(() => {
    if (state.status === "error") {
      // redirect to dashboard
      Object.keys(state.errors!).forEach((key) =>
        toast.error(state.errors![key])
      );
    }
  }, [state?.status]);

  return (
    <Form
      action={formAction}
      className="w-full max-w-md text-white  p-6 shadow-md rounded-lg"
    >
      <AuthTitle
        title="Signup"
        subtitle="If you have an account"
        href="/login"
        linkText="Login"
      />
      <Box className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          name="first_name"
          label="First Name"
          placeholder="First name"
          error={state.errors?.first_name}
          defaultValue="John"
          required
        />
        <Input
          defaultValue="Doe"
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Last name"
          error={state.errors?.last_name}
          required
        />
      </Box>
      <Input
        defaultValue="pradeep.kumar5@rsystems.com"
        type="email"
        name="email"
        label="Email"
        placeholder="Enter email"
        error={state.errors?.email}
        required
      />
      <Box className="grid grid-cols-2 gap-4">
        <Input
          defaultValue="Admin$12345"
          type="password"
          name="password"
          label="Password"
          placeholder="***********"
          error={state.errors?.password}
          required
        />
        <Input
          defaultValue="Admin$12345"
          type="password"
          name="confirm"
          label="Confirm password"
          placeholder="***********"
          error={state.errors?.confirm}
          required
        />
      </Box>
      <Input
        defaultValue="7291893484"
        type="text"
        name="mobile"
        label="Mobile"
        placeholder="Enter mobile no."
        error={state.errors?.mobile}
        required
      />
      <SubmitButton className="mt-4">Login</SubmitButton>
    </Form>
  );
}
