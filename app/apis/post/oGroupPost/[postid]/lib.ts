import prisma from "@/app/libs/prisma";
const postPreparer = {
  prepareGReactions: async (postId: string) => {
    try {
      const r = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          groupPostId: postId,
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
export const getPost = async (postId: string) => {
  const _post = await prisma.oGroupPost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      content: true,
      medias: true,
      createdAt: true,
      location: true,
      doing: true,
      doingWhat: true,
      postType: true,
      group: {
        select: {
          name: true,
          profilePicture: true,
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
      comments: {
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
          comments: true,
          reactions: true,
        },
      },
    },
  });

  // greactions can be undefined
  const udpatedPost = {
    ..._post,
    _gReactions: await postPreparer.prepareGReactions(_post?.id!),
  };
  return udpatedPost;
};

const result = await getPost("someid");

export type OGroupPostCommentModalType = typeof result;
