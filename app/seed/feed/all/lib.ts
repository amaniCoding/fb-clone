import prisma from "@/app/libs/prisma";
import {
  getRandomPostComment,
  getRandomReactionType,
  getRandomUser,
} from "../libs";
import { ReactionType } from "@/app/generated/prisma";
import { promise } from "zod";

export const _seedUserPost = async () => {
  const ids = await prisma.userPost.findMany({
    select: {
      id: true,
    },
  });

  const UPDATE = ids.map(async (id) => {
    const user = await getRandomUser();
    const comment = getRandomPostComment();
    const reply = getRandomPostComment();
    const reactionType = getRandomReactionType() as ReactionType;

    const medias = await prisma.media.findMany({
      where: {
        userPostId: id.id,
      },
      select: {
        id: true,
      },
    });

    const update1 = prisma.userPost.update({
      where: {
        id: id.id,
      },
      data: {
        comments: {
          create: {
            content: comment,
            user: {
              connect: {
                id: user.id,
              },
            },
            reactions: {
              create: {
                reactionType,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
            replies: {
              create: {
                content: reply,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
          },
        },
        medias: {
          update: {
            where: {
              id: id.id,
            },
            data: {
              comments: {
                create: {
                  content: "hell",
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

    const update2 = medias.map((media) => {
      return prisma.media.update({
        where: {
          id: media.id,
        },
        data: {
          comments: {
            create: {
              content: comment,
              user: {
                connect: {
                  id: user.id,
                },
              },
              reactions: {
                create: {
                  reactionType,
                  user: {
                    connect: {
                      id: user.id,
                    },
                  },
                },
              },
              replies: {
                create: {
                  content: reply,
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
      });
    });
    return Promise.all([update1, Promise.all(update2)]);
  });

  return await Promise.all(UPDATE);
};
