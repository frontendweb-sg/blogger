import clsx from "clsx";

interface ContainerProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {}
export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "container sm:w-[1024px] w-[1240px] mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  );
}
