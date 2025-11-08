import prisma from "@/app/libs/prisma";

const prepareGReactions = async (id: string) => {
  try {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: id,
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
              _count: {
                select: {
                  comments: true,
                  reactions: true,
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
              _count: {
                select: {
                  comments: true,
                  reactions: true,
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
          page: {
            select: {
              name: true,
            },
          },
        },
      },
      groupPost: {
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
          group: {
            select: {
              name: true,
              createdAt: true,
            },
          },
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
              _count: {
                select: {
                  comments: true,
                  reactions: true,
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
          _count: {
            select: {
              comments: true,
              reactions: true,
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

  const [result, length] = await Promise.all([feeds, count]);
  const updated = result.map(async (feed) => {
    return {
      ...feed,
      userPost: {
        ...feed.userPost,
        _gReactions: feed.userPost
          ? await prepareGReactions(feed.userPost.id)
          : [],
      },
      pagePost: {
        ...feed.pagePost,
        _gReactions: feed.pagePost
          ? await prepareGReactions(feed.pagePost.id)
          : [],
      },
      groupPost: {
        ...feed.groupPost,
        _gReactions: feed.groupPost
          ? await prepareGReactions(feed.groupPost.id)
          : [],
      },
      userSharePost: {
        ...feed.userSharePost,
        _gReactions: feed.userSharePost
          ? await prepareGReactions(feed.userSharePost.id)
          : [],
      },
      pageSharePost: {
        ...feed.pageSharePost,
        _gReactions: feed.pageSharePost
          ? await prepareGReactions(feed.pageSharePost.id)
          : [],
      },
      toGroupSharePost: {
        ...feed.toGroupSharePost,
        _gReactions: feed.toGroupSharePost
          ? await prepareGReactions(feed.toGroupSharePost.id)
          : [],
      },
      _gReactions: await prepareGReactions(feed.id),
    };
  });

  return {
    count: length,
    updated: await Promise.all(updated),
  };
};

// prepare

const feeds = await getFeeds(1);
const feed = feeds.updated[0];
const userpost = feed.userPost;
const pagepost = feed.pagePost;
const grouppost = feed.groupPost;
const usersharepost = feed.userSharePost;
const pagesharepost = feed.pageSharePost;
const togroupsharepost = feed.toGroupSharePost;
export type FeedsType = typeof feed;
export type UserPostType = typeof userpost;
export type PagePostType = typeof pagepost;
export type GroupPostType = typeof grouppost;
export type UserSharePostType = typeof usersharepost;
export type PageSharePostType = typeof pagesharepost;
export type ToGroupSharePostType = typeof togroupsharepost;
