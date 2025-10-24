import { Medias_USER, MediaType } from "@/app/generated/prisma";

export type UploadedMediasTypes = {
  medias?: {
    id: string;
    createdAt: Date;
    reactions: {
      user: {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      };
    }[];
    _count: {
      comments: number;
      reactions: number;
    };
    url: string;
    type: MediaType;
  }[];
};
