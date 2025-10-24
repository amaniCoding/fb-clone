import { PostType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

const prepareReplyReactions = async (postType: PostType, replyId: string) => {
  const rowsPerPage = 7;
  if (postType === "userpost") {
    try {
      const reactions = await prisma.replyReactions_USER_MEDIA.groupBy({
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
      return {
        currentReactionType: "",
        result: result,
      };
    } catch (error) {
      return {};
    }
  }
};

export const getReplies = async (
  postType: PostType,
  postId: string,
  mediaId: string,
  commentId: string,
  page: number
) => {
  const offset = (page - 1) * 7;
  if (postType === "userpost") {
    const count = await prisma.reply_USER_MEDIA.count();
    try {
      const post = await prisma.post_USER.findUnique({
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
                    select: {
                      id: true,
                      content: true,
                      createdAt: true,
                      _count: {
                        select: {
                          reactions: true,
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

      const newReplies = post?.medias[0].comments[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            _reactions: await prepareReplyReactions(postType, reply.id),
          };
        }
      );
      if (newReplies) {
        const result = await Promise.all(newReplies);
        return result;
      }
    } catch (error) {}
  }
};
