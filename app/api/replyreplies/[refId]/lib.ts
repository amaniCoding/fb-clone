import { LIMIT } from "@/app/api/config";

import { PostType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";
const prepareGReactions = async (replyId: string) => {
  try {
    const r = await prisma.replyReplyReactions.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        replyReplyId: replyId,
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

export const getReplies = async (
  userId: string,
  refFrom: "post" | "media",
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string,
  replyId: string,
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oUserPost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "userSharePost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oPagePost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "pageSharePost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "oGroupPost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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

                      // counts
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
      });
      const updatedReplies = post?.comments[0].replies[0].replies.map(
        async (reply) => {
          return {
            ...reply,
            postType: "toGroupSharedPost" as PostType,

            postId: reply.id,
            commentId: post.comments[0].id,
            replyId: post.comments[0].replies[0].id,
            _gReactions: await prepareGReactions(reply.id),
            _isReacted: await isReacted(userId, reply.id),
          };
        }
      );
      return {
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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
                    where: {
                      id: replyId,
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

                          // counts
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
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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
                    where: {
                      id: replyId,
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

                          // counts
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
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
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
                    where: {
                      id: replyId,
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

                          // counts
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
        replies: await Promise.all(updatedReplies! ? updatedReplies : []),
      };
    }
  }
  return {
    replies: [],
  };
};

const result = await getReplies(
  "userId",
  "post",
  "oUserPost",
  "postId",
  "mediaId",
  "commentId",
  "replyId",
  1
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const replies = result?.replies;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reply = result?.replies[0];
export type RepliesType = typeof replies;
export type ReplyType = typeof reply;
