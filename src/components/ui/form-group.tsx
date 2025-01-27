import clsx from "clsx";
import { Box } from "./box";

export type FormGroupProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  noGutter?: boolean;
};
export function FormGroup({
  noGutter = false,
  children,
  className,
  ...rest
}: FormGroupProps) {
  return (
    <Box as="div" className={clsx(!noGutter && "mb-3", className)} {...rest}>
      {children}
    </Box>
  );
}
