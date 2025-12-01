import prisma from "@/app/libs/prisma";

import { ReactionType } from "@/app/generated/prisma";
import {
  dummyComments,
  dummyReplies,
  dummyReplyReplies,
  reactionTypes,
} from "./dummy";
const postContentOption = ["contentonly", "mediasonly", "both"];

const getRandomPost = async (
  forWhat: "user" | "usershare" | "page" | "pageshare" | "group" | "groupshare"
) => {
  if (forWhat === "user") {
    const userPosts = await prisma.oUserPost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(userPosts.length, 0);
    return userPosts[rIndex];
  }

  if (forWhat === "usershare") {
    const userSharePost = await prisma.userSharePost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(userSharePost.length, 0);
    return userSharePost[rIndex];
  }
  if (forWhat === "page") {
    const pagePosts = await prisma.oPagePost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(pagePosts.length, 0);
    return pagePosts[rIndex];
  }
  if (forWhat === "pageshare") {
    const pageSharePosts = await prisma.pageSharePost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(pageSharePosts.length, 0);
    return pageSharePosts[rIndex];
  }

  if (forWhat === "group") {
    const groupPosts = await prisma.oGroupPost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(groupPosts.length, 0);
    return groupPosts[rIndex];
  }

  if (forWhat === "groupshare") {
    const toGroupSharedPosts = await prisma.toGroupSharePost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(toGroupSharedPosts.length, 0);
    return toGroupSharedPosts[rIndex];
  }
};
const getRandomPostContentOption = () => {
  const rIndex = getRandomNumber(postContentOption.length, 0);
  return postContentOption[rIndex];
};

const getRandomMedia = async (forWhat: "user" | "page" | "group") => {
  if (forWhat === "user") {
    const oUserPosts = await prisma.oUserPost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: {
          select: {
            id: true,
          },
        },
      },
    });

    const rIndex = getRandomNumber(oUserPosts.length, 0);
    const post = oUserPosts[rIndex];
    const rMIndex = getRandomNumber(post.medias.length, 0);
    return post!.medias[rMIndex];
  }

  if (forWhat === "page") {
    const oPagePosts = await prisma.oPagePost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: {
          select: {
            id: true,
          },
        },
      },
    });

    const rIndex = getRandomNumber(oPagePosts.length, 0);
    const post = oPagePosts[rIndex];
    const rMIndex = getRandomNumber(post.medias.length, 0);
    return post.medias[rMIndex];
  }

  if (forWhat === "group") {
    const OgroupPosts = await prisma.oGroupPost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: {
          select: {
            id: true,
          },
        },
      },
    });

    const rIndex = getRandomNumber(OgroupPosts.length, 0);
    const post = OgroupPosts[rIndex];
    const rMIndex = getRandomNumber(post.medias.length, 0);
    return post.medias[rMIndex];
  }
};
const postType = [
  "user",
  "usershare",
  "page",
  "pageshare",
  "group",
  "groupshare",
];

const postTypeForMedia = ["user", "page", "group"];
const getRandomNumber = (num: number, from: number) => {
  return Math.floor(Math.random() * num) + from;
};

const getRandomPostType = () => {
  const rIndex = getRandomNumber(postType.length, 0);
  return postType[rIndex] as
    | "user"
    | "usershare"
    | "page"
    | "pageshare"
    | "group"
    | "groupshare";
};

