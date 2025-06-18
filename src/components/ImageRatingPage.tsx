"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, HeartOff } from "lucide-react";
import { trpc } from "~/app/_trpc/client";

/*




const fetchImages = async (userId: string): Promise<ImageResult[]> => {
  const images = await trpc.getImages.query(userId);
  return images;
};


  const userId = "11f94639-ae67-42b4-85ee-fe6cd4e4ac87";
  const images: ImageResult[] = await fetchImages(userId);


*/

export function ImageRatingPage() {
  const userId = "11f94639-ae67-42b4-85ee-fe6cd4e4ac87";
  const { data: images, isPending } = trpc.images.getImages.useQuery(userId);
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

  /*

  handeclick
    if index == 15
      trpc.getimages.useQuery(userId)

  */

  //NOTE: hardcoded user for now

  /*

  we don't need to map over all images since it'll just be showing one at a time
  have state for the current image index?
    what happens when we fetch more images? what to do about the images array?
      have state be a modulo of the number of images we're fetching at each batch?
  */

  async function handleClick(
    userId: string,
    imageId: string,
    isLiked: boolean,
  ) {
    recordResponse.mutate({ userId, imageId, isLiked });
    updateUserLikes.mutate({ userId, imageId, isLiked });

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
      <div className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden rounded-xl bg-[#e9edc9]/20">
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
      <div className="flex justify-between">
        <button onClick={() => handleClick(userId, image.id, false)}>
          <HeartOff />
        </button>
        <button onClick={() => handleClick(userId, image.id, true)}>
          <Heart />
        </button>
      </div>
    </>
  );
}
