import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
const replyPreparer = {
  prepareGReactions: async (replyId: string) => {
    try {
      const r = await prisma.replyReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyId: replyId,
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
  isReacted: async (id: string | undefined) => {
    const session = await auth();

    const isReactedByMe = await prisma.replyReaction.findFirst({
      where: {
        replyId: id,
        userId: session?.user.id,
      },
      select: {
        replyId: true,
        reactionType: true,
      },
    });

    if (isReactedByMe?.replyId) {
      return {
        isReacted: true,
        reactionType: isReactedByMe.reactionType,
      };
    }
  },
};
export const getReplies = async (
  postId: string,
  commentId: string,
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
          _count: {
            select: {
              replies: true,
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
            take: rowsPerPage,
            skip: skip,
            select: {
              id: true,
              content: true,
              createdAt: true,
              mediaUrl: true,
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

              reactions: {
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
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
              // first commentors
              replies: {
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
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
              // counts
              _count: {
                select: {
                  replies: true,
                  reactions: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);

  const updatedReplies = _post?.comments[0].replies.map(async (reply) => {
    return {
      ...reply,
      postType: "userSharePost",
      postId: _post.id,
      commentId: _post.comments[0].id,
      _gReactions: await replyPreparer.prepareGReactions(reply.id),
    };
  });
  // reuslt can be undefined
  const result = updatedReplies && (await Promise.all(updatedReplies));
  return {
    result,
    count: _count?.comments[0]._count.replies,
  };
};
