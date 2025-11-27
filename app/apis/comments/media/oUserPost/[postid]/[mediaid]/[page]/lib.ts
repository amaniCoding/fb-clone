import { ReplyType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/lib";
import { GReaction, Reactor } from "@/app/apis/types";
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
};
export const getComments = async (
  postId: string,
  mediaId: string,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.oUserPost.findUnique({
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

  const post = prisma.oUserPost.findUnique({
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

      postType: "oUserPost",
      _gReactions: await commentPreparer.prepareGReactions(comment.id),
    };
  });
  // reuslt can be undefined
  const result = updatedComments && (await Promise.all(updatedComments));
  return {
    result,
    count: _count?.medias[0]._count.comments,
  };
};

const result = await getComments("someid", "somemediaid", 1, 7);
const comment = result.result;
export type MediaCommentType = typeof comment;
