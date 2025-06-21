"use client";

import { trpc } from "../_trpc/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import ImageSkeleton from "~/components/image-skeleton";
import TextSkeleton from "~/components/ui/text-skeleton";

export default function Page() {
  const utils = trpc.useUtils();
  const { data: session } = useSession();

  const { data: user } = trpc.users.getUser.useQuery({
    userId: session?.user?.id ?? "",
  });

  const tasteProfile = user?.tasteProfile;
  const likes = user?.likes as Record<string, number>;
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { data: generatedImages } = trpc.images.getGeneratedImages.useQuery(
    user?.id ?? "",
  );
  const generateImage = trpc.images.generateImage.useMutation({
    onSuccess: async () => {
      await utils.images.getGeneratedImages.invalidate();
      setIndex(generatedImages!.length);
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleClick(true); // Next
      } else if (event.key === "ArrowLeft") {
        handleClick(false); // Previous
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = (increment: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      if (increment) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex((prev) => prev - 1);
      }
    }, 300);
  };

  async function handleGenerateImageClick() {
    generateImage.mutate({
      userId: user?.id ?? "",
      tasteProfile: likes,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#c9e4ca]">
      <div className="container grid h-full max-h-[80vh] grid-cols-3 grid-rows-1 items-center justify-center gap-16">
        <div className="col-span-1 flex h-full flex-1 flex-grow flex-col gap-6 self-start bg-[#c9e4ca] text-[#364958]">
          <h1 className="text-4xl font-bold">Your Taste Profile</h1>
          {user?.tasteProfile ? (
            <>
              <p className="h-full max-h-[100%] overflow-scroll leading-relaxed">
                {tasteProfile}
              </p>
              <button
                className={clsx(
                  "mt-auto cursor-pointer rounded-md bg-[#55828b] p-2 text-white transition duration-300 hover:bg-[#42656c]",
                  generateImage.isPending && "cursor-not-allowed",
                )}
                disabled={generateImage.isPending}
                onClick={handleGenerateImageClick}
              >
                {generateImage.isPending ? "Generating..." : "Generate Image"}
              </button>
            </>
          ) : (
            <TextSkeleton />
          )}
        </div>
        <div className="col-span-2 flex-2 rounded-2xl bg-[#87bba2]/20">
          <div className="relative h-[800px] w-auto">
            {generatedImages && generatedImages.length > 0 ? (
              <Image
                src={
                  generatedImages[Math.abs(index) % generatedImages.length]
                    ?.imageUrl ?? ""
                }
                alt="Generated Image"
                width={0}
                height={0}
                sizes="100vw"
                fill
                className={clsx(
                  "rounded-md object-contain px-10 transition-opacity duration-300",
                  isTransitioning ? "opacity-0" : "opacity-100",
                )}
              />
            ) : (
              <ImageSkeleton />
            )}
            {generatedImages && generatedImages.length > 1 && (
              <>
                <button
                  className="absolute flex h-full w-[40px] cursor-pointer items-center justify-center rounded-l-2xl transition duration-300 hover:bg-[#87bba2]/10"
                  onClick={() => handleClick(false)}
                >
                  <ChevronLeftIcon className="h-12 w-12 text-[#55828b]" />
                </button>
                <button
                  className="absolute right-0 flex h-full w-[40px] cursor-pointer items-center justify-center rounded-r-2xl transition duration-300 hover:bg-[#87bba2]/10"
                  onClick={() => handleClick(true)}
                >
                  <ChevronRightIcon className="h-12 w-12 text-[#55828b]" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
