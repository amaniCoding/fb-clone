export type ReactionModalHeader = {
  reactionType: string;
  count: number;
};

export type ReactionModalReactors = {
  reactionType: string;
  loading: boolean;
  page: boolean;
  error: string;
  totalRows: number;
  totalPages: number;
};

import { Comment } from "@/app/apis/feeditem/comments/[posttype]/[postid]/[page]/lib";
import {
  PostType,
  Comment_USER,
  Comment_USER_MEDIA,
  MediaType,
} from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { count } from "console";
import { boolean } from "zod";

export type MediasType = {
  id: string;
  createdAt: Date;
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
  url: string;
  type: MediaType;
}[];

export const preparePostReactions = () => {
  return {
    currentReactionType: "",
    header: {
      loading: true,
      reactions: [] as ReactionModalHeader[],
    },
    reactors: [] as ReactionModalReactors[],
  };
};

const prepareGroupedReactions = async (postType: PostType, postId: string) => {
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
      };
    });
    return result;
  } catch (error) {}
};

export const preparePostComments = (totalRows: number) => {
  const rowsPerPage = 7;
  return {
    totalRows,
    totalPages: Math.ceil(totalRows / rowsPerPage),
    loading: false,
    page: 1,
    error: "",
    commentors: [] as Comment,
  };
};

export const prepareMediaComments = (medias: MediasType) => {
  const rowsPerPage = 7;
  const result = medias.map((media) => {
    return {
      totalRows: media._count.comments,
      totalPages: Math.ceil(media._count.comments / rowsPerPage),
      mediaId: media.id,
      loading: false,
      page: 1,
      error: "",
      commentros: [],
    };
  });
  return result;
};

export const prepareMediaReactions = (medias: MediasType) => {
  return medias.map((media) => {
    return {
      id: media.id,
      currentReactionType: "",
      header: {
        loading: true,
        reactions: [] as ReactionModalHeader[],
      },
    };
  });
};

export const getpost_users = async (page: number) => {
  const skip = (page - 1) * 10;
  const count = await prisma.post_USER.count();

  const posts_users = await prisma.post_USER.findMany({
    take: 10,
    skip: skip,
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
          _comments: preparePostComments(post._count.comments),
          _mediasComments: prepareMediaComments(post.medias),
          _reactions: preparePostReactions(),
          _groupedReactions: await prepareGroupedReactions(
            post.postType,
            post.id
          ),
          _mediasReactions: prepareMediaReactions(post.medias),
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

const result = await getpost_users(3);
const feed = await Promise.all(result.posts_user);

export type FeedsType = (typeof feed)[0];
