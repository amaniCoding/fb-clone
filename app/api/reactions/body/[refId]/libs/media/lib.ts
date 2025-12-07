import { LIMIT } from "@/app/api/config";

import prisma from "@/app/libs/prisma";
import { PostType, ReactionType } from "@/app/generated/prisma/client";

export const getReactorsForMedia = async (
  postType: PostType,
  postId: string,
  mediaId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType: reactionType,
              },
              select: {
                reactionType: true,
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
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].reactions,
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType: reactionType,
              },
              select: {
                reactionType: true,
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
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].reactions,
    };
  }
  if (postType === "oGroupPost") {
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
            reactions: {
              take: LIMIT,
              skip: skip,
              where: {
                reactionType: reactionType,
              },
              select: {
                reactionType: true,
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
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForMediaComment = async (
  postType: PostType,
  postId: string,
  mediaId: string,
  commentId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].comments[0].reactions,
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
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].comments[0].reactions,
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
                reactions: {
                  where: {
                    reactionType: reactionType,
                  },
                  take: LIMIT,
                  skip: skip,
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
                    reactionType: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      reactors: post?.medias[0].comments[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForMediaReply = async (
  postType: PostType,
  postId: string,
  mediaId: string,
  commentId: string,
  replyId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
                    reactions: {
                      where: {
                        reactionType: reactionType,
                      },
                      take: LIMIT,
                      skip: skip,
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
    return {
      reactors: post?.medias[0].comments[0].replies[0].reactions,
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
                    reactions: {
                      where: {
                        reactionType: reactionType,
                      },
                      take: LIMIT,
                      skip: skip,
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
    return {
      reactors: post?.medias[0].comments[0].replies[0].reactions,
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
                    reactions: {
                      where: {
                        reactionType: reactionType,
                      },
                      take: LIMIT,
                      skip: skip,
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
    return {
      reactors: post?.medias[0].comments[0].replies[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};

export const getReactorsForMediaReplyReply = async (
  postType: PostType,
  postId: string,
  mediaId: string,
  commentId: string,
  replyId: string,
  replyReplyId: string,
  reactionType: ReactionType,
  page: number
) => {
  const skip = (page - 1) * LIMIT;

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
                      where: {
                        id: replyReplyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          take: LIMIT,
                          skip: skip,
                          where: {
                            reactionType: reactionType,
                          },
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
        },
      },
    });
    return {
      reactors: post?.medias[0].comments[0].replies[0].replies[0].reactions,
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
                      where: {
                        id: replyReplyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          take: LIMIT,
                          skip: skip,
                          where: {
                            reactionType: reactionType,
                          },
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
        },
      },
    });
    return {
      reactors: post?.medias[0].comments[0].replies[0].replies[0].reactions,
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
                      where: {
                        id: replyReplyId,
                      },
                      select: {
                        id: true,
                        reactions: {
                          take: LIMIT,
                          skip: skip,
                          where: {
                            reactionType: reactionType,
                          },
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
        },
      },
    });
    return {
      reactors: post?.medias[0].comments[0].replies[0].replies[0].reactions,
    };
  }
  return {
    reactors: [],
  };
};
