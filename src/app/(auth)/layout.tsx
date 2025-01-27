import { auth } from "@/auth";
import Header from "@/components/layout/header";
import Cover from "@/components/ui/cover";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/user/dashboard");
  }
  return (
    <Cover className="flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 flex items-center">{children}</main>
    </Cover>
  );
}
