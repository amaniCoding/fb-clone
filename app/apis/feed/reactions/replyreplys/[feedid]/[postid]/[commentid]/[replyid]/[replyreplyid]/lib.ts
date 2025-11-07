import { $Enums } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

const replyPreparer = {
  prepareGReactions: async (replyId: string) => {
    try {
      const r = await prisma.replyReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: replyId,
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

const prepareComment = async (
  comments: {
    id: string;
    replies: {
      id: string;
      replies: ({
        user: {
          firstName: string;
          lastName: string;
          Profile: {
            profilePicture: string | null;
          } | null;
        };
        _count: {
          reactions: number;
        };
        reactions: ({
          user: {
            firstName: string;
            lastName: string;
            Profile: {
              profilePicture: string | null;
            } | null;
          };
        } & {
          id: string;
          reactionType: $Enums.ReactionType;
          userId: string;
          createdAt: Date;
          updatedAt: Date;
          replyReplyId: string;
        })[];
      } & {
        id: string;
        replyId: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        mediaUrl: string | null;
      })[];
    }[];
  }[]
) => {
  const newComment = comments.map(async (co) => {
    return {
      ...co,
      replies: await prepareReply(co.replies),
    };
  });

  return await Promise.all(newComment);
};

const prepareReply = async (
  replies: {
    id: string;
    replies: ({
      user: {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      };
      _count: {
        reactions: number;
      };
      reactions: ({
        user: {
          firstName: string;
          lastName: string;
          Profile: {
            profilePicture: string | null;
          } | null;
        };
      } & {
        id: string;
        reactionType: $Enums.ReactionType;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        replyReplyId: string;
      })[];
    } & {
      id: string;
      replyId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      content: string | null;
      mediaUrl: string | null;
    })[];
  }[]
) => {
  const newR = replies.map(async (r) => {
    return {
      ...r,
      replies: await prepareReplyForReply(r.replies),
    };
  });
  return await Promise.all(newR);
};

const prepareReplyForReply = async (
  replies: ({
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
    _count: {
      reactions: number;
    };
    reactions: ({
      user: {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      };
    } & {
      id: string;
      reactionType: $Enums.ReactionType;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
      replyReplyId: string;
    })[];
  } & {
    id: string;
    replyId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    content: string | null;
    mediaUrl: string | null;
  })[]
) => {
  const newR = replies.map(async (r) => {
    return {
      ...r,
      replies: await replyPreparer.prepareGReactions(r.id),
    };
  });
  return await Promise.all(newR);
};
export const getReactors = async (
  feedId: string,
  iD: string,
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
    },
  });
  switch (feed?.postType) {
    case "user": {
      const replies = await prisma.userPost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }

    case "page": {
      const replies = await prisma.pagePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }

    case "group": {
      const replies = await prisma.groupPost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }
    case "ushare": {
      const replies = await prisma.userSharePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }
    case "pshare": {
      const replies = await prisma.pageSharePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }

    case "gshare": {
      const replies = await prisma.toGroupSharePost.findMany({
        where: {
          id: iD,
        },

        select: {
          id: true,
          comments: {
            where: {
              id: commentId,
            },
            select: {
              id: true,
              replies: {
                where: {
                  id: replyId,
                },
                select: {
                  id: true,
                  replies: {
                    take: rowsPerPage,
                    skip: skip,
                    include: {
                      _count: {
                        select: {
                          reactions: true,
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

                      reactions: {
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
                        take: 1,
                        orderBy: {
                          createdAt: "desc",
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

      const r = replies.map(async (r) => {
        return { ...r, comments: await prepareComment(r.comments) };
      });

      return {
        count: replies.length,
        replies: await Promise.all(r),
      };
    }

    default:
      return {
        count: 0,
        reactors: [],
      };
  }
};
