import Button from "../../../components/ui/button";
import { logout } from "@/app/(auth)/action";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
