import { FeedPostType, ReactionType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";

const isReacted = async (
  userId: string,
  type:
    | "oUserPost"
    | "userSharePost"
    | "oPagePost"
    | "pageSharePost"
    | "oGroupPost"
    | "toGroupSharedPost",
  id: string | undefined
) => {
  switch (type) {
    case "oUserPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          userPostId: id,
          userId: userId,
        },
        select: {
          userPostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.userPostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }
    case "userSharePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          userSharePostId: id,
          userId: userId,
        },
        select: {
          userSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.userSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }

    case "oPagePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          pagePostId: id,
          userId: userId,
        },
        select: {
          pagePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.pagePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }

    case "pageSharePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          pageSharePostId: id,
          userId: userId,
        },
        select: {
          pageSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.pageSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }

    case "oGroupPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          groupPostId: id,
          userId: userId,
        },
        select: {
          groupPostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.groupPostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }

    case "toGroupSharedPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          toGroupSharePostId: id,
          userId: userId,
        },
        select: {
          toGroupSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.toGroupSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: false,
      };
    }
    default:
      break;
  }
};

const prepareGReactions = async (
  type:
    | "oUserPost"
    | "userSharePost"
    | "oPagePost"
    | "pageSharePost"
    | "oGroupPost"
    | "toGroupSharedPost",
  id: string | undefined
) => {
  try {
    switch (type) {
      case "oUserPost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            userPostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }

      case "userSharePost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            userSharePostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }
      case "oPagePost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            pagePostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }

      case "pageSharePost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            pageSharePostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }

      case "oGroupPost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            groupPostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }
      case "toGroupSharedPost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            toGroupSharePostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }

      default:
        break;
    }
  } catch {}
};

