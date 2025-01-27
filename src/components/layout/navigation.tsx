import Link from "next/link";
import { ThemeButton } from "../ui/theme-button";
import { LogInIcon } from "lucide-react";
import { auth } from "@/auth";
import LogoutButton from "../../app/(auth)/_components/logout-button";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="flex flex-end items-center h-16">
      <ul className="flex items-center space-x-4">
        <li>
          {session ? (
            <LogoutButton />
          ) : (
            <Link href="/login" className="flex items-center gap-3">
              <LogInIcon size={24} /> Login
            </Link>
          )}
        </li>
        <li>
          <ThemeButton />
        </li>
      </ul>
    </nav>
  );
}
