"use client";

import { LogOut, LogIn } from "lucide-react";
import { signOut, useSession } from "~/lib/auth-client";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export function NavAuthButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  console.log("sesh", session);

  if (!session) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/login")}
        className="cursor-pointer"
      >
        Log in <LogIn className="size-4" />
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={handleLogout} className="cursor-pointer">
      Logout <LogOut className="size-4" />
    </Button>
  );
}
