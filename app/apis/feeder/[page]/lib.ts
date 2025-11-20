import prisma from "@/app/libs/prisma";
import { GReaction, Reactor } from "../../types";
import { ReactionType, ToGroupSharerType } from "@/app/generated/prisma";
import { MediaCommentType } from "../../comments/media/oUserPost/[postid]/[mediaid]/[page]/lib";
import { CommentType } from "../../comments/oUserPost/[postid]/[page]/lib";

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
      case "toGroupSharedPost":
        {
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
        break;

      default:
        break;
    }
  } catch (error) {}
};

const prepareMeidaGReactions = async (mediaId: string | undefined) => {
  try {
    const r = await prisma.mediaReaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: mediaId,
      },
    });

    return r.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });
  } catch (error) {}
};
export const getFeeds = async (page: number) => {
  const skip = (page - 1) * 10;
  const count = prisma.feed.count();

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
                  createdAt: true,
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
                  createdAt: true,
                  //first media reactors
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
                  createdAt: true,
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
  });

  const [result, length] = await Promise.all([feeds, count]);
  const updated = result.map(async (feed) => {
    return {
      ...feed,
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

          medias: await Promise.all(
            feed.userPost?.oUserPost?.medias.map(async (media) => {
              return {
                ...media,
                feedId: feed.id,
                postId: feed.userPost?.oUserPost?.id,
                mediaId: media.id,
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            })!
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

          medias: await Promise.all(
            feed.pagePost?.oPagePost?.medias.map(async (media) => {
              return {
                ...media,
                feedId: feed.id,
                postId: feed.pagePost?.oPagePost?.id,
                mediaId: media.id,
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            })!
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

          medias: await Promise.all(
            feed.groupPost?.oGroupPost?.medias.map(async (media) => {
              return {
                ...media,
                feedId: feed.id,
                postId: feed.groupPost?.oGroupPost?.id,
                mediaId: media.id,
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            })!
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
        },
      },
    };
  });

  return {
    count: length,
    updated: await Promise.all(updated),
  };
};

// prepare

const feeds = await getFeeds(1);
const feed = feeds.updated[0];

const userPost = feed?.userPost;
const pagePost = feed?.pagePost;
const groupPost = feed?.groupPost;

const oUserpost = feed?.userPost?.oUserPost;
const userSharePost = feed?.userPost?.userSharePost;
const oPagepost = feed?.pagePost.oPagePost;
const pageSharePost = feed?.pagePost?.pageSharePost;
const oGrouppost = feed?.groupPost.oGroupPost;
const toGroupSharedPost = feed?.groupPost?.toGroupSharedPost;

export type UserPostType = typeof userPost;
export type PagePostType = typeof pagePost;
export type GroupPostType = typeof groupPost;

export type OUserPost = typeof oUserpost;
export type UserSharePost = typeof userSharePost;
export type OPagePost = typeof oPagepost;
export type PageSharePost = typeof pageSharePost;
export type OGroupPost = typeof oGrouppost;
export type ToGroupSharedPost = typeof toGroupSharedPost;

export type FeedsType = typeof feed;

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
