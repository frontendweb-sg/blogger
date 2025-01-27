import clsx from "clsx";
import type { IconNode } from "lucide-react";
import { Icon } from "lucide-react";
import { Box } from "./box";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  startIcon?: IconNode;
  endIcon?: IconNode;
  error?: string;
  inline?: boolean;
  noGutter?: boolean;
  required?: boolean;
};

export default function Input({
  label,
  startIcon,
  endIcon,
  error,
  inline,
  className,
  noGutter,
  required,
  ...rest
}: InputProps) {
  return (
    <Box className={clsx(!noGutter && "mb-4", className)}>
      {label && (
        <label className="mb-2 block text-xs">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={clsx(
          "rounded-lg ring-1 ring-white hover:ring-gray-600",
          error && "ring-red-500 placeholder:text-red-500"
        )}
      >
        {startIcon && <Icon iconNode={startIcon} />}
        <input
          className={clsx(
            "outline-none bg-transparent border-none rounded-lg text-sm p-3 w-full",
            error && "placeholder:text-red-500"
          )}
          {...rest}
        />
        {endIcon && <Icon iconNode={endIcon} />}
      </div>
      {error && (
        <div className="text-[11px] text-red-500 block mt-1">{error}</div>
      )}
    </Box>
  );
}
