import { ReactionModalHeader, ReactionModalReactors } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";

const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.mediaCommentReaction.groupBy({
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

const prepareMedias = async (
  medias: {
    id: string;
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
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      content: string | null;
      mediaId: string;
      mediaUrl: string | null;
    })[];
  }[]
) => {
  const newMedias = medias.map(async (media) => {
    return {
      ...media,
      comments: await prepareComment(media.comments),
    };
  });
  return await Promise.all(newMedias);
};

const prepareComment = async (
  comments: ({
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
    reactions: {
      user: {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      };
    }[];
    _count: {
      reactions: number;
      replies: number;
    };
    replies: {
      user: {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      };
    }[];
  } & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string | null;
    mediaId: string;
    mediaUrl: string | null;
  })[]
) => {
  const newComment = comments.map(async (co) => {
    return {
      ...co,
      gReactions: commentPreparer.prepareGReactions(co.id),
    };
  });

  return await Promise.all(newComment);
};

export const getComments = async (
  feedId: string,
  iD: string,
  mediaId: string,
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
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              id: true,
              comments: {
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
          medias: {
            where: {
              id: mediaId,
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
          },
        },
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          medias: await prepareMedias(co.medias),
          // gReactions: await commentPreparer.prepareGReactions(co.medias[0].id),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.medias[0].comments.length,
      };
    }

    case "page": {
      const count = await prisma.pagePost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              id: true,
              comments: {
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
          medias: {
            where: {
              id: mediaId,
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
          },
        },
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          medias: await prepareMedias(co.medias),
          // gReactions: await commentPreparer.prepareGReactions(co.medias[0].id),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.medias[0].comments.length,
      };
    }
    case "user": {
      const count = await prisma.groupPost.findUnique({
        where: {
          id: iD,
        },
        select: {
          id: true,
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              id: true,
              comments: {
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
          medias: {
            where: {
              id: mediaId,
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
          },
        },
      });

      const [_count, _comments] = await Promise.all([count, comments]);

      const updated = _comments.map(async (co) => {
        return {
          ...co,
          medias: await prepareMedias(co.medias),
          // gReactions: await commentPreparer.prepareGReactions(co.medias[0].id),
        };
      });
      const final = await Promise.all(updated);
      return {
        comments: final,
        count: _count?.medias[0].comments.length,
      };
    }
    default:
      return {
        count: 0,
        comments: [],
      };
  }
};

const { comments } = await getComments("feedid", "postid", "mediaid", 1, 7);
export type CommentType = typeof comments;