export const getFeeds = async (userId: string, page: number) => {
  const skip = (page - 1) * 10;

  const feeds = prisma.feed.findMany({
    take: 10,
    skip: skip,
    select: {
      id: true,
      postType: true,
      userPost: {
        select: {
          postType: true,
          oUserPost: {
            select: {
              id: true,
              postType: true,
              content: true,
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
              // first reactors
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
              // first commentros
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

              medias: {
                select: {
                  id: true,
                  type: true,
                  url: true,
                  owner: true,
                  createdAt: true,
                  // first media reactors
                },
              },
            },
          },
          userSharePost: {
            select: {
              id: true,
              postType: true,
              shareWhat: true,
              content: true,
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
              // first media reactors
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
              // first media commentors
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

              oUserPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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
                  // first reactors

                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      owner: true,
                      createdAt: true,
                      // first media reactors
                    },
                  },
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
                  createdAt: true,

                  page: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },
                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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

                  group: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },

                  medias: {
                    select: {
                      id: true,
                      owner: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },

              media: {
                select: {
                  id: true,
                  url: true,
                  owner: true,
                  userPost: {
                    select: {
                      user: {
                        select: {
                          id: true,
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
                  pagePost: {
                    select: {
                      id: true,
                      page: {
                        select: {
                          name: true,
                          profilePicture: true,
                        },
                      },
                    },
                  },
                  groupPost: {
                    select: {
                      id: true,
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
                      group: {
                        select: {
                          name: true,
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
      },
      pagePost: {
        select: {
          postType: true,
          oPagePost: {
            select: {
              id: true,
              postType: true,
              content: true,
              createdAt: true,
              // first reactors

              page: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },
              medias: {
                select: {
                  id: true,
                  type: true,
                  url: true,
                  owner: true,
                  createdAt: true,
                  //first media reactors
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
              // first commentros
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
          pageSharePost: {
            select: {
              id: true,
              shareWhat: true,
              postType: true,
              content: true,
              createdAt: true,
              page: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },

              // sharedposts
              oUserPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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
                  // first reactors

                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      createdAt: true,
                      // first media reactors
                    },
                  },
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
                  createdAt: true,

                  page: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },
                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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

                  group: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },

                  medias: {
                    select: {
                      id: true,
                      owner: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },

              media: {
                select: {
                  id: true,
                  url: true,
                  owner: true,
                  userPost: {
                    select: {
                      user: {
                        select: {
                          id: true,
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
                  pagePost: {
                    select: {
                      id: true,
                      page: {
                        select: {
                          name: true,
                          profilePicture: true,
                        },
                      },
                    },
                  },
                  groupPost: {
                    select: {
                      id: true,
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
                      group: {
                        select: {
                          name: true,
                          profilePicture: true,
                        },
                      },
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
              //first media commentors
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
      },
      groupPost: {
        select: {
          postType: true,
          oGroupPost: {
            select: {
              id: true,
              postType: true,
              content: true,
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

              group: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },

              medias: {
                select: {
                  id: true,
                  type: true,
                  url: true,
                  owner: true,
                  createdAt: true,
                  // first media reactors
                },
              },
              // first reactors
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
          toGroupSharedPost: {
            select: {
              id: true,
              postType: true,
              shareWhat: true,
              sharer: true,
              content: true,
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
              page: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },

              group: {
                select: {
                  name: true,
                  profilePicture: true,
                },
              },

              // shared posts

              oUserPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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
                  // first reactors

                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      createdAt: true,
                      // first media reactors
                    },
                  },
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
                  createdAt: true,

                  page: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },
                  medias: {
                    select: {
                      id: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
                  content: true,
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

                  group: {
                    select: {
                      name: true,
                      profilePicture: true,
                    },
                  },

                  medias: {
                    select: {
                      id: true,
                      owner: true,
                      type: true,
                      url: true,
                      createdAt: true,
                    },
                  },
                },
              },

              media: {
                select: {
                  id: true,
                  url: true,
                  owner: true,
                  userPost: {
                    select: {
                      user: {
                        select: {
                          id: true,
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
                  pagePost: {
                    select: {
                      id: true,
                      page: {
                        select: {
                          name: true,
                          profilePicture: true,
                        },
                      },
                    },
                  },
                  groupPost: {
                    select: {
                      id: true,
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
                      group: {
                        select: {
                          name: true,
                          profilePicture: true,
                        },
                      },
                    },
                  },
                },
              },
              // first reactors
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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = await feeds;
  const updated = result.map(async (feed) => {
    return {
      ...feed,
      feedId: feed.id,
      userPost: {
        ...feed.userPost,
        oUserPost: {
          ...feed.userPost?.oUserPost,
          feedId: feed.id,
          postId: feed.userPost?.oUserPost?.id,
          _gReactions: await prepareGReactions(
            "oUserPost",
            feed.userPost?.oUserPost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "oUserPost",
            feed.userPost?.oUserPost?.id
          ),
        },
        // share
        userSharePost: {
          ...feed.userPost?.userSharePost,
          feedId: feed.id,
          postId: feed.userPost?.userSharePost?.id,
          _gReactions: await prepareGReactions(
            "userSharePost",
            feed.userPost?.userSharePost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "userSharePost",
            feed.userPost?.userSharePost?.id
          ),
        },
      },

      // pagepost
      pagePost: {
        ...feed.pagePost,
        oPagePost: {
          ...feed.pagePost?.oPagePost,
          feedId: feed.id,
          postId: feed.pagePost?.oPagePost?.id,
          _gReactions: await prepareGReactions(
            "oPagePost",
            feed.pagePost?.oPagePost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "oPagePost",
            feed.pagePost?.oPagePost?.id
          ),
        },

        // apge share post
        pageSharePost: {
          ...feed.pagePost?.pageSharePost,
          feedId: feed.id,
          postId: feed.pagePost?.pageSharePost?.id,
          _gReactions: await prepareGReactions(
            "pageSharePost",
            feed.pagePost?.pageSharePost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "pageSharePost",
            feed.pagePost?.pageSharePost?.id
          ),
        },
      },

      // group post

      groupPost: {
        ...feed.groupPost,
        oGroupPost: {
          ...feed.groupPost?.oGroupPost,
          feedId: feed.id,
          postId: feed.groupPost?.oGroupPost?.id,
          _gReactions: await prepareGReactions(
            "oGroupPost",
            feed.groupPost?.oGroupPost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "oGroupPost",
            feed.groupPost?.oGroupPost?.id
          ),
        },
        // share
        toGroupSharedPost: {
          ...feed.groupPost?.toGroupSharedPost,
          feedId: feed.id,
          postId: feed.groupPost?.toGroupSharedPost?.id,
          _gReactions: await prepareGReactions(
            "toGroupSharedPost",
            feed.groupPost?.toGroupSharedPost?.id
          ),
          _isReacted: await isReacted(
            userId,
            "toGroupSharedPost",
            feed.groupPost?.toGroupSharedPost?.id
          ),
        },
      },
    };
  });

  return {
    updated: await Promise.all(updated),
  };
};

// prepare

const feeds = await getFeeds("loggedInUserId", 1);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const feed = feeds.updated[0];

export type UserPostType = typeof feed.userPost;
export type PagePostType = typeof feed.pagePost;
export type GroupPostType = typeof feed.groupPost;

export type OUserPost = typeof feed.userPost.oUserPost;
export type UserSharePost = typeof feed.userPost.userSharePost;
export type OPagePost = typeof feed.pagePost.oPagePost;
export type PageSharePost = typeof feed.pagePost.pageSharePost;
export type OGroupPost = typeof feed.groupPost.oGroupPost;
export type ToGroupSharedPost = typeof feed.groupPost.toGroupSharedPost;
export type FeedsType = {
  id: string;
  postType: FeedPostType;

  feedId: string;
  userPost?: {
    oUserPost?: typeof feed.userPost.oUserPost;
    userSharePost?: typeof feed.userPost.userSharePost;
  };
  pagePost?: {
    oPagePost?: typeof feed.pagePost.oPagePost;
    pageSharePost?: typeof feed.pagePost.pageSharePost;
  };
  groupPost?: {
    oGroupPost?: typeof feed.groupPost.oGroupPost;
    toGroupSharedPost?: typeof feed.groupPost.toGroupSharedPost;
  };
};

export type CurrentPostType = {
  _gReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;

  comments: {
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
  }[];

  reactions: {
    user: {
      firstName: string;
      lastName: string;
      Profile: {
        profilePicture: string | null;
      } | null;
    };
  }[];
};
