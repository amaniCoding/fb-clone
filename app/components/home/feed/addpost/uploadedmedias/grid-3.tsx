"use client";
import Image from "next/image";
import { UploadedMediasTypes } from "./types";

export default function Grid3({ uploadedMedias }: UploadedMediasTypes) {
  return (
    <div className="flex space-x-1.5 w-full">
      <div className="w-[70%]">
        {uploadedMedias![0].type === "image" && (
          <Image
            alt="Amanuel Ferede"
            src={uploadedMedias![0].url}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="w-[30%] flex flex-col space-y-2">
        {uploadedMedias!.slice(1, 3).map((media, index) => (
          <div key={index} className="w-full grow bg-amber-50">
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
    </div>
  );
}
