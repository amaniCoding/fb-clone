import prisma from "@/app/libs/prisma";

import { ReactionType } from "@/app/generated/prisma";
import { dummyComments, reactionTypes } from "../../dummy";
const getRandomNumber = (num: number, from: number) => {
  return Math.floor(Math.random() * num) + from;
};
const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
    },
  });
};

const getRandomUser = async () => {
  const users = await getUsers();
  const rIndex = getRandomNumber(users.length, 0);
  return users[rIndex];
};

const getRandomReactionType = () => {
  const rIndex = getRandomNumber(reactionTypes.length, 0);
  return reactionTypes[rIndex];
};

const getRandomPostComment = () => {
  const rIndex = getRandomNumber(dummyComments.length, 0);
  return dummyComments[rIndex];
};

export const _seedAll = async () => {};
export const _update_all_posts = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              id: true,
            },
          },
          userSharePost: {
            select: {
              id: true,
            },
          },
        },
      },
      pagePost: {
        include: {
          oPagePost: {
            select: {
              id: true,
            },
          },
          pageSharePost: {
            select: {
              id: true,
            },
          },
        },
      },
      groupPost: {
        include: {
          oGroupPost: {
            select: {
              id: true,
            },
          },
          toGroupSharedPost: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const UPDATE = feeds.map(async (feed) => {
    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          userPost: {
            update: {
              oUserPost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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

    if (feed.userPost && feed.userPost.userSharePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          userPost: {
            update: {
              userSharePost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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

    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          pagePost: {
            update: {
              oPagePost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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

    if (feed.pagePost && feed.pagePost.pageSharePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          pagePost: {
            update: {
              pageSharePost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          groupPost: {
            update: {
              oGroupPost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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
    if (feed.groupPost && feed.groupPost.toGroupSharePostId) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      return prisma.feed.update({
        where: {
          id: feed.id,
        },
        data: {
          groupPost: {
            update: {
              toGroupSharedPost: {
                update: {
                  comments: {
                    create: {
                      content: comment,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType,
                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                        },
                      },
                      replies: {
                        create: {
                          content: reply,
                          user: {
                            connect: {
                              id: user.id,
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
  });

  return await Promise.all(UPDATE);
};
export const _update_all_medias = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              medias: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      pagePost: {
        include: {
          oPagePost: {
            include: {
              medias: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      groupPost: {
        include: {
          oGroupPost: {
            include: {
              medias: {
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
  const UPDATE = feeds.map(async (feed) => {
    const oUPostMedias = feed.userPost?.oUserPost?.medias;
    const oPPostMedias = feed.pagePost?.oPagePost?.medias;
    const oGPostMedias = feed.groupPost?.oGroupPost?.medias;

    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oUPostMedias) {
        return Promise.all(
          oUPostMedias.map((media) => {
            return prisma.feed.update({
              where: {
                id: feed.id,
              },
              data: {
                userPost: {
                  update: {
                    oUserPost: {
                      update: {
                        medias: {
                          update: {
                            where: {
                              id: media.id,
                            },
                            data: {
                              comments: {
                                create: {
                                  content: comment,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                  reactions: {
                                    create: {
                                      reactionType,
                                      user: {
                                        connect: {
                                          id: user.id,
                                        },
                                      },
                                    },
                                  },
                                  replies: {
                                    create: {
                                      content: reply,
                                      user: {
                                        connect: {
                                          id: user.id,
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
          })
        );
      }
    }

    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oPPostMedias) {
        return Promise.all(
          oPPostMedias.map((media) => {
            return prisma.feed.update({
              where: {
                id: feed.id,
              },
              data: {
                pagePost: {
                  update: {
                    oPagePost: {
                      update: {
                        medias: {
                          update: {
                            where: {
                              id: media.id,
                            },
                            data: {
                              comments: {
                                create: {
                                  content: comment,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                  reactions: {
                                    create: {
                                      reactionType,
                                      user: {
                                        connect: {
                                          id: user.id,
                                        },
                                      },
                                    },
                                  },
                                  replies: {
                                    create: {
                                      content: reply,
                                      user: {
                                        connect: {
                                          id: user.id,
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
          })
        );
      }
    }
    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reply = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oGPostMedias) {
        return Promise.all(
          oGPostMedias.map((media) => {
            return prisma.feed.update({
              where: {
                id: feed.id,
              },
              data: {
                groupPost: {
                  update: {
                    oGroupPost: {
                      update: {
                        medias: {
                          update: {
                            where: {
                              id: media.id,
                            },
                            data: {
                              comments: {
                                create: {
                                  content: comment,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                  reactions: {
                                    create: {
                                      reactionType,
                                      user: {
                                        connect: {
                                          id: user.id,
                                        },
                                      },
                                    },
                                  },
                                  replies: {
                                    create: {
                                      content: reply,
                                      user: {
                                        connect: {
                                          id: user.id,
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
          })
        );
      }
    }
  });
  return Promise.all(UPDATE);
};
