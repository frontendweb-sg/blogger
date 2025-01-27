import { auth, signIn } from "@/auth";
import Logo from "@/components/layout/logo";
import Cover from "@/components/ui/cover";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <Cover>
      <div className=" w-[560px] max-auto text-center">
        <Logo />
        <h1 className="text-lg font-bold my-5">Welcome to Blogger</h1>
        <p className="text-sm text-black dark:text-white">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
          minima, alias consectetur recusandae repellendus porro obcaecati!
          Aliquid officiis, nostrum odit numquam accusantium cupiditate error
          quia rem eum voluptatibus illum placeat?
          {JSON.stringify(session)}
        </p>
        <div className="flex justify-center mt-5">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </Cover>
  );
}
