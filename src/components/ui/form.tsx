import clsx from "clsx";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {};
export default function Form({ className, children, ...rest }: FormProps) {
  const classes = clsx(className);
  return (
    <form className={classes} {...rest} noValidate>
      {children}
    </form>
  );
}
