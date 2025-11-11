import { GReaction, Reactor } from "@/app/apis/types";
import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  postId: string,
  commentId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.pageSharePost.findUnique({
    where: {
      id: postId,
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
  });

  const post = prisma.pageSharePost.findUnique({
    where: {
      id: postId,
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
  });

  const [_count, _post] = await Promise.all([count, post]);
  // greactions can be undefined
  const updatedReactors = _post?.comments[0].reactions.map((reactor) => {
    return {
      ...reactor,
      postId: _post.id,
      commentId: _post.comments[0].id,
    };
  });
  // reuslt can be undefined
  return {
    result: updatedReactors,
    count: _count?.comments[0]._count.reactions,
  };
};
