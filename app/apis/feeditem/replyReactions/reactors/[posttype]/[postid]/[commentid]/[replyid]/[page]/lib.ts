import { ExtendedComment } from "@/app/store/slices/commentmodal/post";
import prisma from "../../../../../../libs/prisma";
import { PostType } from "@/app/generated/prisma";
const prepareReplyReactions = async (postType: PostType, replyId: string) => {
  const rowsPerPage = 7;
  if (postType === "userpost") {
    try {
      const reactions = await prisma.replyReactions_USER.groupBy({
        by: "reactionType",
        _count: {
          reactionType: true,
        },
        where: {
          id: replyId,
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
        };
      });
    } catch (error) {
      return {};
    }
  }
};

export const getReplies = async (
  postType: PostType,
  postId: string,
  commentId: string,
  page: number
) => {
  const offset = (page - 1) * 7;
  if (postType === "userpost") {
    const count = await prisma.reply_USER.count();
    try {
      const post = await prisma.post_USER.findUnique({
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
                  reactions: {
                    take: 1,
                    orderBy: {
                      createdAt: "desc",
                    },
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
                  },
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
      });

      const newReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          _reactions: await prepareReplyReactions(postType, reply.id),
        };
      });
      if (newReplies) {
        const result = await Promise.all(newReplies);
        return result;
      }
    } catch (error) {}
  }
};
