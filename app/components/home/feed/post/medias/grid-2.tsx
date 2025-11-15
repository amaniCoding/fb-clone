"use client";

import { MediaPropType } from "./types";

export default function Grid2({ medias }: MediaPropType) {
  return (
    <div className="w-full h-[28rem] flex space-x-1.5">
      {medias!.map((media, index) => {
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
  );
}
