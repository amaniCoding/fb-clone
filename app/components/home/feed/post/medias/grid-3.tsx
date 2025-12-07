"use client";

import { MediaPropType } from "./types";

export default function Grid3({ medias }: MediaPropType) {
  return (
    <div className="flex space-x-1.5 w-full h-112">
      {medias![0].type === "image" && (
        <div
          className="w-[60%] h-full"
          style={{
            backgroundImage: "url(" + `${medias![0].url}` + ")",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
      <div className="w-[40%] flex flex-col space-y-2">
        {medias!.slice(1, 3).map(
          (media, index) =>
            media.type === "image" && (
              <div
                key={index}
                className="w-full grow bg-amber-50"
                style={{
                  backgroundImage: "url(" + `${media.url}` + ")",
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )
        )}
      </div>
    </div>
  );
}
