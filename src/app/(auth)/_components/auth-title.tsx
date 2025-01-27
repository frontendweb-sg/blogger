import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { Url, UrlObject } from "url";

export type AuthTitleProps = React.PropsWithChildren & {
  title?: string;
  subtitle?: string;
  linkProps?: Omit<LinkProps, "href">;
  href: UrlObject | Url | string;
  linkText?: string;
  className?: string;
};
export default function AuthTitle({
  children,
  linkProps,
  title,
  href = "/login",
  subtitle,
  linkText = "login",
  className,
}: AuthTitleProps) {
  return (
    <div className={clsx("mb-8 block", className)}>
      <h1 className="text-[28px]">{title}</h1>
      <p className="text-xs text-gray-300 font-light mb-2">
        {subtitle}, please click{" "}
        <Link className="text-red-500" href={href} {...linkProps}>
          {linkText}
        </Link>
      </p>
      {children}
    </div>
  );
}
