/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from "@/app/libs/prisma";
import { State } from "../../types";
import { auth } from "@/app/auth";
import { PostType, ReactionType } from "@/app/generated/prisma/client";

export const reactMedia = async (
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string | undefined,
  replyId: string | undefined,
  replyReplyId: string | undefined,
  reactionType: ReactionType,
  prevState: State
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un authorized request");
    }
    if (postType === "oUserPost") {
      const isMediaReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              reactions: {
                where: {
                  userId: session.user.id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (isMediaReacted?.medias[0].reactions[0].id) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    update: {
                      where: {
                        id: isMediaReacted.medias[0].reactions[0].id,
                      },
                      data: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: session.user.id,
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
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    create: {
                      reactionType: reactionType,
                      user: {
                        connect: {
                          id: session.user.id,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          mediaId: mediaId,
        },
      });

      const _gReactionsForThisPost = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactionsForThisPost,
        reactionType,
        message: "Success ",
      };
    }
    if (postType === "oPagePost") {
      const isMediaReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              reactions: {
                where: {
                  userId: session.user.id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (isMediaReacted?.medias[0].reactions[0].id) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    update: {
                      where: {
                        id: isMediaReacted.medias[0].reactions[0].id,
                      },
                      data: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: session.user.id,
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
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    create: {
                      reactionType: reactionType,
                      user: {
                        connect: {
                          id: session.user.id,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          mediaId: mediaId,
        },
      });

      const _gReactionsForThisPost = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactionsForThisPost,
        reactionType,
        message: "Success ",
      };
    }
    if (postType === "oGroupPost") {
      const isMediaReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              reactions: {
                where: {
                  userId: session.user.id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (isMediaReacted?.medias[0].reactions[0].id) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    update: {
                      where: {
                        id: isMediaReacted.medias[0].reactions[0].id,
                      },
                      data: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: session.user.id,
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
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  reactions: {
                    create: {
                      reactionType: reactionType,
                      user: {
                        connect: {
                          id: session.user.id,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          mediaId: mediaId,
        },
      });

      const _gReactionsForThisPost = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactionsForThisPost,
        reactionType,
        message: "Success ",
      };
    }
  } catch {
    return {
      success: true,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
};

export const reactMediaComment = async (
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string | undefined,
  replyId: string | undefined,
  replyReplyId: string | undefined,
  reactionType: ReactionType,
  prevState: State
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un authorized request");
    }
    if (postType === "oUserPost") {
      const isMediaCommentReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },

                select: {
                  reactions: {
                    where: {
                      userId: session.user.id,
                    },
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (isMediaCommentReacted?.medias[0].comments[0].reactions[0].id) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          update: {
                            where: {
                              id: isMediaCommentReacted.medias[0].comments[0]
                                .reactions[0].id,
                            },
                            data: {
                              reactionType: reactionType,
                              user: {
                                connect: {
                                  id: session.user.id,
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
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          create: {
                            reactionType: reactionType,
                            user: {
                              connect: {
                                id: session.user.id,
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
      }

      const gReactions = await prisma.mediaCommentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        message: "Success ",
        reactionType,
      };
    }
    if (postType === "oPagePost") {
      const isMediaCommentReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },

                select: {
                  reactions: {
                    where: {
                      userId: session.user.id,
                    },
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (isMediaCommentReacted?.medias[0].comments[0].reactions[0].id) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          update: {
                            where: {
                              id: isMediaCommentReacted.medias[0].comments[0]
                                .reactions[0].id,
                            },
                            data: {
                              reactionType: reactionType,
                              user: {
                                connect: {
                                  id: session.user.id,
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
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          create: {
                            reactionType: reactionType,
                            user: {
                              connect: {
                                id: session.user.id,
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
      }

      const gReactions = await prisma.mediaCommentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        message: "Success ",
        reactionType,
      };
    }
    if (postType === "oGroupPost") {
      const isMediaCommentReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },

                select: {
                  reactions: {
                    where: {
                      userId: session.user.id,
                    },
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (isMediaCommentReacted?.medias[0].comments[0].reactions[0].id) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          update: {
                            where: {
                              id: isMediaCommentReacted.medias[0].comments[0]
                                .reactions[0].id,
                            },
                            data: {
                              reactionType: reactionType,
                              user: {
                                connect: {
                                  id: session.user.id,
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
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        reactions: {
                          create: {
                            reactionType: reactionType,
                            user: {
                              connect: {
                                id: session.user.id,
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
      }

      const gReactions = await prisma.mediaCommentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        message: "Success ",
        reactionType,
      };
    }
  } catch {
    return {
      success: true,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
};

export const reactMediaReply = async (
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string | undefined,
  replyId: string | undefined,
  replyReplyId: string | undefined,
  reactionType: ReactionType,
  prevState: State
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un authorized request");
    }
    if (postType === "oUserPost") {
      const isReplyMediaReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      reactions: {
                        where: {
                          userId: session.user.id,
                        },
                        select: {
                          id: true,
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

      if (
        isReplyMediaReacted?.medias[0].comments[0].replies[0].reactions[0].id
      ) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                update: {
                                  where: {
                                    id: isReplyMediaReacted.medias[0]
                                      .comments[0].replies[0].reactions[0].id,
                                  },
                                  data: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: session.user.id,
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
            },
          },
          select: {
            medias: {
              where: {
                id: mediaId,
              },
              select: {
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    replies: {
                      where: {
                        id: replyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          where: {
                            id: isReplyMediaReacted.medias[0].comments[0]
                              .replies[0].reactions[0].id,
                          },
                          select: {
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
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: session.user.id,
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
          },
        });
      }

      const gReactions = await prisma.mediaReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyId: replyId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }
    if (postType === "oPagePost") {
      const isReplyMediaReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      reactions: {
                        where: {
                          userId: session.user.id,
                        },
                        select: {
                          id: true,
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

      if (
        isReplyMediaReacted?.medias[0].comments[0].replies[0].reactions[0].id
      ) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                update: {
                                  where: {
                                    id: isReplyMediaReacted.medias[0]
                                      .comments[0].replies[0].reactions[0].id,
                                  },
                                  data: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: session.user.id,
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
            },
          },
          select: {
            medias: {
              where: {
                id: mediaId,
              },
              select: {
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    replies: {
                      where: {
                        id: replyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          where: {
                            id: isReplyMediaReacted.medias[0].comments[0]
                              .replies[0].reactions[0].id,
                          },
                          select: {
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
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: session.user.id,
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
          },
        });
      }

      const gReactions = await prisma.mediaReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyId: replyId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }

    if (postType === "oGroupPost") {
      const isReplyMediaReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      reactions: {
                        where: {
                          userId: session.user.id,
                        },
                        select: {
                          id: true,
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

      if (
        isReplyMediaReacted?.medias[0].comments[0].replies[0].reactions[0].id
      ) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                update: {
                                  where: {
                                    id: isReplyMediaReacted.medias[0]
                                      .comments[0].replies[0].reactions[0].id,
                                  },
                                  data: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: session.user.id,
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
            },
          },
          select: {
            medias: {
              where: {
                id: mediaId,
              },
              select: {
                comments: {
                  where: {
                    id: commentId,
                  },
                  select: {
                    replies: {
                      where: {
                        id: replyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          where: {
                            id: isReplyMediaReacted.medias[0].comments[0]
                              .replies[0].reactions[0].id,
                          },
                          select: {
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
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: session.user.id,
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
          },
        });
      }

      const gReactions = await prisma.mediaReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyId: replyId,
        },
      });

      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });

      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }
  } catch {
    return {
      success: true,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
};

export const reactMediaReplyReply = async (
  postType: PostType,
  postId: string,
  mediaId: string | undefined,
  commentId: string | undefined,
  replyId: string | undefined,
  replyReplyId: string | undefined,
  reactionType: ReactionType,
  prevState: State
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un authorized request");
    }
    if (postType === "oUserPost") {
      const isMediaReplyReplyReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      replies: {
                        where: {
                          id: replyReplyId,
                        },
                        select: {
                          reactions: {
                            where: {
                              userId: session.user.id,
                            },
                            select: {
                              id: true,
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

      if (isMediaReplyReplyReacted) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      update: {
                                        where: {
                                          id: isMediaReplyReplyReacted.medias[0]
                                            .comments[0].replies[0].replies[0]
                                            .reactions[0].id,
                                        },
                                        data: {
                                          reactionType: reactionType,
                                          user: {
                                            connect: {
                                              id: session.user.id,
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
                  },
                },
              },
            },
          },
        });
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      create: {
                                        reactionType: reactionType,
                                        user: {
                                          connect: {
                                            id: session.user.id,
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
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReplyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyReplyId: replyReplyId,
        },
      });
      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }
    if (postType === "oPagePost") {
      const isMediaReplyReplyReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      replies: {
                        where: {
                          id: replyReplyId,
                        },
                        select: {
                          reactions: {
                            where: {
                              userId: session.user.id,
                            },
                            select: {
                              id: true,
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

      if (isMediaReplyReplyReacted) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      update: {
                                        where: {
                                          id: isMediaReplyReplyReacted.medias[0]
                                            .comments[0].replies[0].replies[0]
                                            .reactions[0].id,
                                        },
                                        data: {
                                          reactionType: reactionType,
                                          user: {
                                            connect: {
                                              id: session.user.id,
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
                  },
                },
              },
            },
          },
        });
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      create: {
                                        reactionType: reactionType,
                                        user: {
                                          connect: {
                                            id: session.user.id,
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
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReplyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyReplyId: replyReplyId,
        },
      });
      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }
    if (postType === "oGroupPost") {
      const isMediaReplyReplyReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          medias: {
            where: {
              id: mediaId,
            },
            select: {
              comments: {
                where: {
                  id: commentId,
                },
                select: {
                  replies: {
                    where: {
                      id: replyId,
                    },
                    select: {
                      replies: {
                        where: {
                          id: replyReplyId,
                        },
                        select: {
                          reactions: {
                            where: {
                              userId: session.user.id,
                            },
                            select: {
                              id: true,
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

      if (isMediaReplyReplyReacted) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      update: {
                                        where: {
                                          id: isMediaReplyReplyReacted.medias[0]
                                            .comments[0].replies[0].replies[0]
                                            .reactions[0].id,
                                        },
                                        data: {
                                          reactionType: reactionType,
                                          user: {
                                            connect: {
                                              id: session.user.id,
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
                  },
                },
              },
            },
          },
        });
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            medias: {
              update: {
                where: {
                  id: mediaId,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: commentId,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: replyId,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: replyReplyId,
                                  },
                                  data: {
                                    reactions: {
                                      create: {
                                        reactionType: reactionType,
                                        user: {
                                          connect: {
                                            id: session.user.id,
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
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.mediaReplyReplyReactions.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          replyReplyId: replyReplyId,
        },
      });
      const _gReactions = gReactions.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
      return {
        success: true,
        _gReactions: _gReactions,
        reactionType,
        message: "Success ",
      };
    }
  } catch {
    return {
      success: true,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
};
