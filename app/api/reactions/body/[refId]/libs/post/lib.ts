import { LIMIT } from "@/app/api/config";

import prisma from "@/app/libs/prisma";
import { PostType, ReactionType } from "@/app/generated/prisma/client";

export const getReactorsForPost = async (
  postType: PostType,
  postId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

  if (postType === "oUserPost") {
    const post = await prisma.oUserPost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  if (postType === "userSharePost") {
    const post = await prisma.userSharePost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  if (postType === "oPagePost") {
    const post = await prisma.oPagePost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  if (postType === "pageSharePost") {
    const post = await prisma.pageSharePost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  if (postType === "oGroupPost") {
    const post = await prisma.oGroupPost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  if (postType === "toGroupSharedPost") {
    const post = await prisma.toGroupSharePost.findUnique({
      where: {
        id: postId,
      },

      select: {
        id: true,
        reactions: {
          take: LIMIT,
          skip: skip,
          where: {
            reactionType: reactionType,
          },
          select: {
            reactionType: true,
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
    });

    return {
      reactors: post?.reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForComment = async (
  postType: PostType,
  postId: string,
  commentId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType,
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
                reactionType: true,
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForReply = async (
  postType: PostType,
  postId: string,
  commentId: string,
  replyId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return {
      reactors: post?.comments[0].replies[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForReplyReply = async (
  postType: PostType,
  postId: string,
  commentId: string,
  replyId: string,
  replyReplyId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
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
              where: {
                id: replyId,
              },
              select: {
                id: true,
                replies: {
                  where: {
                    id: replyReplyId,
                  },
                  select: {
                    id: true,
                    reactions: {
                      take: LIMIT,
                      skip: skip,
                      where: {
                        reactionType: reactionType,
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
                        reactionType: true,
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
    return {
      reactors: post?.comments[0].replies[0].replies[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

const result = await getReactorsForPost("oUserPost", "postId", "like", 1);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reactors = result?.reactors;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reactor = result?.reactors;
export type ReactorsType = typeof reactors;
export type ReactorType = typeof reactor;
