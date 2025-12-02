import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.mediaCommentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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

    const isReactedByMe = await prisma.commentReaction.findFirst({
      where: {
        commentId: id,
        userId: session?.user.id,
      },
      select: {
        commentId: true,
        reactionType: true,
      },
    });

    if (isReactedByMe?.commentId) {
      return {
        isReacted: true,
        reactionType: isReactedByMe.reactionType,
      };
    }
  },
};
export const getComments = async (
  postId: string,
  mediaId: string,
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
        select: {
          _count: {
            select: {
              comments: {
                where: {
                  id: mediaId,
                },
              },
            },
          },
        },
      },
    },
  });

  const post = prisma.oPagePost.findUnique({
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
  // greactions can be undefined
  const updatedComments = _post?.medias[0].comments.map(async (comment) => {
    return {
      ...comment,
      mediaId: _post.medias[0].id,
      postId: _post.id,

      postType: "oPagePost",
      _gReactions: await commentPreparer.prepareGReactions(comment.id),
      isReacted: await commentPreparer.isReacted(comment.id),
    };
  });
  // reuslt can be undefined
  const result = updatedComments && (await Promise.all(updatedComments));
  return {
    result,
    count: _count?.medias[0]._count.comments,
  };
};
