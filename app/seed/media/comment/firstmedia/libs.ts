import prisma from "@/app/libs/prisma";
import { getRandomPostComment } from "@/app/seed/lib";
import {
  generateSinglePhoto,
  getRandomPostContentOption,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();
  const comment = getRandomPostComment();
  const commentPostOption = getRandomPostContentOption() as
    | "contentonly"
    | "mediasonly"
    | "both";
  return await prisma.oUserPost.update({
    where: {
      id: "someid",
    },
    data: {
      medias: {
        update: {
          where: {
            id: "media_id_in_this_post",
          },
          data: {
            comments: {
              create: {
                content:
                  commentPostOption === "contentonly" ||
                  commentPostOption === "both"
                    ? comment
                    : null,
                mediaUrl:
                  commentPostOption === "both" ||
                  commentPostOption === "mediasonly"
                    ? generateSinglePhoto()
                    : null,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
