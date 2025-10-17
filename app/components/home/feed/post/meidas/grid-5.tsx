"use client";
import { UploadedMediasTypes } from "./types";

export default function Grid5({ medias }: UploadedMediasTypes) {
  return (
    <div className="w-full h-[28rem]">
      <div className="flex space-x-1.5 w-full h-1/2">
        {medias!.slice(0, 2).map((media, index) => {
          return (
            media.type === "image" && (
              <div
                key={index}
                className="w-1/2 h-full"
                style={{
                  backgroundImage: "url(" + `${media.url}` + ")",
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )
          );
        })}
      </div>
      <div className="flex space-x-1.5 mt-1.5 w-full h-1/2">
        {medias!.slice(2, 6).map((media, index) => {
          return (
            media.type === "image" && (
              <div
                key={index}
                className="w-1/3 h-full"
                style={{
                  backgroundImage: "url(" + `${media.url}` + ")",
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )
          );
        })}
      </div>
    </div>
  );
}
