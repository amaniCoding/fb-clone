"use client";
import Image from "next/image";
import { UploadedMediasTypes } from "./types";

export default function GridMore({ uploadedMedias }: UploadedMediasTypes) {
  const overFlow = uploadedMedias!.length - 5;
  return (
    <div className="w-full">
      <div className="flex space-x-2 w-full">
        {uploadedMedias!.slice(0, 2).map((media, index) => (
          <div key={index} className="w-1/2 h-64">
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
      <div className="flex space-x-2 mt-2 w-full h-1/2">
        {uploadedMedias!.slice(2, 5).map((media, index) => (
          <div key={index} className=" h-1/2 grow relative">
            {index === 2 && (
              <div className=" absolute top-0 left-0 bottom-0 right-0 z-10 bg-black/20 flex items-center justify-center">
                <p className="text-white  text-5xl">{`+${overFlow}`}</p>
              </div>
            )}
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
