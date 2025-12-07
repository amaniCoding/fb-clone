/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from "@/app/libs/prisma";
import { PostType, ReactionType } from "@/app/generated/prisma/client";
import { State } from "../../types";
import { auth } from "@/app/auth";

export const reactPost = async (
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
      const isReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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

    if (postType === "userSharePost") {
      const isReacted = await prisma.userSharePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.userSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.userSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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
      const isReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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

    if (postType === "pageSharePost") {
      const isReacted = await prisma.pageSharePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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
      const isReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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

    if (postType === "toGroupSharedPost") {
      const isReacted = await prisma.toGroupSharePost.findUnique({
        where: {
          id: postId,
        },
        select: {
          reactions: {
            where: {
              userId: session.user.id,
            },
            select: {
              id: true,
              reactionType: true,
            },
          },
        },
      });

      if (isReacted?.reactions[0].id) {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              update: {
                where: {
                  id: isReacted.reactions[0].id,
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
        });
      } else {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
          },
          data: {
            reactions: {
              create: {
                reactionType: reactionType!,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.reaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          userPostId: postId,
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
      success: false,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
};

export const reactComment = async (
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
      const isCommentReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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

    if (postType === "userSharePost") {
      const isCommentReacted = await prisma.userSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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
      const isCommentReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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

    if (postType === "pageSharePost") {
      const isCommentReacted = await prisma.pageSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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
      const isCommentReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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

    if (postType === "toGroupSharedPost") {
      const isCommentReacted = await prisma.toGroupSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isCommentReacted) {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
                        id: isCommentReacted.comments[0].reactions[0].id,
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
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          commentId: commentId,
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

export const reactReply = async (
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
      const isReplyReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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

    if (postType === "userSharePost") {
      const isReplyReacted = await prisma.userSharePost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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
      const isReplyReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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

    if (postType === "pageSharePost") {
      const isReplyReacted = await prisma.pageSharePost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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
      const isReplyReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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

    if (postType === "toGroupSharedPost") {
      const isReplyReacted = await prisma.toGroupSharePost.findUnique({
        where: {
          id: postId,
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
      if (isReplyReacted?.comments[0].replies[0].reactions[0].id) {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
                              id: isReplyReacted.comments[0].replies[0]
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
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
                  },
                },
              },
            },
          },
        });
      }

      const gReactions = await prisma.replyReaction.groupBy({
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

export const reactReplyReply = async (
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
      const isReplyReplyReacted = await prisma.oUserPost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.oUserPost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.oUserPost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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
    if (postType === "userSharePost") {
      const isReplyReplyReacted = await prisma.userSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.userSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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
      const isReplyReplyReacted = await prisma.oPagePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.oPagePost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.oPagePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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

    if (postType === "pageSharePost") {
      const isReplyReplyReacted = await prisma.pageSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.pageSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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
      const isReplyReplyReacted = await prisma.oGroupPost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.oGroupPost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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
    if (postType === "toGroupSharedPost") {
      const isReplyReplyReacted = await prisma.toGroupSharePost.findUnique({
        where: {
          id: postId,
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
      });

      if (isReplyReplyReacted) {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
                                    id: isReplyReplyReacted.comments[0]
                                      .replies[0].replies[0].reactions[0].id,
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
        });
      } else {
        await prisma.toGroupSharePost.update({
          where: {
            id: postId,
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
        });
      }

      const gReactions = await prisma.replyReplyReactions.groupBy({
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
