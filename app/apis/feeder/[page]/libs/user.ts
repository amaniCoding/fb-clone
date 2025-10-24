import Comments from "@/app/components/home/feed/commentmodal.tsx/comments";
import { Medias_USER, PostType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { error } from "console";

type MediasType = {
  id: string;
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
    comments: number;
    reactions: number;
  };
}[];

export const preparePostReactions = async (
  postType: PostType,
  postId: string,
  totalRows: number
) => {
  const rowsPerPage = 7;
  try {
    const reactions = await prisma.postReactions_USER.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
    });
    const result = reactions.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
        totalRows: rxn._count.reactionType,
        totalPages: Math.ceil(rxn._count.reactionType / rowsPerPage),
        loading: false,
        page: 1,
        error: "",
        reactors: [],
      };
    });
    return result;
  } catch (error) {
    return [];
  }
};

const preparePostComments = (totalRows: number) => {
  const rowsPerPage = 7;
  return {
    totalRows,
    totalPages: Math.ceil(totalRows / rowsPerPage),
    loading: false,
    page: 1,
    error: "",
    commentors: [],
  };
};

const prepareMediaComments = (medias: MediasType) => {
  const result = medias.map((media) => {
    return {
      totalRows: media._count.comments,
      mediaId: media.id,
      loading: false,
      page: 1,
      error: "",
      commentros: [],
    };
  });
  return result;
};

const prepareMediaReactions = async (
  postType: PostType,
  medias: MediasType
) => {
  const rowsPerPage = 7;
  if (postType == "userpost") {
    try {
      const result = medias.map(async (media) => {
        const reactions = await prisma.postReactions_USER_MEDIA.groupBy({
          by: "reactionType",
          _count: {
            reactionType: true,
          },
          where: {
            id: media.id,
          },
        });

        const preparereactions = reactions.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
            loading: false,
            error: "",
            page: 1,
            totalRows: rxn._count.reactionType,
            totalPages: Math.ceil(rxn._count.reactionType / rowsPerPage),
          };
        });

        preparereactions.map((rxn) => {
          return {
            id: media.id,
            ...rxn,
          };
        });
      });

      return {
        currentReactionType: "",
        result: await Promise.all(result),
      };
    } catch (error) {}
  }
};

export const getpost_users = async (page: number) => {
  const offset = (page - 1) * 10;
  const count = await prisma.post_USER.count();
  const posts_users = await prisma.post_USER.findMany({
    take: 10,
    skip: offset,
    include: {
      medias: {
        select: {
          id: true,
          url: true,
          type: true,
          createdAt: true,
          _count: {
            select: {
              comments: true,
              reactions: true,
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
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
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

      _count: {
        select: {
          comments: true,
          reactions: true,
          medias: true,
        },
      },
      reactions: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  if (posts_users.length > 0) {
    return {
      count: count,
      posts_user: posts_users.map(async (post) => {
        return {
          ...post,
          _mediasComments: prepareMediaComments(post.medias),
          _mediaReactions: await prepareMediaReactions("userpost", post.medias),
          _comments: preparePostComments(post._count.comments),
          _reactions: await preparePostReactions(
            "userpost",
            post.id,
            post._count.reactions
          ),
        };
      }),
    };
  } else {
    return {
      count: 0,
      posts_user: [],
    };
  }
};

const f = await getpost_users(3);
const g = Promise.all(f.posts_user);

export type feedType = typeof g;
