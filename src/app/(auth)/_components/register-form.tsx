"use client";

import { useActionState } from "react";
import Form from "../../../components/ui/form";
import AuthTitle from "./auth-title";
import { register } from "../action";
import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { ActionState } from "@/utils/types";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, {
    message: "",
  });

  return (
    <Form action={formAction}>
      {JSON.stringify(state)}
      <AuthTitle
        title="Register"
        subtitle="Already have an account?"
        href="/login"
        linkText="Login"
      />
      <Input type="email" name="email" label="Email" />
      <Input type="password" name="password" label="Password" />
      <SubmitButton>Login</SubmitButton>
    </Form>
  );
}
