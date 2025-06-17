"use client";

import { useState } from "react";
import { DUMMY_IMAGE_RESULTS, type ImageResult } from "~/data/seed";
import Image from "next/image";
import { Heart, HeartOff } from "lucide-react";

export function ImageRatingPage() {
  /*

  For now, just put the image results in a map where the key is the id and the value is the whole result

  Later, enforce interaction with the image by either setting it to the user liking an image or not
    Only display images that have not been rated yet
    

  */
  const seedImages = structuredClone(DUMMY_IMAGE_RESULTS);
  const [images, setImages] = useState<ImageResult[]>(seedImages ?? []);
  const [index, setIndex] = useState(0);
  const image = images[index];
  /*

  we don't need to map over all images since it'll just be showing one at a time
  have state for the current image index?
    what happens when we fetch more images? what to do about the images array?
      have state be a modulo of the number of images we're fetching at each batch?
  */

  if (!image) {
    //TODO: add button to fetch images
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
        <button
          onClick={() => setIndex((prev) => prev - 1)}
          disabled={index === 0}
        >
          <HeartOff />
        </button>
        <button
          onClick={() => setIndex((prev) => prev + 1)}
          disabled={index === images.length - 1}
        >
          <Heart />
        </button>
      </div>
    </>
  );
}
