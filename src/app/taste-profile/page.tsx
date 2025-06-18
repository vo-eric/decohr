"use client";

import { trpc } from "../_trpc/client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const utils = trpc.useUtils();
  const { data: user } = trpc.users.getUser.useQuery({
    userId: "11f94639-ae67-42b4-85ee-fe6cd4e4ac87",
  });
  const tasteProfile = user?.tasteProfile;
  const likes = user?.likes as Record<string, number>;
  const [index, setIndex] = useState(0);
  const { data: generatedImages } = trpc.images.getGeneratedImages.useQuery(
    user?.id ?? "",
  );
  const generateImage = trpc.images.generateImage.useMutation({
    onSuccess: async () => {
      await utils.images.getGeneratedImages.invalidate();
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
        {generatedImages?.length && (
          <Image
            src={generatedImages[index]?.imageUrl ?? ""}
            alt="Generated Image"
            width={0}
            height={0}
            sizes="100vw"
            fill
            className="object-contain"
          />
        )}
      </div>
      <button onClick={() => setIndex(index - 1)}>Prev</button>
      <button onClick={() => setIndex(index + 1)}>Next</button>
    </div>
  );
}
