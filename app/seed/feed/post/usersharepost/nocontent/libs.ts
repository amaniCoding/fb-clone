import prisma from "@/app/libs/prisma";
import {
  getPostMediaType,
  getRandomMedia,
  getRandomPost,
  getRandomPostText,
  getRandomSharedPostType,
  getRandomUser,
} from "@/app/seed/libs";

export async function _seeder() {
  const user = await getRandomUser();
  const postSharedType = getRandomSharedPostType() as
    | "user"
    | "page"
    | "group"
    | "media";

  const rPostMediaType = getPostMediaType();
  const postOrMedia =
    postSharedType === "user" ||
    postSharedType === "page" ||
    postSharedType === "group"
      ? await getRandomPost(postSharedType)
      : await getRandomMedia(rPostMediaType);
  return prisma.feed.create({
    data: {
      postType: "user",
      userPost: {
        create: {
          postType: "share",
          userSharePost: {
            create: {
              user: {
                connect: {
                  id: user.id,
                },
              },

              shareWhat: postSharedType as "user" | "page" | "group" | "media",
              oUserPost:
                postSharedType === "user" && postOrMedia
                  ? {
                      connect: {
                        id: postOrMedia.id,
                      },
                    }
                  : undefined,

              oPagePost:
                postSharedType === "page" && postOrMedia
                  ? {
                      connect: {
                        id: postOrMedia.id,
                      },
                    }
                  : undefined,

              oGroupPost:
                postSharedType === "group" && postOrMedia
                  ? {
                      connect: {
                        id: postOrMedia.id,
                      },
                    }
                  : undefined,

              media:
                postSharedType === "media" && postOrMedia
                  ? {
                      connect: {
                        id: postOrMedia.id,
                      },
                    }
                  : undefined,

              content: null,
            },
          },
        },
      },
    },
  });
}
