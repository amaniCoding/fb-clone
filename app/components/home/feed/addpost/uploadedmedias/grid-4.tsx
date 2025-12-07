"use client";
import Image from "next/image";
import { UploadedMediasTypes } from "./types";

export default function Grid2({ uploadedMedias }: UploadedMediasTypes) {
  return (
    <div className="w-full">
      <div className="flex space-x-1.5 w-full">
        {uploadedMedias!.slice(0, 2).map((media, index) => (
          <div key={index} className="w-1/2">
            <Image
              alt="Amanuel Ferede"
              src={media.url}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-1.5 mt-2 w-full">
        {uploadedMedias!.slice(2, 5).map((media, index) => (
          <div key={index} className="w-full">
            <Image
              alt="Amanuel Ferede"
              src={media.url}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
