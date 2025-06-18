"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const { data: user } = trpc.users.getUser.useQuery({
    userId: "11f94639-ae67-42b4-85ee-fe6cd4e4ac87",
  });
  const tasteProfile = user?.tasteProfile;
  const likes = user?.likes as Record<string, number>;
  const [images, setImages] = useState<string[]>([]);
  const generateImage = trpc.images.generateImage.useMutation({
    onSuccess: (data) => {
      if (data) {
        setImages((prev) => [...prev, data]);
      }
    },
  });

  if (!tasteProfile) {
    return <div>No taste profile found</div>;
  }

  async function handleClick() {
    generateImage.mutate({
      userId: "11f94639-ae67-42b4-85ee-fe6cd4e4ac87",
      tasteProfile: likes,
    });
  }

  return (
    <div>
      <p>{tasteProfile}</p>
      <button
        className="rounded-md bg-blue-500 p-2 text-white"
        onClick={handleClick}
      >
        Generate Image
      </button>
      <div className="relative h-[400px] w-auto">
        {images[0] && (
          <Image
            src={images[0]}
            alt="Generated Image"
            width={0}
            height={0}
            sizes="100vw"
            fill
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
