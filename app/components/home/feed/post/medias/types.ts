import { MediaType } from "@/app/generated/prisma/client";

export type MediaPropType = {
  medias:
    | {
        id: string;
        createdAt: Date;
        url: string;
        type: MediaType;
      }[]
    | undefined;
};
