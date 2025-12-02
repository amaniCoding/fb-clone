import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  postId: string,
  mediaId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.oPagePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      medias: {
        where: {
          id: mediaId,
        },
        select: {
          _count: {
            select: {
              reactions: {
                where: {
                  reactionType: reactionType,
                },
              },
            },
          },
        },
      },
    },
  });

  const media = prisma.oPagePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      medias: {
        where: {
          id: mediaId,
        },
        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
            where: {
              reactionType: reactionType,
            },
            select: {
              reactionType: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  Profile: {
                    select: {
                      profilePicture: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const [_count, _media] = await Promise.all([count, media]);
  // result can be undefined

  return {
    result: _media?.medias[0].reactions,
    count: _count?.medias[0]._count.reactions,
  };
};
