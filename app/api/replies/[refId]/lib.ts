import { LIMIT } from "@/app/api/config";

import { PostType, ReactionType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";
const prepareGReactions = async (replyId: string) => {
  try {
    const r = await prisma.replyReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        replyId: replyId,
      },
    });

    return r.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });
  } catch {
    throw new Error("Error in fetching comments");
  }
};
const isReacted = async (userId: string, id: string | undefined) => {
  const isReactedByMe = await prisma.replyReaction.findFirst({
    where: {
      replyId: id,
      userId,
    },
    select: {
      replyId: true,
      reactionType: true,
    },
  });

  if (isReactedByMe?.replyId) {
    return {
      isReacted: true,
      reactionType: isReactedByMe.reactionType,
    };
  }
  return {
    isReacted: false,
    reactionType: undefined,
  };
};

type PostReplyType = {
  postType: PostType;
  postId: string;
  commentId: string;
  _gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
  _isReacted: {
    isReacted: boolean;
    reactionType: ReactionType | undefined;
  };

  id: string;
  content: string | null;
  createdAt: Date;
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
  };
  mediaUrl: string | null;
  replies: {
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
  }[];
};

type MediaReplyType = {
  postType: PostType;
  postId: string;
  commentId: string;
  mediaId: string;
  _gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
  _isReacted: {
    isReacted: boolean;
    reactionType: ReactionType | undefined;
  };

  id: string;
  content: string | null;
  createdAt: Date;
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
  };
  mediaUrl: string | null;
  replies: {
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
  }[];
};
export type ReplyType = PostReplyType | MediaReplyType;
export type RepliesType = PostReplyType[] | MediaReplyType[];

type ReplyReturnType = {
  replies: PostReplyType[] | MediaReplyType[];
};

export const getReplies = async (
  userId: string,
  refFrom: "post" | "media",
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string,
  page: number
): Promise<ReplyReturnType> => {
  const skip = (page - 1) * LIMIT;

  if (refFrom === "post") {
    if (postType === "oUserPost") {
      const post = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "oUserPost" as PostType,
          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
    if (postType === "userSharePost") {
      const post = await prisma.userSharePost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "pageSharePost" as PostType,

          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
    if (postType === "oPagePost") {
      const post = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "oPagePost" as PostType,

          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
    if (postType === "pageSharePost") {
      const post = await prisma.pageSharePost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "pageSharePost" as PostType,

          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
    if (postType === "oGroupPost") {
      const post = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "oGroupPost" as PostType,

          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
    if (postType === "toGroupSharedPost") {
      const post = await prisma.toGroupSharePost.findUnique({
        where: {
          id: postId,
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
                take: LIMIT,
                skip: skip,
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  mediaUrl: true,
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
                  // first commentors
                  replies: {
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
                  // counts
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
      const updatedReplies = post?.comments[0].replies.map(async (reply) => {
        return {
          ...reply,
          postType: "toGroupSharedPost" as PostType,

          postId: post.id,
          commentId: post.comments[0].id,
          _gReactions: await prepareGReactions(reply.id),
          _isReacted: await isReacted(userId, reply.id),
        };
      });
      return {
        replies: (await Promise.all(
          updatedReplies ? updatedReplies : []
        )) as unknown as PostReplyType[],
      };
    }
  }

  if (refFrom === "media") {
    if (postType === "oUserPost") {
      const post = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
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
                where: {
                  id: commentId,
                },
                select: {
                  id: true,
                  replies: {
                    take: LIMIT,
                    skip: skip,
                    select: {
                      id: true,
                      content: true,
                      createdAt: true,
                      mediaUrl: true,
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
                      // first commentors
                      replies: {
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
                      // counts
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
      const updatedReplies = post?.medias[0].comments[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oUserPost" as PostType,
            postId: post.id,
            commentId: post.medias[0].comments[0].id,

            mediaId: post.medias[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: (await Promise.all(
          updatedReplies! ? updatedReplies : []
        )) as unknown as MediaReplyType[],
      };
    }
    if (postType === "oPagePost") {
      const post = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
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
                where: {
                  id: commentId,
                },
                select: {
                  id: true,
                  replies: {
                    take: LIMIT,
                    skip: skip,
                    select: {
                      id: true,
                      content: true,
                      createdAt: true,
                      mediaUrl: true,
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
                      // first commentors
                      replies: {
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
                      // counts
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
      const updatedReplies = post?.medias[0].comments[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oPagePost" as PostType,

            postId: post.id,
            commentId: post.medias[0].comments[0].id,

            mediaId: post.medias[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: (await Promise.all(
          updatedReplies! ? updatedReplies : []
        )) as unknown as MediaReplyType[],
      };
    }
    if (postType === "oGroupPost") {
      const post = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
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
                where: {
                  id: commentId,
                },
                select: {
                  id: true,
                  replies: {
                    take: LIMIT,
                    skip: skip,
                    select: {
                      id: true,
                      content: true,
                      createdAt: true,
                      mediaUrl: true,
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
                      // first commentors
                      replies: {
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
                      // counts
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
      const updatedReplies = post?.medias[0].comments[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oGroupPost" as PostType,

            postId: post.id,
            commentId: post.medias[0].comments[0].id,

            mediaId: post.medias[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: (await Promise.all(
          updatedReplies! ? updatedReplies : []
        )) as unknown as MediaReplyType[],
      };
    }
  }
  return {
    replies: [],
  };
};