const getRandomPostForMediaType = () => {
  const rIndex = getRandomNumber(postTypeForMedia.length, 0);
  return postTypeForMedia[rIndex] as "user" | "page" | "group";
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

export const getRandomReactionType = () => {
  const rIndex = getRandomNumber(reactionTypes.length, 0);
  return reactionTypes[rIndex];
};

function generatePhoto() {
  const randomPhoto = getRandomNumber(15, 1);

  return `/users/${randomPhoto}.jpg`;
}

export const getRandomPostComment = () => {
  const rIndex = getRandomNumber(dummyComments.length, 0);
  return dummyComments[rIndex];
};

export const getRandomCommentReply = () => {
  const rIndex = getRandomNumber(dummyReplies.length, 0);
  return dummyReplies[rIndex];
};

export const getRandomCommentReplReply = () => {
  const rIndex = getRandomNumber(dummyReplyReplies.length, 0);
  return dummyReplyReplies[rIndex];
};

export const _add_comment_and_reactions = async () => {
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
    orderBy: {
      createdAt: "desc",
    },
  });
  const UPDATE = feeds.map(async (feed) => {
    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },
                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
    if (feed.userPost && feed.userPost.userSharePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },
                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },
                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
    if (feed.pagePost && feed.pagePost.pageSharePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },
                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },
                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
    if (feed.groupPost && feed.groupPost.toGroupSharedPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
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
                      content:
                        commentPostOption === "contentonly" ||
                        commentPostOption === "both"
                          ? comment
                          : null,
                      mediaUrl:
                        commentPostOption === "both" ||
                        commentPostOption === "mediasonly"
                          ? generatePhoto()
                          : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                    },
                  },

                  reactions: {
                    create: {
                      reactionType: reactionType,
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
      });
    }
  });
  return await Promise.all(UPDATE);
};

export const _add_comment_replies_and_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
          userSharePost: {
            select: {
              id: true,
              comments: {
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
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
          pageSharePost: {
            select: {
              id: true,
              comments: {
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
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
          toGroupSharedPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
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
    take: 5,
  });

  const UPDATE = feeds.map(async (feed) => {
    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";

      return Promise.all(
        feed.userPost.oUserPost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }
    if (feed.userPost && feed.userPost.userSharePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return Promise.all(
        feed.userPost.userSharePost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return Promise.all(
        feed.pagePost.oPagePost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }
    if (feed.pagePost && feed.pagePost.pageSharePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return Promise.all(
        feed.pagePost.pageSharePost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }
    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return Promise.all(
        feed.groupPost.oGroupPost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }

    if (feed.groupPost && feed.groupPost.toGroupSharedPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption() as
        | "contentonly"
        | "mediasonly"
        | "both";
      return Promise.all(
        feed.groupPost.toGroupSharedPost.comments.slice(0, 6).map((co) => {
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
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            reactions: {
                              create: {
                                reactionType: reactionType,
                                user: {
                                  connect: {
                                    id: user.id,
                                  },
                                },
                              },
                            },
                            replies: {
                              create: {
                                content:
                                  replyPostOption === "contentonly" ||
                                  replyPostOption === "both"
                                    ? reply
                                    : null,
                                mediaUrl:
                                  replyPostOption === "both" ||
                                  replyPostOption === "mediasonly"
                                    ? generatePhoto()
                                    : null,
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
          });
        })
      );
    }
  });

  return await Promise.all(UPDATE);
};

export const _add_reply_replies_and_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          userSharePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      pagePost: {
        include: {
          oPagePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          pageSharePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      groupPost: {
        include: {
          oGroupPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
            },
          },
          toGroupSharedPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                    },
                  },
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
  const UPDATE = feeds.map(async (feed) => {
    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.userPost.oUserPost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
    if (feed.userPost && feed.userPost.userSharePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.userPost.userSharePost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.pagePost.oPagePost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
    if (feed.pagePost && feed.pagePost.pageSharePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.pagePost.pageSharePost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.groupPost.oGroupPost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
    if (feed.groupPost && feed.groupPost.toGroupSharedPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReplReply();
      const reactionTye = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();

      return Promise.all(
        feed.groupPost.toGroupSharedPost.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
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
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                replies: {
                                  update: {
                                    where: {
                                      id: rep.id,
                                    },
                                    data: {
                                      reactions: {
                                        create: {
                                          reactionType: reactionTye,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                        },
                                      },
                                      replies: {
                                        create: {
                                          content:
                                            replyPostOption === "contentonly" ||
                                            replyPostOption === "both"
                                              ? reply
                                              : null,
                                          mediaUrl:
                                            replyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
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
                },
              });
            })
          );
        })
      );
    }
  });

  return await Promise.all(UPDATE);
};

export const _add_replyreply_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          userSharePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
        include: {
          oPagePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          pageSharePost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
        include: {
          oGroupPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          toGroupSharedPost: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
    orderBy: {
      createdAt: "desc",
    },
  });
  const UPDATE = feeds.map(async (feed) => {
    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.userPost.oUserPost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }
    if (feed.userPost && feed.userPost.userSharePost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.userPost.userSharePost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.pagePost.oPagePost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }
    if (feed.pagePost && feed.pagePost.pageSharePost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.pagePost.pageSharePost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }
    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.groupPost.oGroupPost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }

    if (feed.groupPost && feed.groupPost.toGroupSharedPost) {
      const user = await getRandomUser();

      const reactionType = getRandomReactionType() as ReactionType;

      feed.groupPost.toGroupSharedPost.comments.map((co) => {
        co.replies.map((rep) => {
          rep.replies.map((_rep) => {
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
                          update: {
                            where: {
                              id: co.id,
                            },
                            data: {
                              replies: {
                                update: {
                                  where: {
                                    id: rep.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: _rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
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
                    },
                  },
                },
              },
            });
          });
        });
      });
    }
  });

  return await Promise.all(UPDATE);
};

