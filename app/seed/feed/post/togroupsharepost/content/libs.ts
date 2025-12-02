import prisma from "@/app/libs/prisma";
import {
  getRandomUser,
  getRandomPage,
  getRandomGroup,
  getRandomSharedPostType,
  getPostMediaType,
  getRandomPost,
  getRandomMedia,
  getRandomPostText,
  getRandomSharer,
} from "@/app/seed/libs";

export async function _seeder() {
  const sharer = await getRandomSharer();
  const user = await getRandomUser();
  const page = await getRandomPage();
  const group = await getRandomGroup();
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
      postType: "group",
      groupPost: {
        create: {
          postType: "share",
          toGroupSharedPost: {
            create: {
              sharer: sharer,
              user:
                sharer === "user"
                  ? {
                      connect: {
                        id: user.id,
                      },
                    }
                  : undefined,

              page:
                sharer === "page"
                  ? {
                      connect: {
                        id: page.id,
                      },
                    }
                  : undefined,
              group: {
                connect: {
                  id: group.id,
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

              content: getRandomPostText(),
            },
          },
        },
      },
    },
  });
}
