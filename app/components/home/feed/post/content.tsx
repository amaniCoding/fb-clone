"use client";

import { Medias_USER } from "@/app/generated/prisma";
import Medias from "./Medias";
export default function Content({
  content,
  medias,
}: {
  content: string | null;
  medias: Medias_USER[];
}) {
  return (
    <div>
      <p className=" px-3.5 my-2">{content}</p>
      {/** image */}
      <Medias medias={medias} />
    </div>
  );
}
