import { useFormStatus } from "react-dom";
import Button, { ButtonProps } from "./button";
import clsx from "clsx";

export type SubmitButtonProps = ButtonProps & {};
export default function SubmitButton({
  children,
  className,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={clsx(
        "bg-white text-black font-bold uppercase border border-white w-full rounded-lg p-3 text-sm",
        className
      )}
      disabled={pending}
      type="submit"
      {...rest}
    >
      {children}
    </Button>
  );
}