export const _add_media_comment_and_reactions = async () => {
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

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

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
                                  content:
                                    commentPostOption === "contentonly" ||
                                    commentPostOption === "both"
                                      ? comment
                                      : null,
                                  mediaUrl:
                                    commentPostOption === "both"
                                      ? generatePhoto()
                                      : null,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: reactionType,
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
            });
          })
        );
      }
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

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
                                  content:
                                    commentPostOption === "contentonly" ||
                                    commentPostOption === "both"
                                      ? comment
                                      : null,
                                  mediaUrl:
                                    commentPostOption === "both"
                                      ? generatePhoto()
                                      : null,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: reactionType,
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
            });
          })
        );
      }
    }

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

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
                                  content:
                                    commentPostOption === "contentonly" ||
                                    commentPostOption === "both"
                                      ? comment
                                      : null,
                                  mediaUrl:
                                    commentPostOption === "both"
                                      ? generatePhoto()
                                      : null,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: reactionType,
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
            });
          })
        );
      }
    }
  });
  return Promise.all(UPDATE);
};

export const _add_media_comment_replies_and_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                    },
                  },
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
                  comments: {
                    select: {
                      id: true,
                    },
                  },
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
                  comments: {
                    select: {
                      id: true,
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
  const UPDATE = feeds.map(async (feed) => {
    const oUPostMedias = feed.userPost?.oUserPost?.medias;
    const oPPostMedias = feed.pagePost?.oPagePost?.medias;
    const oGPostMedias = feed.groupPost?.oGroupPost?.medias;

    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();
      if (oUPostMedias) {
        return Promise.all(
          oUPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
                                            user: {
                                              connect: {
                                                id: user.id,
                                              },
                                            },
                                          },
                                        },
                                        replies: {
                                          create: {
                                            content:
                                              replyPostOption ===
                                                "contentonly" ||
                                              replyPostOption === "both"
                                                ? reply
                                                : null,
                                            mediaUrl:
                                              replyPostOption === "both"
                                                ? generatePhoto()
                                                : null,
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
                  },
                });
              })
            );
          })
        );
      }
    }
    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();
      if (oPPostMedias) {
        return Promise.all(
          oPPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
                                            user: {
                                              connect: {
                                                id: user.id,
                                              },
                                            },
                                          },
                                        },
                                        replies: {
                                          create: {
                                            content:
                                              replyPostOption ===
                                                "contentonly" ||
                                              replyPostOption === "both"
                                                ? reply
                                                : null,
                                            mediaUrl:
                                              replyPostOption === "both"
                                                ? generatePhoto()
                                                : null,
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
                  },
                });
              })
            );
          })
        );
      }
    }

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const reply = getRandomCommentReply();
      const reactionType = getRandomReactionType() as ReactionType;
      const replyPostOption = getRandomPostContentOption();
      if (oGPostMedias) {
        return Promise.all(
          oGPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
                                            user: {
                                              connect: {
                                                id: user.id,
                                              },
                                            },
                                          },
                                        },
                                        replies: {
                                          create: {
                                            content:
                                              replyPostOption ===
                                                "contentonly" ||
                                              replyPostOption === "both"
                                                ? reply
                                                : null,
                                            mediaUrl:
                                              replyPostOption === "both"
                                                ? generatePhoto()
                                                : null,
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
                  },
                });
              })
            );
          })
        );
      }
    }
  });
  return Promise.all(UPDATE);
};

