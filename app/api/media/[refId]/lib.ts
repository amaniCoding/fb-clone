import { PostType } from "@/app/generated/prisma/client";
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

export const getPostMedias = async (
  userId: string,
  refFrom: "post" | "media",
  postType: PostType,
  postId: string
) => {
  if (postType === "oUserPost") {
    const post = await prisma.oUserPost.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        medias: {
          select: {
            id: true,
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
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
            // counts
            _count: {
              select: {
                comments: true,
                reactions: true,
              },
            },
          },
        },
      },
    });
    const updatedMedias = post?.medias.map(async (media) => {
      return {
        ...media,
        postType: "oUserPost" as PostType,

        postId: post.id,
        _gReactions: await prepareGReactions(media.id),
        _isReacted: await isReacted(userId, media.id),
      };
    });
    return {
      medias: await Promise.all(updatedMedias! ? updatedMedias : []),
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
          select: {
            id: true,
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
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
            // counts
            _count: {
              select: {
                comments: true,
                reactions: true,
              },
            },
          },
        },
      },
    });
    const updatedMedias = post?.medias.map(async (media) => {
      return {
        ...media,
        postType: "oPagePost" as PostType,

        postId: post.id,
        _gReactions: await prepareGReactions(media.id),
        _isReacted: await isReacted(userId, media.id),
      };
    });
    return {
      medias: await Promise.all(updatedMedias! ? updatedMedias : []),
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
          select: {
            id: true,
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
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
            // counts
            _count: {
              select: {
                comments: true,
                reactions: true,
              },
            },
          },
        },
      },
    });
    const updatedMedias = post?.medias.map(async (media) => {
      return {
        ...media,
        postType: "oGroupPost" as PostType,

        postId: post.id,
        _gReactions: await prepareGReactions(media.id),
        _isReacted: await isReacted(userId, media.id),
      };
    });
    return {
      medias: await Promise.all(updatedMedias! ? updatedMedias : []),
    };
  }
  return {
    medias: [],
  };
};

const result = await getPostMedias("userId", "post", "oUserPost", "postId");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const medias = result?.medias;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const media = result?.medias[0];
export type RepliesType = typeof medias;
export type ReplyType = typeof media;
