import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Container from "@/components/ui/container";
import Cover from "@/components/ui/cover";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Cover className="flex flex-col">
      <Header />
      <Container className="flex-1 ">{children}</Container>
      <Footer />
    </Cover>
  );
}
