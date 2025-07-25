import { headers } from "next/headers";
import { ImageRatingPage } from "~/components/ImageRatingPage";
import SplashPage from "~/components/ui/splash-page";
import { auth } from "~/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: new Headers(await headers()),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#c9e4ca]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        {session ? (
          <ImageRatingPage userId={session.user.id} />
        ) : (
          <SplashPage />
        )}
      </div>
    </main>
  );
}
