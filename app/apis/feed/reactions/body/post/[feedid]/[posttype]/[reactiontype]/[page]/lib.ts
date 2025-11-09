import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: commentId,
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

export const getReactors = async (
  feedId: string,
  type: "original" | "share",
  reactionType: ReactionType,
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
      id: true,
    },
  });

  if (feed?.postType === "user" && type === "original") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        userPost: {
          include: {
            oUserPost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        userPost: {
          include: {
            oUserPost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.userPost?.oUserPost?.reactions.length,
      result: _reactorsData,
    };
  }

  if (feed?.postType === "user" && type === "share") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        userPost: {
          include: {
            userSharePost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        userPost: {
          include: {
            userSharePost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.userPost?.userSharePost?.reactions.length,
      result: _reactorsData,
    };
  }

  if (feed?.postType === "page" && type === "original") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        pagePost: {
          include: {
            oPagePost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        pagePost: {
          include: {
            oPagePost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.pagePost?.oPagePost?.reactions.length,
      result: _reactorsData,
    };
  }

  if (feed?.postType === "page" && type === "share") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        pagePost: {
          include: {
            pageSharePost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        pagePost: {
          include: {
            pageSharePost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.pagePost?.pageSharePost?.reactions.length,
      result: _reactorsData,
    };
  }

  if (feed?.postType === "group" && type === "original") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        groupPost: {
          include: {
            oGroupPost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        groupPost: {
          include: {
            oGroupPost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.groupPost?.oGroupPost?.reactions.length,
      result: _reactorsData,
    };
  }

  if (feed?.postType === "group" && type === "share") {
    const count = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        groupPost: {
          include: {
            toGroupSharedPost: {
              include: {
                reactions: {
                  select: {
                    id: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    const reactors = await prisma.feed.findUnique({
      where: {
        id: feed.id,
      },
      select: {
        id: true,
        groupPost: {
          include: {
            toGroupSharedPost: {
              include: {
                reactions: {
                  select: {
                    reactionType: true,
                  },
                  where: {
                    reactionType: reactionType as ReactionType,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: rowsPerPage,
                  skip: skip,
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
              },
            },
          },
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);

    return {
      count: _count?.groupPost?.toGroupSharedPost?.reactions.length,
      result: _reactorsData,
    };
  }
  return {
    count: 0,
    result: [],
  };
};

const cc = await getReactors("feedid", "original", "sad", 1, 7);
export type CommentType = typeof cc;
