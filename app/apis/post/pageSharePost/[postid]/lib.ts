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
          pageSharePostId: postId,
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
  const _post = await prisma.pageSharePost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      location: true,
      doing: true,
      doingWhat: true,
      postType: true,
      shareWhat: true,

      page: {
        select: {
          name: true,
          profilePicture: true,
        },
      },
      oUserPost: {
        select: {
          id: true,
          postType: true,
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
          // first reactors

          medias: {
            select: {
              id: true,
              type: true,
              url: true,
              createdAt: true,
              // first media reactors
            },
          },
        },
      },
      oPagePost: {
        select: {
          id: true,
          postType: true,
          content: true,
          createdAt: true,

          page: {
            select: {
              name: true,
              profilePicture: true,
            },
          },
          medias: {
            select: {
              id: true,
              type: true,
              url: true,
              createdAt: true,
            },
          },
        },
      },
      oGroupPost: {
        select: {
          id: true,
          postType: true,
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

          group: {
            select: {
              name: true,
              profilePicture: true,
            },
          },

          medias: {
            select: {
              id: true,
              owner: true,
              type: true,
              url: true,
              createdAt: true,
            },
          },
        },
      },

      media: {
        select: {
          id: true,
          url: true,
          owner: true,
          userPost: {
            select: {
              user: {
                select: {
                  id: true,
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
          pagePost: {
            select: {
              id: true,
              page: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },
            },
          },
          groupPost: {
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
              group: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },
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

export type PageSharePostCommentModalType = typeof result;
