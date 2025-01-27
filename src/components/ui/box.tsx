type BoxDefaultProps<T> = {
  as?: T;
};

export type BoxProps<T extends React.ElementType> = React.PropsWithChildren<
  BoxDefaultProps<T>
> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxDefaultProps<T>> & {};

export function Box<T extends React.ElementType>({
  as,
  children,
  className,
  ...rest
}: BoxProps<T>) {
  const Component = as || "div";

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}
