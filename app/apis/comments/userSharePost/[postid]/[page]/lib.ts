import { ReplyType } from "@/app/apis/replies/oUserPost/[postid]/[commentid]/[page]/lib";
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
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.userSharePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      _count: {
        select: {
          comments: true,
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
  });

  const [_count, _post] = await Promise.all([count, post]);
  // greactions can be undefined
  const updatedComments = _post?.comments.map(async (comment) => {
    return {
      ...comment,
      postType: "userSharePost",
      postId: _post.id,

      _gReactions: await commentPreparer.prepareGReactions(comment.id),
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
        replies: [] as ReplyType,
      },
    };
  });
  // reuslt can be undefined
  const result = updatedComments && (await Promise.all(updatedComments));
  return {
    result,
    count: _count?._count.comments,
  };
};
