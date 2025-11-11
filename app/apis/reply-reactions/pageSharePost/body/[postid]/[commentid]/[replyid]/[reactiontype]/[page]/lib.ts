import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  postId: string,
  commentId: string,
  replyId: string,
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
          replies: {
            where: {
              id: replyId,
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
          replies: {
            where: {
              id: replyId,
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
  const updatedReactors = _post?.comments[0].replies[0].reactions.map(
    (reactor) => {
      return {
        ...reactor,
        postType: "pageSharePost",

        postId: _post.id,
        commentId: _post.comments[0].id,
        replyId: _post.comments[0].replies[0].id,
      };
    }
  );
  // reuslt can be undefined
  return {
    result: updatedReactors,
    count: _count?.comments[0].replies[0]._count.reactions,
  };
};
