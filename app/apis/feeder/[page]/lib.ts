import prisma from "@/app/libs/prisma";

const prepareGReactions = async (id: string | undefined) => {
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
          oUserPost: {
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
              _count: {
                select: {
                  comments: true,
                  reactions: true,
                },
              },
            },
          },
        },
      },
      pagePost: {
        include: {
          oPagePost: {
            include: {
              page: {
                select: {
                  name: true,
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
            },
          },
          pageSharePost: {
            include: {
              page: {
                select: {
                  name: true,
                },
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
      },
      groupPost: {
        include: {
          oGroupPost: {
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
            },
          },
          toGroupSharedPost: {
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
              page: {
                select: {
                  name: true,
                },
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
      },
    },
  });

  const [result, length] = await Promise.all([feeds, count]);
  const updated = result.map(async (feed) => {
    return {
      ...feed,
      userPost: {
        ...feed.userPost,
        oUserPost: {
          ...feed.userPost?.oUserPost,
          _gReactions: await prepareGReactions(feed?.userPost?.oUserPost?.id),
        },
        userSharePost: {
          ...feed.userPost?.userSharePost,
          _gReactions: await prepareGReactions(
            feed?.userPost?.userSharePost?.id
          ),
        },
      },
      pagePost: {
        ...feed.pagePost,
        oPagePost: {
          ...feed.pagePost?.oPagePost,
          _gReactions: await prepareGReactions(feed?.pagePost?.oPagePost?.id),
        },
        pageSharePost: {
          ...feed.pagePost?.pageSharePost,
          _gReactions: await prepareGReactions(
            feed?.pagePost?.pageSharePost?.id
          ),
        },
      },
      groupPost: {
        ...feed.groupPost,
        oGroupPost: {
          ...feed.groupPost?.oGroupPost,
          _gReactions: await prepareGReactions(feed?.groupPost?.oGroupPost?.id),
        },
        toGroupSharedPost: {
          ...feed.groupPost?.toGroupSharedPost,
          _gReactions: await prepareGReactions(
            feed?.groupPost?.toGroupSharedPost?.id
          ),
        },
      },
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
const oUserpost = feed.userPost.oUserPost;
const userSharePost = feed.userPost.userSharePost;
const oPagepost = feed.pagePost;
const pageSharePost = feed.pagePost.pageSharePost;
const oGrouppost = feed.groupPost;
const toGroupSharedPost = feed.groupPost.toGroupSharedPost;

export type FeedsType = typeof feed;
export type OriginalUserPostType = typeof oUserpost;
export type OriginalPagePostType = typeof oPagepost;
export type OriginalGroupPostType = typeof oGrouppost;

export type UserSharePostType = typeof userSharePost;
export type PageSharePostType = typeof pageSharePost;
export type ToGroupSharePostType = typeof toGroupSharedPost;
