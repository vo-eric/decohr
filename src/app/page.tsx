import { headers } from "next/headers";
import { ImageRatingPage } from "~/components/ImageRatingPage";
import SplashPage from "~/components/ui/splash-page";
import { auth } from "~/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });

  console.log("session in main", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#c9e4ca]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {session ? <ImageRatingPage /> : <SplashPage />}
      </div>
    </main>
  );
}
