import { GReaction, Reactor } from "@/app/apis/types";
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
export const getReplies = async (
  postId: string,
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
  });

  const post = prisma.oGroupPost.findUnique({
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
            },
          },
        },
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);

  const updatedReplyReplies = _post?.comments[0].replies[0].replies.map(
    async (reply) => {
      return {
        ...reply,
        postType: "oGroupPost",
        _gReactions: await commentPreparer.prepareGReactions(reply.id),
        _reactions: {
          header: {
            loading: false,
            currentReactionType: undefined,
            gReactions: [] as GReaction[],
            error: "",
          },
          body: [] as Reactor[],
        },
      };
    }
  );
  // reuslt can be undefined
  const result =
    updatedReplyReplies && (await Promise.all(updatedReplyReplies));
  return {
    result,
    count: _count?.comments[0].replies[0]._count.replies,
  };
};
