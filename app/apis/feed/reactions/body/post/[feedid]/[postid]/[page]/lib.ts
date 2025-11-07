import prisma from "@/app/libs/prisma";
export const getReactors = async (
  feedId: string,
  iD: string,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  /**
   * comments include
   * first reactors
   * first replier
   * g reactions
   * count reactions and replies
   * commentors withonly name with profile pic
   * prepare reactions for modal --- future
   * prepare replies for modal --- future
   */
  const feed = await prisma.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      postType: true,
    },
  });
  switch (feed?.postType) {
    case "user": {
      const reactors = await prisma.userPost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
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
              reactionType: true,
            },
          },
        },
      });

      return {
        count: reactors.length,
        reactors,
      };
    }

    case "page": {
      const reactors = await prisma.pagePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
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
              reactionType: true,
            },
          },
        },
      });

      return {
        count: reactors.length,
        reactors,
      };
    }
    case "group": {
      const reactors = await prisma.groupPost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
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
              reactionType: true,
            },
          },
        },
      });

      return {
        count: reactors.length,
        reactors,
      };
    }
    case "ushare": {
      const reactors = await prisma.userSharePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
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
              reactionType: true,
            },
          },
        },
      });

      return {
        count: reactors.length,
        reactors,
      };
    }

    case "pshare": {
      const reactors = await prisma.pageSharePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          reactions: {
            take: rowsPerPage,
            skip: skip,
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
              reactionType: true,
            },
          },
        },
      });

      return {
        count: reactors.length,
        reactors,
      };
    }

    case "gshare":
      {
        const reactors = await prisma.toGroupSharePost.findMany({
          where: {
            id: iD,
          },

          select: {
            id: true,
            reactions: {
              take: rowsPerPage,
              skip: skip,
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
                reactionType: true,
              },
            },
          },
        });

        return {
          count: reactors.length,
          reactors,
        };
      }
      break;

    default:
      return {
        count: 0,
        reactors: [],
      };
      break;
  }
};
