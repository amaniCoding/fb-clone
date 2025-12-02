import { GReaction, Reactor } from "@/app/api/types";
import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  postId: string,
  mediaId: string,
  commentId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.oGroupPost.findUnique({
    where: {
      id: postId,
    },
    select: {
      medias: {
        where: {
          id: mediaId,
        },
        select: {
          comments: {
            where: {
              id: commentId,
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
      },
    },
  });

  const post = prisma.oGroupPost.findUnique({
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
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              reactions: {
                where: {
                  reactionType: reactionType,
                },
                take: rowsPerPage,
                skip: skip,
                select: {
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
                  reactionType: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);
  // greactions can be undefined
  const updatedReactors = _post?.medias[0].comments[0].reactions.map(
    (reactor) => {
      return {
        ...reactor,
        postId: _post.id,
        mediaId: _post.medias[0].id,
        commentId: _post.medias[0].comments[0].id,
      };
    }
  );
  // reuslt can be undefined
  return {
    result: updatedReactors,
    count: _count?.medias[0].comments[0]._count.reactions,
  };
};
