import prisma from "@/app/libs/prisma";

import { ReactionType } from "@/app/generated/prisma";
import {
  dummyComments,
  dummyReplies,
  dummyReplyReplies,
  reactionTypes,
} from "../../dummy";
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
    const pagePosts = await prisma.oGroupPost.findMany({
      select: {
        id: true,
      },
    });

    const rIndex = getRandomNumber(pagePosts.length, 0);
    return pagePosts[rIndex];
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
    return post.medias[rIndex];
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

const getRandomReactionType = () => {
  const rIndex = getRandomNumber(reactionTypes.length, 0);
  return reactionTypes[rIndex];
};

function generatePhoto() {
  const randomPhoto = getRandomNumber(15, 1);

  return `/users/${randomPhoto}.jpg`;
}

const getRandomPostComment = () => {
  const rIndex = getRandomNumber(dummyComments.length, 0);
  return dummyComments[rIndex];
};

const getRandomCommentReply = () => {
  const rIndex = getRandomNumber(dummyReplies.length, 0);
  return dummyReplies[rIndex];
};

const getRandomCommentReplReply = () => {
  const rIndex = getRandomNumber(dummyReplyReplies.length, 0);
  return dummyReplyReplies[rIndex];
};

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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const postReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;
      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                        commentPostOption === "both" ? generatePhoto() : null,
                      user: {
                        connect: {
                          id: user.id,
                        },
                      },
                      reactions: {
                        create: {
                          reactionType: commentReactionType,
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
                          reactions: {
                            create: {
                              reactionType: replyReactionType,
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
                                replyReplyPostOption === "contentonly" ||
                                replyReplyPostOption === "both"
                                  ? replyReply
                                  : null,
                              mediaUrl:
                                replyReplyPostOption === "both"
                                  ? generatePhoto()
                                  : null,
                              user: {
                                connect: {
                                  id: user.id,
                                },
                              },
                              reactions: {
                                create: {
                                  reactionType: replyReplyReactionType,
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
                  reactions: {
                    create: {
                      reactionType: postReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const mediaReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                                  reactions: {
                                    create: {
                                      reactionType: commentReactionType,
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
                                      reactions: {
                                        create: {
                                          reactionType: replyReactionType,
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
                                            replyReplyPostOption === "both"
                                              ? replyReply
                                              : null,
                                          mediaUrl:
                                            replyReplyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                          reactions: {
                                            create: {
                                              reactionType:
                                                replyReplyReactionType,
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
                              reactions: {
                                create: {
                                  reactionType: mediaReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const mediaReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                                  reactions: {
                                    create: {
                                      reactionType: commentReactionType,
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
                                      reactions: {
                                        create: {
                                          reactionType: replyReactionType,
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
                                            replyReplyPostOption === "both"
                                              ? replyReply
                                              : null,
                                          mediaUrl:
                                            replyReplyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                          reactions: {
                                            create: {
                                              reactionType:
                                                replyReplyReactionType,
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
                              reactions: {
                                create: {
                                  reactionType: mediaReactionType,
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
      const reply = getRandomCommentReply();
      const replyReply = getRandomCommentReplReply();
      const mediaReactionType = getRandomReactionType() as ReactionType;
      const commentReactionType = getRandomReactionType() as ReactionType;
      const replyReactionType = getRandomReactionType() as ReactionType;
      const replyReplyReactionType = getRandomReactionType() as ReactionType;

      const commentPostOption = getRandomPostContentOption();
      const replyPostOption = getRandomPostContentOption();
      const replyReplyPostOption = getRandomPostContentOption();
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
                                  reactions: {
                                    create: {
                                      reactionType: commentReactionType,
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
                                      reactions: {
                                        create: {
                                          reactionType: replyReactionType,
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
                                            replyReplyPostOption === "both"
                                              ? replyReply
                                              : null,
                                          mediaUrl:
                                            replyReplyPostOption === "both"
                                              ? generatePhoto()
                                              : null,
                                          user: {
                                            connect: {
                                              id: user.id,
                                            },
                                          },
                                          reactions: {
                                            create: {
                                              reactionType:
                                                replyReplyReactionType,
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
                              reactions: {
                                create: {
                                  reactionType: mediaReactionType,
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

export const _make_all_posts_dynamic = async () => {
  const rPostType = getRandomPostType();

  if (rPostType === "user") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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

  if (rPostType === "usershare") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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
  if (rPostType === "page") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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
  if (rPostType === "pageshare") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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
  if (rPostType === "group") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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
  if (rPostType === "groupshare") {
    const user = await getRandomUser();
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const postReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;

    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();
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
            reactions: {
              create: {
                reactionType: commentReactionType,
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
                mediaUrl: replyPostOption === "both" ? generatePhoto() : null,

                user: {
                  connect: {
                    id: user.id,
                  },
                },

                reactions: {
                  create: {
                    reactionType: replyReactionType,
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
                      replyReplyPostOption === "contentonly" ||
                      replyReplyPostOption === "both"
                        ? replyReply
                        : null,
                    mediaUrl:
                      replyReplyPostOption === "both" ? generatePhoto() : null,

                    user: {
                      connect: {
                        id: user.id,
                      },
                    },
                    reactions: {
                      create: {
                        reactionType: replyReplyReactionType,
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
        reactions: {
          create: {
            reactionType: postReactionType,
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
};

export const _make_all_medias_dynamic = async () => {
  const rPostType = getRandomPostForMediaType();

  if (rPostType === "user") {
    const user = await getRandomUser();
    const rMedia = await getRandomMedia("user");
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const mediaReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;
    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();

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
                  reactions: {
                    create: {
                      reactionType: commentReactionType,
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
                      reactions: {
                        create: {
                          reactionType: replyReactionType,
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
                            replyReplyPostOption === "contentonly" ||
                            replyReplyPostOption === "both"
                              ? replyReply
                              : null,
                          mediaUrl:
                            replyReplyPostOption === "both"
                              ? generatePhoto()
                              : null,

                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                          reactions: {
                            create: {
                              reactionType: replyReplyReactionType,
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
              reactions: {
                create: {
                  reactionType: mediaReactionType,
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
  if (rPostType === "page") {
    const user = await getRandomUser();
    const rMedia = await getRandomMedia("user");
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const mediaReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;
    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();

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
                  reactions: {
                    create: {
                      reactionType: commentReactionType,
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
                      reactions: {
                        create: {
                          reactionType: replyReactionType,
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
                            replyReplyPostOption === "contentonly" ||
                            replyReplyPostOption === "both"
                              ? replyReply
                              : null,
                          mediaUrl:
                            replyReplyPostOption === "both"
                              ? generatePhoto()
                              : null,

                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                          reactions: {
                            create: {
                              reactionType: replyReplyReactionType,
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
              reactions: {
                create: {
                  reactionType: mediaReactionType,
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

  if (rPostType === "group") {
    const user = await getRandomUser();
    const rMedia = await getRandomMedia("user");
    const rPost = await getRandomPost("user");
    const comment = getRandomPostComment();
    const reply = getRandomCommentReply();
    const replyReply = getRandomCommentReplReply();
    const mediaReactionType = getRandomReactionType() as ReactionType;
    const commentReactionType = getRandomReactionType() as ReactionType;
    const replyReactionType = getRandomReactionType() as ReactionType;
    const replyReplyReactionType = getRandomReactionType() as ReactionType;
    const commentPostOption = getRandomPostContentOption();
    const replyPostOption = getRandomPostContentOption();
    const replyReplyPostOption = getRandomPostContentOption();

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
                  reactions: {
                    create: {
                      reactionType: commentReactionType,
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
                      reactions: {
                        create: {
                          reactionType: replyReactionType,
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
                            replyReplyPostOption === "contentonly" ||
                            replyReplyPostOption === "both"
                              ? replyReply
                              : null,
                          mediaUrl:
                            replyReplyPostOption === "both"
                              ? generatePhoto()
                              : null,

                          user: {
                            connect: {
                              id: user.id,
                            },
                          },
                          reactions: {
                            create: {
                              reactionType: replyReplyReactionType,
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
              reactions: {
                create: {
                  reactionType: mediaReactionType,
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
};
