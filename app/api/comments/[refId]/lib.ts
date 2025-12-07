import { LIMIT } from "@/app/api/config";

import { PostType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";

const prepareGReactions = async (commentId: string) => {
  try {
    const r = await prisma.commentReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        commentId: commentId,
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
  const isReactedByMe = await prisma.commentReaction.findFirst({
    where: {
      commentId: id,
      userId,
    },
    select: {
      commentId: true,
      reactionType: true,
    },
  });

  if (isReactedByMe?.commentId) {
    return {
      isReacted: true,
      reactionType: isReactedByMe.reactionType,
    };
  }
};

export const getComments = async (
  userId: string,
  refFrom: "post" | "media",
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  page: number
) => {
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "oUserPost" as PostType,
          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "userSharePost" as PostType,

          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "oPagePost" as PostType,
          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "pageSharePost" as PostType,
          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "oGroupPost" as PostType,
          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
            take: LIMIT,
            skip: skip,
            select: {
              id: true,
              content: true,
              mediaUrl: true,
              createdAt: true,
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
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      const updatedComments = post?.comments.map(async (comment) => {
        return {
          ...comment,
          postType: "toGroupSharedPost" as PostType,
          postId: post.id,

          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
      const updatedComments = post?.medias[0].comments.map(async (comment) => {
        return {
          ...comment,
          mediaId: post.medias[0].id,
          postId: post.id,

          postType: "oUserPost" as PostType,
          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
      const updatedComments = post?.medias[0].comments.map(async (comment) => {
        return {
          ...comment,
          mediaId: post.medias[0].id,
          postId: post.id,

          postType: "oPagePost" as PostType,
          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
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
      const updatedComments = post?.medias[0].comments.map(async (comment) => {
        return {
          ...comment,
          mediaId: post.medias[0].id,
          postId: post.id,

          postType: "oGroupPost" as PostType,
          _gReactions: await prepareGReactions(comment.id),
          _isReacted: await isReacted(userId, comment.id),
        };
      });
      return {
        comments: await Promise.all(updatedComments ? updatedComments : []),
      };
    }
  }
  return {
    comments: [],
  };
};

const result = await getComments(
  "userId",
  "post",
  "oUserPost",
  "postId",
  "mediaId",
  1
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const comments = result?.comments;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const comment = result?.comments[0];
export type CommentsType = typeof comments;
export type CommentType = typeof comment;
