import { GReaction, Reactor } from "@/app/apis/types";
import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: commentId,
        },
      });

      return r.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
    } catch (error) {}
  },
};
export const getReactors = async (
  postId: string,
  commentId: string,
  replyId: string,
  replyReplyId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.userSharePost.findUnique({
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
              replies: {
                where: {
                  id: replyReplyId,
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
      },
    },
  });

  const post = prisma.userSharePost.findUnique({
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
              replies: {
                where: {
                  id: replyReplyId,
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
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);
  // greactions can be undefined
  const updatedReactors =
    _post?.comments[0].replies[0].replies[0].reactions.map((reactor) => {
      return {
        ...reactor,
        postId: _post.id,
        commentId: _post.comments[0].id,
        replyId: _post.comments[0].replies[0].id,
        replyReplyId: _post.comments[0].replies[0].replies[0].id,
        postType: "userSharePost",
      };
    });
  // reuslt can be undefined
  return {
    result: updatedReactors,
    count: _count?.comments[0].replies[0].replies[0]._count.reactions,
  };
};
