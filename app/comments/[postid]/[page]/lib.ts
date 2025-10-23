import { ExtendedComment } from "@/app/store/slices/commentmodal/post";
import prisma from "../../../libs/prisma";
const groupCommentReactions = async (commentId: string) => {
  try {
    const reactions = await prisma.commentReactions_USER.groupBy({
      by: "reactionType",
      _count: {
        reactionType: true,
      },
    });
    return reactions;
  } catch (error) {
    return [];
  }
};

const groupReplyReactions = async (replyId: string) => {
  try {
    const reactions = await prisma.replyReactions_USER.groupBy({
      by: "reactionType",
      _count: {
        reactionType: true,
      },
    });
    return reactions;
  } catch (error) {
    return [];
  }
};
export const getComments = async (postId: string, page: number) => {
  const offset = (page - 1) * 7;
  const count = await prisma.comment_USER.count();
  try {
    const post = await prisma.post_USER.findUnique({
      where: {
        id: postId,
      },
      select: {
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
    const comments = post?.comments;
    if (comments) {
      const newComments = comments?.map(async (comment) => {
        const newReplies = comment.replies.map(async (r) => {
          return {
            ...r,
            grouped_reactions: await groupReplyReactions(r.id),
          };
        });
        return {
          ...comment,
          replies: newReplies,
          grouped_reactions: await groupCommentReactions(comment.id),
        };
      });
      return {
        count: count,
        comments: await Promise.all(newComments),
      };
    }
    return {
      count: 0,
      comments: [],
    };
  } catch (error) {
    return {
      count: 0,
      comments: [],
    };
  }
};
