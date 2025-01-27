import type { IconNode } from "lucide-react";
import { Icon } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startIcon?: IconNode;
  endIcon?: IconNode;
  error?: string;
  inline?: boolean;
};
export default function Input({
  label,
  startIcon,
  endIcon,
  error,
  inline,
  className,
  ...rest
}: InputProps) {
  return (
    <div
      className={`mb-3 ${
        inline ? "flex flex-row items-center justify-between" : ""
      } ${className}`}
    >
      {label && <label className="mb-1 block text-sm">{label}</label>}
      <div className="rounded-lg border overflow-hidden">
        {startIcon && <Icon iconNode={startIcon} />}
        <input
          className="outline-none text-sm p-3 w-full    text-slate-900"
          {...rest}
        />
        {endIcon && <Icon iconNode={endIcon} />}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
