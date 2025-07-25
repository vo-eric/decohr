"use client";

import { House } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import { NavAuthButton } from "~/components/ui/nav-auth-button";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="fixed flex w-full items-center justify-between bg-[#87bba2] px-6 py-2">
      <div className="flex h-full items-center gap-7">
        <Link className="flex h-full items-center text-xl" href="/">
          deco
          <House />r
        </Link>
        <Link href="/taste-profile" className="font-semibold">
          Your taste profile
        </Link>
      </div>
      {
        <div className="flex h-full items-center gap-3">
          {session && <p>Hi, {user?.name.split(" ")[0]}</p>}
          <div className="flex h-full items-center">
            <NavAuthButton />
          </div>
        </div>
      }
    </nav>
  );
}
