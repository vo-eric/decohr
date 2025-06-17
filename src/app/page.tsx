import { ImageRatingPage } from "~/components/ImageRatingPage";
import type { ImageResult } from "~/data/seed";
import { DecohrAPI } from "~/server/db/db";

export default async function HomePage() {
  const api = new DecohrAPI();
  const userId = "11f94639-ae67-42b4-85ee-fe6cd4e4ac87";
  const images: ImageResult[] = await api.getImageProfiles(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#ccd5ae]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <ImageRatingPage {...images} />
      </div>
    </main>
  );
}
