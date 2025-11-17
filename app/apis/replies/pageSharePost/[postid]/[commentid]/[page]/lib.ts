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
              replies: true,
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
  });

  const [_count, _post] = await Promise.all([count, post]);

  const updatedReplies = _post?.comments[0].replies.map(async (reply) => {
    return {
      ...reply,
      postId: _post.id,
      commentId: _post.comments[0].id,
      postType: "pageSharePost",
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
      replies: {
        loading: false,
        page: 1,
        totalPages: 0,
        totalRows: 0,
        replies: [],
      },
    };
  });
  // reuslt can be undefined
  const result = updatedReplies && (await Promise.all(updatedReplies));
  return {
    result,
    count: _count?.comments[0]._count.replies,
  };
};
const result = await getReplies("pid", "cid", 1, 7);
const replies = result.result;
export type OPageSharePostRepliesType = typeof replies;
