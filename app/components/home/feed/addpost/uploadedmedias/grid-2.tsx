"use client";
import Image from "next/image";
import { UploadedMediasTypes } from "./types";
//
export default function Grid2({ uploadedMedias }: UploadedMediasTypes) {
  return (
    <div className="flex space-x-2 w-full">
      {uploadedMedias!.map((media, index) => (
        <div key={index} className="w-1/2">
          {media.type === "image" && (
            <Image
              alt="Amanuel Ferede"
              src={media.url}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
