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
const prepareComments = async (
  comments: ({
    user: {
      firstName: string;
      lastName: string;
      Profile: { profilePicture: string | null } | null;
    };
    reactions: {
      user: {
        firstName: string;
        lastName: string;
        Profile: { profilePicture: string | null } | null;
      };
    }[];
    _count: { reactions: number; replies: number };
    replies: {
      user: {
        firstName: string;
        lastName: string;
        Profile: { profilePicture: string | null } | null;
      };
    }[];
  } & {
    id: string;
    userId: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    mediaUrl: string | null;
    userPostId: string | null;
    pagePostId: string | null;
    groupPostId: string | null;
    userSharePostId: string | null;
    pageSharePostId: string | null;
    toGroupSharePostId: string | null;
  })[]
) => {
  const newComments = comments.map(async (com) => {
    return {
      ...com,
      gReactions: await commentPreparer.prepareGReactions(com.id),
    };
  });
  return await Promise.all(newComments);
};

export const getComments = async (
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
      const count = await prisma.userPost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.userPost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    case "page": {
      const count = await prisma.pagePost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.pagePost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    case "group": {
      const count = await prisma.groupPost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.groupPost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    case "ushare": {
      const count = await prisma.userSharePost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.userSharePost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    case "pshare": {
      const count = await prisma.pageSharePost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.pageSharePost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    case "gshare": {
      const count = await prisma.toGroupSharePost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      const comments = await prisma.toGroupSharePost.findMany({
        where: {
          id: iD,
        },
        select: {
          id: true,
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
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          comments: await prepareComments(co.comments),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.comments.length,
      };
    }
    default:
      return {
        count: 0,
        comments: [],
      };
  }
};

const { comments } = await getComments("feedid", "postid", 1, 7);
export type CommentType = typeof comments;
