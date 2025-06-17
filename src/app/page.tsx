import { ImageRatingPage } from "~/components/ImageRatingPage";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#ccd5ae]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <ImageRatingPage />
      </div>
    </main>
  );
}
