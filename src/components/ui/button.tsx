import clsx from "clsx";
import { Loader2 } from "lucide-react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export default function Button({
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = clsx(className);
  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {disabled && <Loader2 className="mr-2" />} {children}
    </button>
  );
}
