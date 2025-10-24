import { ExtendedComment } from "@/app/store/slices/commentmodal/post";
import prisma from "../../../../../libs/prisma";
import { PostType } from "@/app/generated/prisma";
const prepareCommentReactions = async (
  postType: PostType,
  commentId: string
) => {
  const rowsPerPage = 7;
  if (postType === "userpost") {
    try {
      const reactions = await prisma.commentReactions_USER.groupBy({
        by: "reactionType",
        _count: {
          reactionType: true,
        },
        where: {
          id: commentId,
        },
      });
      const result = reactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
          totalRows: rxn._count.reactionType,
          totalPages: Math.ceil(rxn._count.reactionType / rowsPerPage),
          loading: false,
          page: 1,
          error: "",
          reactors: [],
        };
      });
    } catch (error) {
      return {};
    }
  }
};

const prepareCommentReplies = (totalRows: number) => {
  const rowsPerPage = 7;
  return {
    totalRows: totalRows,
    totalPages: Math.ceil(totalRows / rowsPerPage),
    loading: false,
    page: 1,
    error: "",
    repliers: [],
  };
};
export const getComments = async (
  postType: PostType,
  postId: string,
  page: number
) => {
  const offset = (page - 1) * 7;
  if (postType === "userpost") {
    const count = await prisma.comment_USER.count();
    try {
      const post = await prisma.post_USER.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
          comments: {
            take: 7,
            skip: offset,
            include: {
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
              _count: {
                select: {
                  reactions: true,
                  replies: true,
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
                take: 1,
                orderBy: {
                  createdAt: "desc",
                },
              },
              replies: {
                select: {
                  id: true,
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

                take: 1,
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      });

      const newComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          _reactions: await prepareCommentReactions(postType, comment.id),
          _replies: prepareCommentReplies(comment._count.replies),
        };
      });
      if (newComments) {
        const result = await Promise.all(newComments);
        return result;
      }
    } catch (error) {}
  }
};
