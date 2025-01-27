import Header from "@/components/layout/header";
import Cover from "@/components/ui/cover";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Cover className="flex flex-col bg-black text-white">
      <Header />
      <main className="flex-1 flex items-center">{children}</main>
    </Cover>
  );
}
