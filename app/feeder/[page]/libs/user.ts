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
  } catch (error) {}
};

export const getpost_users = async (page: number) => {
  const offset = (page - 1) * 10;
  const posts_users = await prisma.post_USER.findMany({
    take: 10,
    skip: offset,
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
      reactions: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        take: 1,
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
