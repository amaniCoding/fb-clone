"use client";

import { UploadedMediasTypes } from "./uploadedmedias/types";
import Grid3 from "./uploadedmedias/grid-3";
import Grid4 from "./uploadedmedias/grid-4";
import Grid5 from "./uploadedmedias/grid-5";
import Grid2 from "./uploadedmedias/grid-4";
import GridMore from "./uploadedmedias/grid-more";

export default function UploadedMedias({
  uploadedMedias,
}: UploadedMediasTypes) {
  return (
    <div className={`w-full rounded-xl bg-amber-200`}>
      {/* {uploadedMedias!.length} */}
      {uploadedMedias!.length === 1 && uploadedMedias![0].type === "image" && (
        <div
          className="w-full"
          style={{
            backgroundImage: "url(" + `${uploadedMedias![0].url}` + ")",
            backgroundPosition: "top center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
      {uploadedMedias!.length === 2 && (
        <Grid2 uploadedMedias={uploadedMedias} />
      )}
      {uploadedMedias!.length === 3 && (
        <Grid3 uploadedMedias={uploadedMedias} />
      )}
      {uploadedMedias!.length === 4 && (
        <Grid4 uploadedMedias={uploadedMedias} />
      )}
      {uploadedMedias!.length === 5 && (
        <Grid5 uploadedMedias={uploadedMedias} />
      )}
      {uploadedMedias!.length > 5 && (
        <GridMore uploadedMedias={uploadedMedias} />
      )}
    </div>
  );
}
