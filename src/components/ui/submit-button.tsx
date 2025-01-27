import { useFormStatus } from "react-dom";
import Button, { ButtonProps } from "./button";

export type SubmitButtonProps = ButtonProps & {};
export default function SubmitButton({ children, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" {...rest}>
      {children}
    </Button>
  );
}
