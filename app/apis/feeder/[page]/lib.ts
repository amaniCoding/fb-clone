import prisma from "@/app/libs/prisma";

const prepareGReactions = async (feedId: string) => {
  try {
    const r = await prisma.feedReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: feedId,
      },
    });

    return r.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });
  } catch (error) {}
};
export const getFeeds = async (page: number) => {
  const skip = (page - 1) * 10;
  const count = prisma.feed.count();

  const feeds = prisma.feed.findMany({
    take: 10,
    skip: skip,
    include: {
      userPost: {
        include: {
          medias: {
            include: {
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

              comments: {
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
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
        },
      },
      pagePost: {
        include: {
          medias: {
            include: {
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

              comments: {
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
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
        },
      },
      groupPost: {
        include: {
          medias: {
            include: {
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

              comments: {
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
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
        },
      },
      userSharePost: {
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
          userPost: {
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
            },
          },
          pagePost: {
            include: {
              page: {
                select: {
                  name: true,
                },
              },
            },
          },

          groupPost: {
            include: {
              group: {
                select: {
                  name: true,
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
      pageSharePost: {
        include: {
          page: {
            select: {
              name: true,
            },
          },
          userPost: {
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
            },
          },
          pagePost: {
            include: {
              page: {
                select: {
                  name: true,
                },
              },
            },
          },

          groupPost: {
            include: {
              group: {
                select: {
                  name: true,
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
      toGroupSharePost: {
        include: {
          page: {
            select: {
              name: true,
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

          group: {
            select: {
              name: true,
            },
          },
          userPost: {
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
            },
          },
          pagePost: {
            include: {
              page: {
                select: {
                  name: true,
                },
              },
            },
          },

          groupPost: {
            include: {
              group: {
                select: {
                  name: true,
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
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
      // first reaction if any
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

      comments: {
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
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const [result, length] = await Promise.all([feeds, count]);
  const updated = result.map(async (feed) => {
    return {
      ...feed,
      _gReactions: await prepareGReactions(feed.id),
    };
  });

  return {
    count: length,
    updated: await Promise.all(updated),
  };
};

// prepare
