import prisma from "@/app/libs/prisma";
import { GReaction, Reactor } from "../../types";
import { oUserPostCommentType } from "../../comments/oUserPost/[postid]/[page]/lib";
import { userSharePostCommentType } from "../../comments/userSharePost/[postid]/[page]/lib";
import { oPagePostCommentType } from "../../comments/oPagePost/[postid]/[page]/lib";
import { PageSharePostCommentType } from "../../comments/pageSharePost/[postid]/[page]/lib";
import { oGroupPostCommentType } from "../../comments/oGroupPost/[postid]/[page]/lib";
import { toGroupSharePostCommentType } from "../../comments/toGroupSharePost/[postid]/[page]/lib";
import { ReactionType } from "@/app/generated/prisma";
import { MediaCommentType } from "../../comments/media/oPagePost/[postid]/[mediaid]/[page]/lib";

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
          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as oUserPostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
          _gReactions: await prepareGReactions(
            "oUserPost",
            feed.userPost?.oUserPost?.id
          ),

          medias: await Promise.all(
            feed.userPost?.oUserPost?.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [] as MediaCommentType,
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
            })!
          ),
        },
        // share
        userSharePost: {
          ...feed.userPost?.userSharePost,
          rawOUserPost: feed.userPost?.userSharePost?.oUserPost,
          rawOPagePost: feed.userPost?.userSharePost?.oPagePost,
          rawOGroupPost: feed.userPost?.userSharePost?.oGroupPost,

          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as userSharePostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
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
          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as oPagePostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
          _gReactions: await prepareGReactions(
            "oPagePost",
            feed.pagePost?.oPagePost?.id
          ),

          medias: await Promise.all(
            feed.pagePost?.oPagePost?.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [] as MediaCommentType,
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
            })!
          ),
        },

        // apge share post
        pageSharePost: {
          ...feed.pagePost?.pageSharePost,
          rawOUserPost: feed.pagePost?.pageSharePost?.oUserPost,
          rawOPagePost: feed.pagePost?.pageSharePost?.oPagePost,
          rawOGroupPost: feed.pagePost?.pageSharePost?.oGroupPost,
          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as PageSharePostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
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

          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as oGroupPostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
          _gReactions: await prepareGReactions(
            "oGroupPost",
            feed.groupPost?.oGroupPost?.id
          ),

          medias: await Promise.all(
            feed.groupPost?.oGroupPost?.medias.map(async (media) => {
              return {
                ...media,
                _comments: {
                  loading: false,
                  page: 1,
                  error: "",
                  totalPages: 0,
                  totalRows: 0,
                  comments: [] as MediaCommentType,
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
            })!
          ),
        },
        // share
        toGroupSharedPost: {
          ...feed.groupPost?.toGroupSharedPost,
          rawOUserPost: feed.groupPost?.toGroupSharedPost?.oUserPost,
          rawOPagePost: feed.groupPost?.toGroupSharedPost?.oPagePost,
          rawOGroupPost: feed.groupPost?.toGroupSharedPost?.oGroupPost,
          _comments: {
            loading: false,
            page: 1,
            error: "",
            totalPages: 0,
            totalRows: 0,
            comments: [] as toGroupSharePostCommentType,
          },
          _reactions: {
            header: {
              currentReactionType: undefined as ReactionType | undefined,
              loading: false,
              error: undefined,
              gReactions: [] as GReaction[],
            },
            body: [] as Reactor[],
          },
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

const oUserPostMedia = oUserpost.medias;

const oUserPostMediaComment = oUserpost.medias[0]._comments.comments;

const rawO_U_UserMedia = userPost.userSharePost.rawOUserPost?.medias;

const rawO_U_User = userPost.userSharePost.rawOUserPost;
const rawO_U_Page = userPost.userSharePost.rawOPagePost;
const rawO_U_Group = userPost.userSharePost.rawOGroupPost;

const rawO_P_User = pagePost.pageSharePost.rawOUserPost;
const rawO_P_Page = pagePost.pageSharePost.rawOPagePost;
const rawO_P_Group = pagePost.pageSharePost.rawOGroupPost;

const rawO_TG_User = groupPost.toGroupSharedPost.rawOUserPost;
const rawO_TG_Page = groupPost.toGroupSharedPost.rawOPagePost;
const rawO_TG_Group = groupPost.toGroupSharedPost.rawOGroupPost;

const rawOUserPostMedia = userPost.userSharePost.rawOUserPost?.medias;
const rawOPagePostMedia = pagePost.pageSharePost.rawOPagePost?.medias;
const rawOGroupPostMedia = groupPost?.toGroupSharedPost.rawOGroupPost?.medias;

export type UserPostType = typeof userPost;
export type PagePostType = typeof pagePost;
export type GroupPostType = typeof groupPost;

export type OriginalUserPostType = typeof oUserpost;
export type OriginalPagePostType = typeof oPagepost;
export type OriginalGroupPostType = typeof oGrouppost;

export type rawO_U_UserType = typeof rawO_U_User;
export type rawO_U_PageType = typeof rawO_U_Page;
export type rawO_U_GroupType = typeof rawO_U_Group;

export type rawO_P_UserType = typeof rawO_P_User;
export type rawO_P_PageType = typeof rawO_P_Page;
export type rawO_P_GroupType = typeof rawO_P_Group;

export type rawO_TG_UserType = typeof rawO_TG_User;
export type rawO_TG_PageType = typeof rawO_TG_Page;
export type rawO_TG_GroupType = typeof rawO_TG_Group;

export type OriginalRawUserPostMediaType = typeof rawOUserPostMedia;
export type OriginalRawPagePostMediaType = typeof rawOPagePostMedia;
export type OriginalRawGroupPostMediaType = typeof rawOGroupPostMedia;

export type UserSharePostType = typeof userSharePost;
export type PageSharePostType = typeof pageSharePost;
export type ToGroupSharePostType = typeof toGroupSharedPost;

export type OriginalPostMediaType = typeof oUserPostMedia;
export type rawMediaType = typeof rawO_U_UserMedia;

export type FeedsType = typeof feed;
