import { roboto } from "@/font/font";
import clsx from "clsx";
import Link from "next/link";

export default function Logo() {
  return (
    <div
      className={clsx(
        "space-x-2 py-4 text-black dark:text-white font-black",
        roboto.variable
      )}
    >
      <Link href="/">Blogger</Link>
    </div>
  );
}