export const _add_media_replyReply_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                          replies: {
                            select: {
                              id: true,
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
      pagePost: {
        include: {
          oPagePost: {
            include: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                          replies: {
                            select: {
                              id: true,
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
      groupPost: {
        include: {
          oGroupPost: {
            include: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
                          replies: {
                            select: {
                              id: true,
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
  const UPDATE = feeds.map(async (feed) => {
    const oUPostMedias = feed.userPost?.oUserPost?.medias;
    const oPPostMedias = feed.pagePost?.oPagePost?.medias;
    const oGPostMedias = feed.groupPost?.oGroupPost?.medias;

    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oPPostMedias) {
        return Promise.all(
          oPPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
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
                                            update: {
                                              where: {
                                                id: co.id,
                                              },
                                              data: {
                                                replies: {
                                                  update: {
                                                    where: {
                                                      id: rep.id,
                                                    },
                                                    data: {
                                                      replies: {
                                                        update: {
                                                          where: {
                                                            id: _rep.id,
                                                          },
                                                          data: {
                                                            reactions: {
                                                              create: {
                                                                reactionType:
                                                                  reactionType,
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
                  })
                );
              })
            );
          })
        );
      }
    }

    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oGPostMedias) {
        return Promise.all(
          oGPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
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
                                            update: {
                                              where: {
                                                id: co.id,
                                              },
                                              data: {
                                                replies: {
                                                  update: {
                                                    where: {
                                                      id: rep.id,
                                                    },
                                                    data: {
                                                      replies: {
                                                        update: {
                                                          where: {
                                                            id: _rep.id,
                                                          },
                                                          data: {
                                                            reactions: {
                                                              create: {
                                                                reactionType:
                                                                  reactionType,
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
                  })
                );
              })
            );
          })
        );
      }
    }

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const reactionType = getRandomReactionType() as ReactionType;
      if (oUPostMedias) {
        return Promise.all(
          oUPostMedias.map((media) => {
            return Promise.all(
              media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
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
                                            update: {
                                              where: {
                                                id: co.id,
                                              },
                                              data: {
                                                replies: {
                                                  update: {
                                                    where: {
                                                      id: rep.id,
                                                    },
                                                    data: {
                                                      replies: {
                                                        update: {
                                                          where: {
                                                            id: _rep.id,
                                                          },
                                                          data: {
                                                            reactions: {
                                                              create: {
                                                                reactionType:
                                                                  reactionType,
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
                  })
                );
              })
            );
          })
        );
      }
    }
  });
  return Promise.all(UPDATE);
};

export const _add_media_replyreplies_and_reactions = async () => {
  const feeds = await prisma.feed.findMany({
    include: {
      userPost: {
        include: {
          oUserPost: {
            select: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
        include: {
          oPagePost: {
            include: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
        include: {
          oGroupPost: {
            include: {
              medias: {
                select: {
                  id: true,
                  comments: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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
  const UPDATE = feeds.map(async (feed) => {
    const oUPostMedias = feed.userPost?.oUserPost?.medias;
    const oPPostMedias = feed.pagePost?.oPagePost?.medias;
    const oGPostMedias = feed.groupPost?.oGroupPost?.medias;

    if (feed.userPost && feed.userPost.oUserPost) {
      const user = await getRandomUser();
      const replyReply = getRandomCommentReplReply();
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyPostOption = getRandomPostContentOption();
      if (oUPostMedias) {
        return Promise.all(
          oUPostMedias.map((media) => {
            media.comments.map((co) => {
              co.replies.map((rep) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: rep.id,
                                            },
                                            data: {
                                              reactions: {
                                                create: {
                                                  reactionType:
                                                    replyReactionType,
                                                  user: {
                                                    connect: {
                                                      id: user.id,
                                                    },
                                                  },
                                                },
                                              },
                                              replies: {
                                                create: {
                                                  content:
                                                    replyReplyPostOption ===
                                                      "contentonly" ||
                                                    replyReplyPostOption ===
                                                      "both"
                                                      ? replyReply
                                                      : null,
                                                  mediaUrl:
                                                    replyReplyPostOption ===
                                                    "both"
                                                      ? generatePhoto()
                                                      : null,
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
                        },
                      },
                    },
                  },
                });
              });
            });
          })
        );
      }
    }

    if (feed.pagePost && feed.pagePost.oPagePost) {
      const user = await getRandomUser();
      const replyReply = getRandomCommentReplReply();
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyPostOption = getRandomPostContentOption();
      if (oPPostMedias) {
        return Promise.all(
          oPPostMedias.map((media) => {
            media.comments.map((co) => {
              co.replies.map((rep) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: rep.id,
                                            },
                                            data: {
                                              reactions: {
                                                create: {
                                                  reactionType:
                                                    replyReactionType,
                                                  user: {
                                                    connect: {
                                                      id: user.id,
                                                    },
                                                  },
                                                },
                                              },
                                              replies: {
                                                create: {
                                                  content:
                                                    replyReplyPostOption ===
                                                      "contentonly" ||
                                                    replyReplyPostOption ===
                                                      "both"
                                                      ? replyReply
                                                      : null,
                                                  mediaUrl:
                                                    replyReplyPostOption ===
                                                    "both"
                                                      ? generatePhoto()
                                                      : null,
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
                        },
                      },
                    },
                  },
                });
              });
            });
          })
        );
      }
    }

    if (feed.groupPost && feed.groupPost.oGroupPost) {
      const user = await getRandomUser();
      const replyReply = getRandomCommentReplReply();
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyPostOption = getRandomPostContentOption();
      if (oGPostMedias) {
        return Promise.all(
          oGPostMedias.map((media) => {
            media.comments.map((co) => {
              co.replies.map((rep) => {
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
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: rep.id,
                                            },
                                            data: {
                                              reactions: {
                                                create: {
                                                  reactionType:
                                                    replyReactionType,
                                                  user: {
                                                    connect: {
                                                      id: user.id,
                                                    },
                                                  },
                                                },
                                              },
                                              replies: {
                                                create: {
                                                  content:
                                                    replyReplyPostOption ===
                                                      "contentonly" ||
                                                    replyReplyPostOption ===
                                                      "both"
                                                      ? replyReply
                                                      : null,
                                                  mediaUrl:
                                                    replyReplyPostOption ===
                                                    "both"
                                                      ? generatePhoto()
                                                      : null,
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
                        },
                      },
                    },
                  },
                });
              });
            });
          })
        );
      }
    }
  });
  return Promise.all(UPDATE);
};

export const _make_all_post_abit_dynamic = async (
  forWhat: "post" | "comment" | "reply" | "replyreply"
) => {
  const rPostType = getRandomPostType();

  if (rPostType === "user") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oUserPost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.oUserPost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.oUserPost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.oUserPost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }

  if (rPostType === "usershare") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("usershare");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.userSharePost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.userSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.userSharePost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.userSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.userSharePost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.userSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.userSharePost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }
  if (rPostType === "page") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("page");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oPagePost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.oPagePost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.oPagePost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.oPagePost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }
  if (rPostType === "pageshare") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("pageshare");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.pageSharePost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.pageSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.pageSharePost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.pageSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.pageSharePost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.pageSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.pageSharePost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }
  if (rPostType === "group") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("group");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oGroupPost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.oGroupPost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.oGroupPost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.oGroupPost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }
  if (rPostType === "groupshare") {
    if (forWhat === "post") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("groupshare");
      const comment = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.toGroupSharePost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          comments: {
            create: {
              content:
                commentPostOption === "contentonly" ||
                commentPostOption === "both"
                  ? comment
                  : null,
              mediaUrl: commentPostOption === "both" ? generatePhoto() : null,

              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
          reactions: {
            create: {
              reactionType: reactionType,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.toGroupSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          comments: {
            select: {
              id: true,
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return prisma.toGroupSharePost.update({
            where: {
              id: rPost!.id,
            },
            data: {
              comments: {
                update: {
                  where: {
                    id: co.id,
                  },
                  data: {
                    reactions: {
                      create: {
                        reactionType: reactionType,
                        user: {
                          connect: {
                            id: user.id,
                          },
                        },
                      },
                    },
                    replies: {
                      create: {
                        content:
                          replyPostOption === "contentonly" ||
                          replyPostOption === "both"
                            ? reply
                            : null,
                        mediaUrl:
                          replyPostOption === "both" ? generatePhoto() : null,

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
          });
        })
      );
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");
      const reply = getRandomPostComment();

      const reactionType = getRandomReactionType() as ReactionType;

      const replyPostOption = getRandomPostContentOption();

      const post = await prisma.toGroupSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return prisma.toGroupSharePost.update({
                where: {
                  id: post?.id,
                },
                data: {
                  comments: {
                    update: {
                      where: {
                        id: co.id,
                      },
                      data: {
                        replies: {
                          update: {
                            where: {
                              id: rep.id,
                            },
                            data: {
                              reactions: {
                                create: {
                                  reactionType: reactionType,
                                  user: {
                                    connect: {
                                      id: user.id,
                                    },
                                  },
                                },
                              },
                              replies: {
                                create: {
                                  content:
                                    replyPostOption === "contentonly" ||
                                    replyPostOption === "both"
                                      ? reply
                                      : null,
                                  mediaUrl:
                                    replyPostOption === "both"
                                      ? generatePhoto()
                                      : null,

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
            })
          );
        })
      );
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rPost = await getRandomPost("user");

      const reactionType = getRandomReactionType() as ReactionType;

      const post = await prisma.toGroupSharePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          comments: {
            select: {
              id: true,
              replies: {
                select: {
                  id: true,
                  replies: {
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

      return Promise.all(
        post!.comments.map((co) => {
          return Promise.all(
            co.replies.map((rep) => {
              return Promise.all(
                rep.replies.map((_rep) => {
                  return prisma.toGroupSharePost.update({
                    where: {
                      id: post?.id,
                    },
                    data: {
                      comments: {
                        update: {
                          where: {
                            id: co.id,
                          },
                          data: {
                            replies: {
                              update: {
                                where: {
                                  id: rep.id,
                                },
                                data: {
                                  replies: {
                                    update: {
                                      where: {
                                        id: _rep.id,
                                      },
                                      data: {
                                        reactions: {
                                          create: {
                                            reactionType: reactionType,
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
            })
          );
        })
      );
    }
  }
};

export const _make_all_medias_dynamic = async (
  forWhat: "media" | "comment" | "reply" | "replyreply"
) => {
  const rPostType = getRandomPostForMediaType();

  if (rPostType === "user") {
    if (forWhat === "media") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oUserPost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          medias: {
            update: {
              where: {
                id: rMedia?.id,
              },
              data: {
                comments: {
                  create: {
                    content:
                      commentPostOption === "contentonly" ||
                      commentPostOption === "both"
                        ? comment
                        : null,
                    mediaUrl:
                      commentPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                  },
                },
                reactions: {
                  create: {
                    reactionType: reactionType,
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
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return prisma.oUserPost.update({
                  where: {
                    id: rMedia?.id,
                  },
                  data: {
                    medias: {
                      update: {
                        where: {
                          id: _media.id,
                        },
                        data: {
                          comments: {
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                reactions: {
                                  create: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: user.id,
                                      },
                                    },
                                  },
                                },
                                replies: {
                                  create: {
                                    content:
                                      replyPostOption === "contentonly" ||
                                      replyPostOption === "both"
                                        ? reply
                                        : null,
                                    mediaUrl:
                                      replyPostOption === "both"
                                        ? generatePhoto()
                                        : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReplReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return prisma.oUserPost.update({
                      where: {
                        id: media.id,
                      },
                      data: {
                        medias: {
                          update: {
                            where: {
                              id: rMedia?.id,
                            },
                            data: {
                              comments: {
                                update: {
                                  where: {
                                    id: co.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
                                              user: {
                                                connect: {
                                                  id: user.id,
                                                },
                                              },
                                            },
                                          },
                                          replies: {
                                            create: {
                                              content:
                                                replyPostOption ===
                                                  "contentonly" ||
                                                replyPostOption === "both"
                                                  ? reply
                                                  : null,
                                              mediaUrl:
                                                replyPostOption === "both"
                                                  ? generatePhoto()
                                                  : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const media = await prisma.oUserPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
                        return prisma.oUserPost.update({
                          where: {
                            id: media.id,
                          },
                          data: {
                            medias: {
                              update: {
                                where: {
                                  id: rMedia?.id,
                                },
                                data: {
                                  comments: {
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: _rep.id,
                                            },
                                            data: {
                                              replies: {
                                                update: {
                                                  where: {
                                                    id: _rep.id,
                                                  },
                                                  data: {
                                                    reactions: {
                                                      create: {
                                                        reactionType:
                                                          reactionType,
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
                              },
                            },
                          },
                        });
                      })
                    );
                  })
                );
              })
            );
          })!
        );
      }
    }
  }
  if (rPostType === "page") {
    if (forWhat === "media") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("page");
      const rPost = await getRandomPost("page");
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oPagePost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          medias: {
            update: {
              where: {
                id: rMedia?.id,
              },
              data: {
                comments: {
                  create: {
                    content:
                      commentPostOption === "contentonly" ||
                      commentPostOption === "both"
                        ? comment
                        : null,
                    mediaUrl:
                      commentPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                  },
                },
                reactions: {
                  create: {
                    reactionType: reactionType,
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
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return prisma.oPagePost.update({
                  where: {
                    id: rMedia?.id,
                  },
                  data: {
                    medias: {
                      update: {
                        where: {
                          id: _media.id,
                        },
                        data: {
                          comments: {
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                reactions: {
                                  create: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: user.id,
                                      },
                                    },
                                  },
                                },
                                replies: {
                                  create: {
                                    content:
                                      replyPostOption === "contentonly" ||
                                      replyPostOption === "both"
                                        ? reply
                                        : null,
                                    mediaUrl:
                                      replyPostOption === "both"
                                        ? generatePhoto()
                                        : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReplReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return prisma.oPagePost.update({
                      where: {
                        id: media.id,
                      },
                      data: {
                        medias: {
                          update: {
                            where: {
                              id: rMedia?.id,
                            },
                            data: {
                              comments: {
                                update: {
                                  where: {
                                    id: co.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
                                              user: {
                                                connect: {
                                                  id: user.id,
                                                },
                                              },
                                            },
                                          },
                                          replies: {
                                            create: {
                                              content:
                                                replyPostOption ===
                                                  "contentonly" ||
                                                replyPostOption === "both"
                                                  ? reply
                                                  : null,
                                              mediaUrl:
                                                replyPostOption === "both"
                                                  ? generatePhoto()
                                                  : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const media = await prisma.oPagePost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
                        return prisma.oUserPost.update({
                          where: {
                            id: media.id,
                          },
                          data: {
                            medias: {
                              update: {
                                where: {
                                  id: rMedia?.id,
                                },
                                data: {
                                  comments: {
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: _rep.id,
                                            },
                                            data: {
                                              replies: {
                                                update: {
                                                  where: {
                                                    id: _rep.id,
                                                  },
                                                  data: {
                                                    reactions: {
                                                      create: {
                                                        reactionType:
                                                          reactionType,
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
                              },
                            },
                          },
                        });
                      })
                    );
                  })
                );
              })
            );
          })!
        );
      }
    }
  }
  if (rPostType === "user") {
    if (forWhat === "media") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("group");
      const rPost = await getRandomPost("group");
      const comment = getRandomPostComment();
      const reactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();

      return prisma.oGroupPost.update({
        where: {
          id: rPost!.id,
        },
        data: {
          medias: {
            update: {
              where: {
                id: rMedia?.id,
              },
              data: {
                comments: {
                  create: {
                    content:
                      commentPostOption === "contentonly" ||
                      commentPostOption === "both"
                        ? comment
                        : null,
                    mediaUrl:
                      commentPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                  },
                },
                reactions: {
                  create: {
                    reactionType: reactionType,
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
      });
    }

    if (forWhat === "comment") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return prisma.oGroupPost.update({
                  where: {
                    id: rMedia?.id,
                  },
                  data: {
                    medias: {
                      update: {
                        where: {
                          id: _media.id,
                        },
                        data: {
                          comments: {
                            update: {
                              where: {
                                id: co.id,
                              },
                              data: {
                                reactions: {
                                  create: {
                                    reactionType: reactionType,
                                    user: {
                                      connect: {
                                        id: user.id,
                                      },
                                    },
                                  },
                                },
                                replies: {
                                  create: {
                                    content:
                                      replyPostOption === "contentonly" ||
                                      replyPostOption === "both"
                                        ? reply
                                        : null,
                                    mediaUrl:
                                      replyPostOption === "both"
                                        ? generatePhoto()
                                        : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "reply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const reply = getRandomCommentReplReply();
      const replyPostOption = getRandomPostContentOption();
      const media = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return prisma.oGroupPost.update({
                      where: {
                        id: media.id,
                      },
                      data: {
                        medias: {
                          update: {
                            where: {
                              id: rMedia?.id,
                            },
                            data: {
                              comments: {
                                update: {
                                  where: {
                                    id: co.id,
                                  },
                                  data: {
                                    replies: {
                                      update: {
                                        where: {
                                          id: rep.id,
                                        },
                                        data: {
                                          reactions: {
                                            create: {
                                              reactionType: reactionType,
                                              user: {
                                                connect: {
                                                  id: user.id,
                                                },
                                              },
                                            },
                                          },
                                          replies: {
                                            create: {
                                              content:
                                                replyPostOption ===
                                                  "contentonly" ||
                                                replyPostOption === "both"
                                                  ? reply
                                                  : null,
                                              mediaUrl:
                                                replyPostOption === "both"
                                                  ? generatePhoto()
                                                  : null,

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
              })
            );
          })!
        );
      }
    }

    if (forWhat === "replyreply") {
      const user = await getRandomUser();
      const rMedia = await getRandomMedia("user");
      const rPost = await getRandomPost("user");
      const reactionType = getRandomReactionType() as ReactionType;
      const media = await prisma.oGroupPost.findUnique({
        where: {
          id: rPost!.id,
        },
        select: {
          id: true,
          medias: {
            select: {
              id: true,
              comments: {
                select: {
                  id: true,
                  replies: {
                    select: {
                      id: true,
                      replies: {
                        select: {
                          id: true,
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

      if (media && media.medias) {
        return Promise.all(
          media.medias.map((_media) => {
            return Promise.all(
              _media.comments.map((co) => {
                return Promise.all(
                  co.replies.map((rep) => {
                    return Promise.all(
                      rep.replies.map((_rep) => {
                        return prisma.oGroupPost.update({
                          where: {
                            id: media.id,
                          },
                          data: {
                            medias: {
                              update: {
                                where: {
                                  id: rMedia?.id,
                                },
                                data: {
                                  comments: {
                                    update: {
                                      where: {
                                        id: co.id,
                                      },
                                      data: {
                                        replies: {
                                          update: {
                                            where: {
                                              id: _rep.id,
                                            },
                                            data: {
                                              replies: {
                                                update: {
                                                  where: {
                                                    id: _rep.id,
                                                  },
                                                  data: {
                                                    reactions: {
                                                      create: {
                                                        reactionType:
                                                          reactionType,
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
                              },
                            },
                          },
                        });
                      })
                    );
                  })
                );
              })
            );
          })!
        );
      }
    }
  }
};
