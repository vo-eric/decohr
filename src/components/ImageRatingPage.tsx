"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, HeartOff } from "lucide-react";
import { trpc } from "~/app/_trpc/client";
import { useSession } from "~/lib/auth-client";

export function ImageRatingPage() {
  const { data: session } = useSession();

  const user = session?.user;

  const { data: images, isPending } = trpc.images.getImages.useQuery(
    user?.id ?? "",
  );
  const recordResponse = trpc.likes.recordImageResponse.useMutation({
    onSuccess: () => {
      setIndex((prev) => prev + 1);
    },
  });
  const updateUserLikes = trpc.users.updateUserLikes.useMutation();
  /*

  For now, just put the image results in a map where the key is the id and the value is the whole result

  Later, enforce interaction with the image by either setting it to the user liking an image or not
    Only display images that have not been rated yet
    

  */

  const [index, setIndex] = useState(0);
  const image = images?.[index];

  async function handleClick(
    userId: string,
    imageId: string,
    isLiked: boolean,
  ) {
    recordResponse.mutate({ userId, imageId, isLiked });
    updateUserLikes.mutate({ userId, imageId, isLiked });

    //TODO
    //if image is near the end the array, fetch more images

    // if (index === images.length - 5) {
    //   const response = await fetch("/api/images");
    //   const newImages = await response.json();
    //   setImages((prev) => [...prev, ...newImages]);
    // }
  }

  if (isPending) {
    return <div>Fetching images...</div>;
  }

  if (!image) {
    return <div>No image found</div>;
  }
  return (
    <>
      <div className="relative flex h-[60vh] w-[60%] items-center justify-center overflow-hidden rounded-xl bg-[#87bba2]/20">
        <Image
          src={image.imageUrl}
          alt={image.styles[0]!.style}
          width={0}
          height={0}
          sizes="100vw"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex w-[20%] justify-between">
        <button
          className="cursor-pointer"
          onClick={() => handleClick(user?.id ?? "", image.id, false)}
        >
          <HeartOff
            size={36}
            className="text-[#3b6064] transition duration-300 hover:-rotate-35 hover:text-black"
          />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => handleClick(user?.id ?? "", image.id, true)}
        >
          <Heart
            size={36}
            className="text-[#3b6064] transition duration-300 hover:rotate-35 hover:text-red-500"
          />
        </button>
      </div>
    </>
  );
}
