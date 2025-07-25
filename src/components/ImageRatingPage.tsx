"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { Heart, HeartOff } from "lucide-react";
import { trpc } from "~/app/_trpc/client";
import clsx from "clsx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ImageRatingPage({ userId }: { userId: string }) {
  const router = useRouter();
  const { data: user } = trpc.users.getUser.useQuery({ userId });

  const [offset, setOffset] = useState(0);
  const [allImages, setAllImages] = useState<NonNullable<typeof images>>([]);
  const [hasMore, setHasMore] = useState(true);
  const processedOffsets = useRef<Set<number>>(new Set());

  const { data: images, isPending } = trpc.images.getImages.useQuery({
    userId,
    limit: 10,
    offset,
  });

  const recordResponse = trpc.likes.recordImageResponse.useMutation({
    onSuccess: () => {
      setIndex((prev) => prev + 1);
    },
  });
  const updateUserLikes = trpc.users.updateUserLikes.useMutation();
  const analyzeTasteProfile = trpc.users.analyzeTasteProfile.useMutation({
    onSuccess: () => {
      toast.success("Taste profile generated!");
    },
  });
  const { data: likes } = trpc.likes.getLikesCount.useQuery(userId);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (processedOffsets.current.has(offset)) {
      return;
    }

    if (images && images.length > 0) {
      processedOffsets.current.add(offset);

      setAllImages((prev) => {
        const newImages = images.filter(
          (newImg) => !prev.some((existingImg) => existingImg.id === newImg.id),
        );
        return [...prev, ...newImages];
      });
    }

    if (images && images.length < 10) {
      setHasMore(false);
    }
  }, [images]);

  useEffect(() => {
    if (index >= allImages.length - 5 && hasMore && !isPending) {
      setOffset((prev) => prev + 10);
    }
  }, [index, allImages.length, hasMore, isPending, offset]);

  const image = allImages[index];

  const tasteProfileSection = useMemo(() => {
    const hasRatedEnough =
      (recordResponse.data && recordResponse.data >= 5) ??
      (likes && likes >= 5);

    if (!hasRatedEnough) {
      return null;
    }

    return (
      <div className={clsx("flex items-center justify-center gap-2")}>
        {analyzeTasteProfile.isSuccess
          ? "Your taste profile is ready!"
          : user?.tasteProfile
            ? "Regenerate your taste profile"
            : "Ready to generate your taste profile?"}

        {analyzeTasteProfile.isSuccess ? (
          <button
            className="cursor-pointer rounded-md bg-[#55828b] p-2 text-white transition duration-300 hover:bg-[#55828b]/80"
            onClick={() => router.push("/taste-profile")}
          >
            Go to your taste profile
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-md bg-[#55828b] p-2 text-white transition duration-300 hover:bg-[#55828b]/80"
            onClick={handleGenerateClick}
          >
            {analyzeTasteProfile.isPending
              ? "Generating..."
              : user?.tasteProfile
                ? "Regenerate"
                : "Generate"}
          </button>
        )}
      </div>
    );
  }, [
    recordResponse.data,
    likes,
    analyzeTasteProfile.isSuccess,
    analyzeTasteProfile.isPending,
    user?.tasteProfile,
    router,
  ]);

  async function handleClick(
    userId: string,
    imageId: string,
    isLiked: boolean,
  ) {
    recordResponse.mutate({ userId, imageId, isLiked });
    updateUserLikes.mutate({ userId, imageId, isLiked });
  }
  console.log("images", images);
  async function handleGenerateClick() {
    if (recordResponse.data && recordResponse.data < 5) {
      return;
    }
    analyzeTasteProfile.mutate({ userId: user?.id ?? "" });
  }

  if (isPending && allImages.length === 0) {
    return <div>Fetching images...</div>;
  }

  if (!image) {
    return <div>No more images available</div>;
  }

  return (
    <div className="grid h-[60vh] w-[80%] grid-cols-3 grid-rows-[40px_1fr] gap-4">
      <div className="col-span-3 h-[60px]">{tasteProfileSection}</div>
      <div className="col-span-1">
        <div className="bg-col flex flex-col gap-2">
          {image.styles.map((style) => {
            return (
              <details key={style.style}>
                <summary>{style.style}</summary>
                <ul>
                  {style.elements.map((element) => {
                    return <li key={element}>{element}</li>;
                  })}
                </ul>
              </details>
            );
          })}
        </div>
      </div>
      <div className="relative col-span-2 items-center justify-center overflow-hidden rounded-xl bg-[#87bba2]/20">
        <Image
          src={image.imageUrl}
          alt={image.styles[0]!.style}
          width={0}
          height={0}
          sizes="100vw"
          fill
          className="object-contain"
        />
        <div className="absolute bottom-4 left-[50%] z-10 flex w-[40%] translate-x-[-50%] justify-between">
          <button
            className="cursor-pointer rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-sm transition duration-300 hover:bg-white/90 hover:shadow-xl"
            onClick={() => handleClick(user?.id ?? "", image.id, false)}
          >
            <HeartOff
              size={36}
              className="text-[#3b6064] transition duration-300 hover:-rotate-12 hover:text-[#87bba2]"
            />
          </button>
          <button
            className="cursor-pointer rounded-full bg-white/70 p-2 shadow-lg backdrop-blur-sm transition duration-300 hover:bg-white/90 hover:shadow-xl"
            onClick={() => handleClick(user?.id ?? "", image.id, true)}
          >
            <Heart
              size={36}
              className="text-[#3b6064] transition duration-300 hover:rotate-12 hover:text-red-500"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
