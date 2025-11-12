import prisma from "@/app/libs/prisma";
import { GReaction, Reactor } from "../../types";

const prepareGReactions = async (id: string | undefined) => {
  try {
    const r = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        id: id,
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
          oUserPost: {
            select: {
              id: true,
              postType: true,
              content: true,
              createdAt: true,
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
              medias: {
                select: {
                  id: true,
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
                  content: true,
                  medias: true,
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  page: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
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
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
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
                },
              },
              medias: {
                select: {
                  id: true,
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
              content: true,
              createdAt: true,
              page: {
                select: {
                  name: true,
                },
              },

              // sharedposts
              oUserPost: {
                select: {
                  id: true,
                  postType: true,
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
                  content: true,
                  medias: true,
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  page: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
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
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
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
        },
      },
      groupPost: {
        select: {
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
                },
              },

              medias: {
                select: {
                  id: true,
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
              content: true,
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
                },
              },

              // shared posts

              oUserPost: {
                select: {
                  id: true,
                  postType: true,
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
                  content: true,
                  medias: true,
                },
              },
              oPagePost: {
                select: {
                  id: true,
                  postType: true,
                  page: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
                },
              },
              oGroupPost: {
                select: {
                  id: true,
                  postType: true,
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
                      id: true,
                      name: true,
                    },
                  },
                  content: true,
                  medias: true,
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
    if (feed.userPost && feed.userPost.oUserPost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.userPost.oUserPost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(feed.userPost.oUserPost.id),

            medias: feed.userPost.oUserPost.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [],
                },

                _reactions: {
                  header: {
                    currentReactionType: undefined,
                    loading: false,
                    error: undefined,
                    gReactions: [] as GReaction[],
                  },
                  body: [] as Reactor[],
                },
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            }),
          },
        },
      };
    }
    if (feed.userPost && feed.userPost.userSharePost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.userPost.userSharePost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(
              feed.userPost.userSharePost.id
            ),
          },
        },
      };
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.pagePost.oPagePost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(feed.pagePost.oPagePost.id),

            medias: feed.pagePost.oPagePost.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [],
                },

                _reactions: {
                  header: {
                    currentReactionType: undefined,
                    loading: false,
                    error: undefined,
                    gReactions: [] as GReaction[],
                  },
                  body: [] as Reactor[],
                },
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            }),
          },
        },
      };
    }

    if (feed.pagePost && feed.pagePost.pageSharePost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.pagePost.pageSharePost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(
              feed.pagePost.pageSharePost.id
            ),
          },
        },
      };
    }

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.groupPost.oGroupPost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(feed.groupPost.oGroupPost.id),

            medias: feed.groupPost.oGroupPost.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [],
                },

                _reactions: {
                  header: {
                    currentReactionType: undefined,
                    loading: false,
                    error: undefined,
                    gReactions: [] as GReaction[],
                  },
                  body: [] as Reactor[],
                },
                _gReactions: await prepareMeidaGReactions(media.id),
              };
            }),
          },
        },
      };
    }

    if (feed.groupPost && feed.groupPost.toGroupSharedPost) {
      return {
        ...feed,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.groupPost.toGroupSharedPost,
            _comments: {
              loading: false,
              page: 1,
              error: "",
              totalPages: 0,
              totalRows: 0,
              comments: [],
            },
            _reactions: {
              header: {
                currentReactionType: undefined,
                loading: false,
                error: undefined,
                gReactions: [] as GReaction[],
              },
              body: [] as Reactor[],
            },
            _gReactions: await prepareGReactions(
              feed.groupPost.toGroupSharedPost.id
            ),
          },
        },
      };
    }
  });

  return {
    count: length,
    updated: await Promise.all(updated),
  };
};

// prepare

const feeds = await getFeeds(1);
const feed = feeds.updated[0];
const oUserpost = feed && feed?.userPost.oUserPost;
const userSharePost = feed && feed?.userPost.userSharePost;
const oPagepost = feed && feed?.pagePost;
const pageSharePost = feed && feed?.pagePost?.pageSharePost;
const oGrouppost = feed && feed?.groupPost;
const toGroupSharedPost = feed && feed?.groupPost?.toGroupSharedPost;

export type FeedsType = typeof feed;
export type OriginalUserPostType = typeof oUserpost;
export type OriginalPagePostType = typeof oPagepost;
export type OriginalGroupPostType = typeof oGrouppost;

export type UserSharePostType = typeof userSharePost;
export type PageSharePostType = typeof pageSharePost;
export type ToGroupSharePostType = typeof toGroupSharedPost;
