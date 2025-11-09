import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { count } from "console";

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
  commentId: string,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.userPost?.postType,
      reactors: _reactorsData?.userPost?.oUserPost?.comments[0].reactions,
    };
    return {
      count: _count?.userPost?.oUserPost?.comments[0]._count.reactions,
      result: _udpatedReactors,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.userPost?.postType,
      reactors: _reactorsData?.userPost?.userSharePost?.comments[0].reactions,
    };
    return {
      count: _count?.userPost?.userSharePost?.comments[0]._count.reactions,
      result: _udpatedReactors,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.pagePost?.postType,
      reactors: _reactorsData?.pagePost?.oPagePost?.comments[0].reactions,
    };
    return {
      count: _count?.pagePost?.oPagePost?.comments[0]._count.reactions,
      result: _udpatedReactors,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.pagePost?.postType,
      reactors: _reactorsData?.pagePost?.pageSharePost?.comments[0].reactions,
    };
    return {
      count: _count?.pagePost?.pageSharePost?.comments[0]._count.reactions,
      result: _udpatedReactors,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.groupPost?.postType,
      reactors: _reactorsData?.groupPost?.oGroupPost?.comments[0].reactions,
    };
    return {
      count: _count?.groupPost?.oGroupPost?.comments[0]._count.reactions,
      result: _udpatedReactors,
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
                comments: {
                  where: {
                    id: commentId,
                  },

                  include: {
                    _count: {
                      select: {
                        reactions: true,
                      },
                    },
                    reactions: {
                      select: {
                        id: true,
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    id: true,
                  },
                  include: {
                    reactions: {
                      orderBy: {
                        createdAt: "desc",
                      },
                      where: {
                        reactionType: reactionType as ReactionType,
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
        },
      },
    });

    const [_count, _reactorsData] = await Promise.all([count, reactors]);
    const _udpatedReactors = {
      feedId: _reactorsData?.id,
      postType: _reactorsData?.groupPost?.postType,
      reactors:
        _reactorsData?.groupPost?.toGroupSharedPost?.comments[0].reactions,
    };
    return {
      count: _count?.groupPost?.toGroupSharedPost?.comments[0]._count.reactions,
      result: _udpatedReactors,
    };
  }
  return {
    count: 0,
    result: {
      feedId: undefined,
      postType: undefined,
      reactors: undefined,
    },
  };
};

const result = await getReactors("feedid", "share", "commentid", "like", 1, 7);
const reactors = result.result.reactors;
export type CommentReactorsType = typeof reactors;
