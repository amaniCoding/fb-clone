import prisma from "@/app/libs/prisma";

export const aggregateReactions = async (postId: string) => {
  try {
    const reactions = await prisma.postReactions_USER.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
    });
    return reactions;
  } catch (error) {
    return null;
  }
};

export const getpost_users = async () => {
  const posts_users = await prisma.post_USER.findMany({
    include: {
      medias: true,
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
          comments: true,
          reactions: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (posts_users.length > 0) {
    return posts_users.map(async (post) => {
      return {
        ...post,
        reactions_grouped: await aggregateReactions(post.id),
      };
    });
  } else {
    return [];
  }
};
