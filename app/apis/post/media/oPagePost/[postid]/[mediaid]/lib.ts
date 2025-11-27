import prisma from "@/app/libs/prisma";
const mediaPreparer = {
  prepareGReactions: async (id: string) => {
    try {
      const r = await prisma.mediaReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          mediaId: id,
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
export const getMediaInfo = async (postId: string, mediaId: string) => {
  const media = prisma.oPagePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      medias: {
        where: {
          id: mediaId,
        },
        select: {
          id: true,
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
      },
    },
  });

  const medias = prisma.oPagePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      medias: {
        select: {
          id: true,
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
      },
    },
  });

  const [_media, _medias] = await Promise.all([media, medias]);
  // greactions can be undefined
  const updatedMedia = {
    ..._media?.medias[0],
    postId: _media?.id,
    _gReactions: await mediaPreparer.prepareGReactions(_media?.medias[0].id!),
  };

  const updatedMedias = await Promise.all(
    _medias?.medias.map(async (m) => {
      return {
        ...m,
        postId: _medias.id,
        _gReactions: await mediaPreparer.prepareGReactions(m.id),
      };
    })!
  );

  // reuslt can be undefined
  return {
    updatedMedia,
    updatedMedias,
  };
};
