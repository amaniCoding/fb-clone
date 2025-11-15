"use client";

import { MediaPropType } from "./types";

export default function GridMore({ medias }: MediaPropType) {
  const overFlow_medias = medias!.length - 5;

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
        {medias!.slice(2, 5).map((media, index) => {
          return (
            media.type === "image" && (
              <div
                key={index}
                className="w-1/3 h-full grow relative"
                style={{
                  backgroundImage: "url(" + `${media.url}` + ")",
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {index === 2 && (
                  <div className=" absolute top-0 left-0 bottom-0 right-0 z-10 bg-black/20 flex items-center justify-center">
                    <p className="text-white  text-5xl">{`+${overFlow_medias}`}</p>
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
