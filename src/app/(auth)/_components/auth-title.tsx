import Link, { LinkProps } from "next/link";
import { Url, UrlObject } from "url";

export type AuthTitleProps = React.PropsWithChildren<{}> & {
  title?: string;
  subtitle?: string;
  linkProps?: Omit<LinkProps, "href">;
  href: UrlObject | Url | string;
  linkText?: string;
};
export default function AuthTitle({
  children,
  linkProps,
  title,
  href = "/login",
  subtitle,
  linkText = "Login",
}: AuthTitleProps) {
  return (
    <div className="auth-title">
      <h1>{title}</h1>
      <p>
        {subtitle}, please click{" "}
        <Link href={href} {...linkProps}>
          {linkText}
        </Link>
      </p>
      {children}
    </div>
  );
}
