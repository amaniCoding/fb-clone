import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
const replyPreparer = {
  prepareGReactions: async (replyId: string) => {
    try {
      const r = await prisma.mediaReplyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyReplyId: replyId,
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

    const isReactedByMe = await prisma.mediaReplyReplyReactions.findFirst({
      where: {
        replyReplyId: id,
        userId: session?.user.id,
      },
      select: {
        replyReplyId: true,
        reactionType: true,
      },
    });

    if (isReactedByMe?.replyReplyId) {
      return {
        isReacted: true,
        reactionType: isReactedByMe.reactionType,
      };
    }
  },
};
export const getReplies = async (
  postId: string,
  mediaId: string,
  commentId: string,
  replyId: string,
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
              replies: {
                where: {
                  id: replyId,
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
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    select: {
                      id: true,
                      content: true,
                      mediaUrl: true,
                      createdAt: true,
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

                  // counts
                  _count: {
                    select: {
                      reactions: true,
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

  const updatedReplyReplies =
    _post?.medias[0].comments[0].replies[0].replies.map(async (reply) => {
      return {
        ...reply,
        postType: "oGroupPost",
        postId: _post.id,
        commentId: _post.medias[0].comments[0].id,
        mediaId: _post.medias[0].id,
        _gReactions: await replyPreparer.prepareGReactions(reply.id),
      };
    });
  // reuslt can be undefined
  const result =
    updatedReplyReplies && (await Promise.all(updatedReplyReplies));
  return {
    result,
    count: _count?.medias[0].comments[0].replies[0]._count.replies,
  };
};
