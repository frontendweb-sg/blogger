import Container from "../ui/container";
import { ThemeButton } from "../ui/theme-button";
import Logo from "./logo";
import Navigation from "./navigation";

export default function Header() {
  return (
    <header className="w-full">
      <Container className="flex items-center justify-between h-16">
        <Logo />
        <Navigation />
      </Container>
    </header>
  );
}
