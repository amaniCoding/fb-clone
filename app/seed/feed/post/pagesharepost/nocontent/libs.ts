import prisma from "@/app/libs/prisma";
import {
  getRandomPage,
  getRandomSharedPostType,
  getPostMediaType,
  getRandomPost,
  getRandomMedia,
} from "@/app/seed/libs";

export async function _seeder() {
  const page = await getRandomPage();
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
      postType: "page",
      pagePost: {
        create: {
          postType: "share",
          pageSharePost: {
            create: {
              page: {
                connect: {
                  id: page.id,
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
