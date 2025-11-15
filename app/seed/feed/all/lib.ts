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

export const _seedAll = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            include: {
              medias: true,
            },
          },
          userSharePost: true,
        },
      },
      pagePost: {
        include: {
          oPagePost: {
            include: {
              medias: true,
            },
          },
          pageSharePost: true,
        },
      },
      groupPost: {
        include: {
          oGroupPost: {
            include: {
              medias: true,
            },
          },
          toGroupSharedPost: true,
        },
      },
    },
  });

  const UPDATE = feeds.map(async (feed) => {
    const user = await getRandomUser();
    const comment = getRandomPostComment();
    const reply = getRandomPostComment();
    const reactionType = getRandomReactionType() as ReactionType;

    const oUPostMedias = feed.userPost?.oUserPost?.medias;
    const oPPostMedias = feed.pagePost?.oPagePost?.medias;
    const oGPostMedias = feed.groupPost?.oGroupPost?.medias;

    await prisma.feed.update({
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

    if (oUPostMedias) {
      await Promise.all(
        oUPostMedias.map((media) => {
          return prisma.media.update({
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
          });
        })
      );
    }
    if (oPPostMedias) {
      await Promise.all(
        oPPostMedias.map((media) => {
          return prisma.media.update({
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
          });
        })
      );
    }

    if (oGPostMedias) {
      await Promise.all(
        oGPostMedias.map((media) => {
          return prisma.media.update({
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
          });
        })
      );
    }
  });

  return await Promise.all(UPDATE);
};
