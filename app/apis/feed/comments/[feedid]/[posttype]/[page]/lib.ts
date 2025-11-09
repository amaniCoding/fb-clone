import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
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

export const getComments = async (
  feedId: string,
  type: "original" | "share",
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments = _commentsData?.userPost?.oUserPost?.comments.map(
      async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      }
    );

    const result = {
      postType: _commentsData?.userPost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.userPost?.oUserPost?._count.comments,
      result: result,
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments =
      _commentsData?.userPost?.userSharePost?.comments.map(async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      });

    const result = {
      postType: _commentsData?.userPost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.userPost?.userSharePost?._count.comments,
      result: result,
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments = _commentsData?.pagePost?.oPagePost?.comments.map(
      async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      }
    );

    const result = {
      postType: _commentsData?.pagePost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.pagePost?.oPagePost?._count.comments,
      result: result,
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments =
      _commentsData?.pagePost?.pageSharePost?.comments.map(async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      });

    const result = {
      postType: _commentsData?.pagePost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.pagePost?.pageSharePost?._count.comments,
      result: result,
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments = _commentsData?.groupPost?.oGroupPost?.comments.map(
      async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      }
    );

    const result = {
      postType: _commentsData?.groupPost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.groupPost?.oGroupPost?._count.comments,
      result: result,
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
                _count: {
                  select: {
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const comments = await prisma.feed.findUnique({
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
                  take: rowsPerPage,
                  skip: skip,
                  orderBy: {
                    createdAt: "desc",
                  },
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
                    reactions: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },

                    replies: {
                      take: 1,
                      orderBy: {
                        createdAt: "desc",
                      },
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
                    },
                    _count: {
                      select: {
                        replies: true,
                        reactions: true,
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

    const [_count, _commentsData] = await Promise.all([count, comments]);

    const updatedComments =
      _commentsData?.groupPost?.toGroupSharedPost?.comments.map(async (co) => {
        return {
          ...co,
          gReactions: await commentPreparer.prepareGReactions(co.id),
        };
      });

    const result = {
      postType: _commentsData?.groupPost?.postType,
      feedId: _commentsData?.id,
      comments: updatedComments && (await Promise.all(updatedComments)),
    };

    return {
      count: _count?.groupPost?.toGroupSharedPost?._count.comments,
      result: result,
    };
  }
  return {
    count: 0,
    result: {
      postType: undefined,
      feedId: undefined,
      comments: undefined,
    },
  };
};

const result = await getComments("feedid", "original", 1, 7);
const comment = result.result.comments;
export type CommentType = typeof comment;
