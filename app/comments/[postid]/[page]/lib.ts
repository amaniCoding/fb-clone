import prisma from "../../../libs/prisma";
const group_reactions = async (commentId: string) => {
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
          },
        },
      },
    });
    const comments = post?.comments;
    if (comments) {
      const newComments = comments?.map(async (comment) => {
        return {
          ...comment,
          grouped_reactions: await group_reactions(comment.id),
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
