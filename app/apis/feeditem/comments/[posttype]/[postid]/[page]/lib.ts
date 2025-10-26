import { ExtendedComment } from "@/app/store/slices/commentmodal/post";
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

      const newComments = post?.comments.map((comment) => {
        return {
          ...comment,
          _reactions: prepareCommentReactions(),
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

const comments = await getComments("userpost", "someid", 1);
export type Comment = typeof comments;
