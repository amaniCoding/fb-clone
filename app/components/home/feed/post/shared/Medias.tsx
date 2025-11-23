"use client";

import Grid2 from "../medias/grid-2";
import Grid3 from "../medias/grid-3";
import Grid4 from "../medias/grid-4";
import Grid5 from "../medias/grid-5";
import GridMore from "../medias/grid-more";
import { MediaPropType } from "../medias/types";

export default function Medias({ medias }: MediaPropType) {
  return (
    medias && (
      <div className={`w-full ${medias!?.length > 0 ? "h-[28rem]" : "h-auto"}`}>
        {medias!.length === 1 && medias![0].type === "image" && (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url(" + `${medias![0].url}` + ")",
              backgroundPosition: "top center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
        {medias!.length === 2 && <Grid2 medias={medias} />}
        {medias!.length === 3 && <Grid3 medias={medias} />}
        {medias!.length === 4 && <Grid4 medias={medias} />}
        {medias!.length === 5 && <Grid5 medias={medias} />}
        {medias!.length > 5 && <GridMore medias={medias} />}
      </div>
    )
  );
}
