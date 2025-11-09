import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.replyReaction.groupBy({
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

export const getReplies = async (
  feedId: string,
  type: "original" | "share",
  commentId: string,
  replyId: string,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.userPost?.oUserPost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.userPost,
        oUserPost: {
          ..._repliesData?.userPost?.oUserPost,
          comments: _repliesData?.userPost?.oUserPost?.comments.map((co) => {
            return co.replies.map((rep) => {
              return {
                ...rep,
                replies: x,
              };
            });
          }),
        },
      },
    };

    return {
      count: _count?.userPost?.oUserPost?.comments.length,
      result: updatedRepliesData,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.userPost?.userSharePost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.userPost,
        oUserPost: {
          ..._repliesData?.userPost?.userSharePost,
          comments: _repliesData?.userPost?.userSharePost?.comments.map(
            (co) => {
              return co.replies.map((rep) => {
                return {
                  ...rep,
                  replies: x,
                };
              });
            }
          ),
        },
      },
    };

    return {
      count:
        _count?.userPost?.userSharePost?.comments[0].replies[0]._count.replies,
      result: updatedRepliesData,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.pagePost?.oPagePost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.pagePost,
        oUserPost: {
          ..._repliesData?.pagePost?.oPagePost,
          comments: _repliesData?.pagePost?.oPagePost?.comments.map((co) => {
            return co.replies.map((rep) => {
              return {
                ...rep,
                replies: x,
              };
            });
          }),
        },
      },
    };

    return {
      count: _count?.pagePost?.oPagePost?.comments[0].replies[0]._count.replies,
      result: updatedRepliesData,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.pagePost?.pageSharePost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.pagePost,
        oUserPost: {
          ..._repliesData?.pagePost?.pageSharePost,
          comments: _repliesData?.pagePost?.pageSharePost?.comments.map(
            (co) => {
              return co.replies.map((rep) => {
                return {
                  ...rep,
                  replies: x,
                };
              });
            }
          ),
        },
      },
    };

    return {
      count:
        _count?.pagePost?.pageSharePost?.comments[0].replies[0]._count.replies,
      result: updatedRepliesData,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.groupPost?.oGroupPost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.groupPost,
        oUserPost: {
          ..._repliesData?.groupPost?.oGroupPost,
          comments: _repliesData?.groupPost?.oGroupPost?.comments.map((co) => {
            return co.replies.map((rep) => {
              return {
                ...rep,
                replies: x,
              };
            });
          }),
        },
      },
    };

    return {
      count:
        _count?.groupPost?.oGroupPost?.comments[0].replies[0]._count.replies,
      result: updatedRepliesData,
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
                  select: {
                    id: true,
                  },
                  include: {
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        _count: {
                          select: {
                            replies: true,
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
    const replies = await prisma.feed.findUnique({
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
                    replies: {
                      select: {
                        id: true,
                      },
                      where: {
                        id: replyId,
                      },
                      include: {
                        replies: {
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
                            _count: {
                              select: {
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
            },
          },
        },
      },
    });

    const [_count, _repliesData] = await Promise.all([count, replies]);

    const updatedReplies =
      _repliesData?.groupPost?.toGroupSharedPost?.comments[0].replies[0].replies.map(
        async (co) => {
          return {
            ...co,
            gReactions: await commentPreparer.prepareGReactions(co.id),
          };
        }
      );
    const x = updatedReplies && (await Promise.all(updatedReplies));

    const updatedRepliesData = {
      ..._repliesData,
      userPost: {
        ..._repliesData?.groupPost,
        oUserPost: {
          ..._repliesData?.groupPost?.toGroupSharedPost,
          comments: _repliesData?.groupPost?.toGroupSharedPost?.comments.map(
            (co) => {
              return co.replies.map((rep) => {
                return {
                  ...rep,
                  replies: x,
                };
              });
            }
          ),
        },
      },
    };

    return {
      count:
        _count?.groupPost?.toGroupSharedPost?.comments[0].replies[0]._count
          .replies,
      result: updatedRepliesData,
    };
  }

  return {
    count: 0,
    result: [],
  };
};

const cc = await getReplies("feedid", "original", "coid", "repid", 1, 7);
export type CommentType = typeof cc;
