import prisma from "../../../../../../libs/prisma";
import { PostType } from "@/app/generated/prisma";
import {
  ReactionModalHeader,
  ReactionModalReactors,
} from "@/app/apis/feeder/[page]/libs/user";
const prepareCommentReactions = () => {
  return {
    currentReactionType: "",
    header: {
      loading: true,
      reactions: [] as ReactionModalHeader[],
    },
    reactors: [] as ReactionModalReactors[],
  };
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

const prepareGroupedCommentReactions = async (commentId: string) => {
  try {
    const _grouped_reactions = await prisma.commentReactions_USER.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: commentId,
      },
    });

    const result = _grouped_reactions.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });
    return result;
  } catch (error) {}
};
export const getComments = async (
  postType: PostType,
  postId: string,
  page: number
) => {
  const offset = (page - 1) * 7;
  if (postType === "userpost") {
    try {
      const post = await prisma.post_USER.findUnique({
        where: {
          id: postId,
        },
        select: {
          comments: {
            take: 7,
            skip: offset,
            orderBy: {
              reactions: {
                _count: "desc",
              },
            },
            select: {
              id: true,
              content: true,
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
          _reactions: prepareCommentReactions(),
          _grouped_reactions: await prepareGroupedCommentReactions(comment.id),
          _replies: prepareCommentReplies(comment._count.replies),
        };
      });
      if (newComments) {
        const result = await Promise.all(newComments);
        console.log("REACTIONSSSSSSSSS", result[0]._count.reactions);
        return result;
      }
    } catch (error) {}
  }
};

const comments = await getComments("userpost", "someid", 1);
export type Comment = typeof comments;
