export type AuthTitleProps = React.PropsWithChildren<{}> & {};
export default function AuthTitle({ children }: AuthTitleProps) {
  return <h1 className="text-3xl font-bold text-center">{children}</h1>;
}
