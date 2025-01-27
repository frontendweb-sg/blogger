import Container from "../ui/container";

export default function Footer() {
  return (
    <footer className="w-full text-xs text-white text-center p-4">
      <Container>
        <p>
          &copy; {new Date().getFullYear()} All rights reserved, powred by
          frontendweb.in
        </p>
      </Container>
    </footer>
  );
}
