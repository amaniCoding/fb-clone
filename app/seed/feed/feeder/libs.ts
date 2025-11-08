import { MediaType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { dummyTexts, dummyComments, reactionTypes } from "../../dummy";

const sharedPostTypes = ["user", "page", "group", "media"];
const originalPostTypes = ["user", "page", "group"];
const postContentOption = ["contentonly", "mediasonly", "both"];
export const feedTypes = [
  "user",
  "page",
  "group",
  "ushare",
  "pshare",
  "gshare",
];
const toGroupSharerTypes = ["user", "page"];
const addedContentForShareTypes = ["content", "nocontent"];

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

const getPages = async () => {
  return await prisma.page.findMany({});
};

const getGroups = async () => {
  return await prisma.group.findMany({});
};

export const getRandomUser = async () => {
  const users = await getUsers();
  const rIndex = getRandomNumber(users.length, 0);
  return users[rIndex];
};

const getRandomPage = async () => {
  const pages = await getPages();
  const rIndex = getRandomNumber(pages.length, 0);
  return pages[rIndex];
};

const getRandomGroup = async () => {
  const groups = await getGroups();
  const rIndex = getRandomNumber(groups.length, 0);
  return groups[rIndex];
};

const getRandomAddedContentForShareTypes = () => {
  const rIndex = getRandomNumber(2, 0);
  return addedContentForShareTypes[rIndex];
};

const getRandomOriginalPostType = () => {
  const rIndex = getRandomNumber(3, 0);
  return originalPostTypes[rIndex];
};

const getRandomPost = async (forWhat: "user" | "page" | "group" | "media") => {
  if (forWhat === "user") {
    const userPosts = await prisma.userPost.findMany({
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(userPosts.length, 0);
    return userPosts[rIndex];
  }

  if (forWhat === "page") {
    const pagePosts = await prisma.pagePost.findMany({
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(pagePosts.length, 0);
    return pagePosts[rIndex];
  }

  if (forWhat === "group") {
    const groupPosts = await prisma.groupPost.findMany({
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(groupPosts.length, 0);
    return groupPosts[rIndex];
  }
};

const getRandomMedia = async (forWhat: "user" | "page" | "group") => {
  switch (forWhat) {
    case "user": {
      const post = await getRandomUserPostWithMedia("user");
      const rIndex = getRandomNumber(post!.medias.length, 0);
      return post!.medias[rIndex];
    }

    case "page": {
      const post = await getRandomUserPostWithMedia("page");
      const rIndex = getRandomNumber(post!.medias.length, 0);
      return post!.medias[rIndex];
    }

    case "group": {
      const post = await getRandomUserPostWithMedia("group");
      const rIndex = getRandomNumber(post!.medias.length, 0);
      return post!.medias[rIndex];
    }

    default:
      break;
  }
};

// media

const getRandomUserPostWithMedia = async (
  forWhat: "user" | "page" | "group"
) => {
  if (forWhat === "user") {
    const userPosts = await prisma.userPost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(userPosts.length, 0);
    return userPosts[rIndex];
  }

  if (forWhat === "page") {
    const pagePosts = await prisma.pagePost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(pagePosts.length, 0);
    return pagePosts[rIndex];
  }

  if (forWhat === "group") {
    const groupPosts = await prisma.groupPost.findMany({
      where: {
        NOT: {
          medias: undefined,
        },
      },
      select: {
        id: true,
        medias: true,
      },
    });
    const rIndex = getRandomNumber(groupPosts.length, 0);
    return groupPosts[rIndex];
  }
};

//

async function getRandoms() {
  // const _uMedias = prisma.feed.findMany({
  //   where: {
  //     NOT: {
  //       medias: undefined,
  //     },
  //     postType: "user",
  //   },
  //   include: {
  //     medias: true,
  //   },
  // });
}

const getRandomSharedPostType = () => {
  const rIndex = getRandomNumber(3, 0);
  return sharedPostTypes[rIndex];
};

function generatePhoto(photoCount: number) {
  return Array.from({ length: photoCount }, () => {
    const randomPhoto = getRandomNumber(15, 1);

    return {
      url: `/users/${randomPhoto}.jpg`,
      type: "image" as MediaType,
    };
  });
}

const getRandomFeedType = ():
  | "user"
  | "page"
  | "group"
  | "ushare"
  | "pshare"
  | "gshare" => {
  const rIndex = getRandomNumber(feedTypes.length, 0);
  return feedTypes[rIndex] as
    | "user"
    | "page"
    | "group"
    | "ushare"
    | "pshare"
    | "gshare";
};

const getRandomPostContentOption = () => {
  const rIndex = getRandomNumber(postContentOption.length, 0);
  return postContentOption[rIndex];
};

const getRandomSharer = async () => {
  const rIndex = getRandomNumber(2, 0);
  const sharer = toGroupSharerTypes[rIndex] as "user" | "page";
  switch (sharer) {
    case "user":
      return {
        sharer,
        which: await getRandomUser(),
      };
    case "page":
      return {
        sharer,
        which: await getRandomPage(),
      };
    default:
      break;
  }
};

const getRandomPostText = () => {
  const rIndex = getRandomNumber(dummyTexts.length, 0);
  return dummyTexts[rIndex];
};

export const getRandomPostComment = () => {
  const rIndex = getRandomNumber(dummyComments.length, 0);
  return dummyComments[rIndex];
};

export const getRandomReactionType = () => {
  const rIndex = getRandomNumber(reactionTypes.length, 0);
  return reactionTypes[rIndex];
};

const getRandomPhotoCount = () => {
  return getRandomNumber(6, 1);
};

const createUserPost = async () => {
  const user = await getRandomUser();
  return await prisma.feed.create({
    data: {
      postType: "user",
      userPost: {
        create: {
          user: {
            connect: { id: user.id },
          },

          content:
            getRandomPostText() === "contentonly" ||
            getRandomPostText() === "both"
              ? getRandomPostText()
              : null,
          medias:
            getRandomPostText() === "both" ||
            getRandomPostText() === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto(getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      },
    },
  });
};

const createPagePost = async () => {
  const page = await getRandomPage();
  return await prisma.feed.create({
    data: {
      postType: "page",
      pagePost: {
        create: {
          page: {
            connect: {
              id: page.id,
            },
          },
          content:
            getRandomPostContentOption() === "contentonly" ||
            getRandomPostContentOption() === "both"
              ? getRandomPostText()
              : null,
          medias:
            getRandomPostContentOption() === "both" ||
            getRandomPostContentOption() === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto(getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      },
    },
  });
};

const createGroupPost = async () => {
  const user = await getRandomUser();
  const group = await getRandomGroup();
  return await prisma.feed.create({
    data: {
      postType: "group",
      groupPost: {
        create: {
          group: {
            connect: {
              id: user.id,
            },
          },
          user: {
            connect: {
              id: group.id,
            },
          },
          content:
            getRandomPostContentOption() === "contentonly" ||
            getRandomPostContentOption() === "both"
              ? getRandomPostText()
              : null,
          medias:
            getRandomPostContentOption() === "both" ||
            getRandomPostContentOption() === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto(getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      },
    },
  });
};

const createUserSharePost = async () => {
  const postSharedType = getRandomSharedPostType() as
    | "user"
    | "page"
    | "group"
    | "media";
  const post = await getRandomPost(postSharedType);
  return await prisma.feed.create({
    data: {
      postType: "ushare",
      userSharePost: {
        create: {
          user: {
            connect: {
              id: (await getRandomUser()).id,
            },
          },

          shareWhat: postSharedType as "user" | "page" | "group" | "media",
          userPost:
            postSharedType === "user" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          pagePost:
            postSharedType === "page" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          groupPost:
            postSharedType === "group" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          media:
            postSharedType === "media" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          content:
            getRandomAddedContentForShareTypes() === "content"
              ? getRandomAddedContentForShareTypes()
              : null,
        },
      },
    },
  });
};

const createPageSharePost = async () => {
  const postSharedType = getRandomSharedPostType() as
    | "user"
    | "page"
    | "group"
    | "media";
  const post = await getRandomPost(postSharedType);
  const oP = getRandomOriginalPostType();

  return await prisma.feed.create({
    data: {
      postType: "pshare",
      pageSharePost: {
        create: {
          page: {
            connect: {
              id: (await getRandomPage()).id,
            },
          },

          shareWhat: postSharedType as "user" | "page" | "group" | "media",
          userPost:
            postSharedType === "user" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          pagePost:
            postSharedType === "page" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          groupPost:
            postSharedType === "group" && post
              ? {
                  connect: {
                    id: post.id,
                  },
                }
              : undefined,

          media:
            postSharedType === "media" && post
              ? {
                  connect: {
                    id: (await getRandomMedia(oP as "user" | "page" | "group"))!
                      .id,
                  },
                }
              : undefined,

          content:
            getRandomAddedContentForShareTypes() === "content"
              ? getRandomAddedContentForShareTypes()
              : null,
        },
      },
    },
  });
};

const createGroupSharePost = async () => {
  const postSharedType = getRandomSharedPostType() as
    | "user"
    | "page"
    | "group"
    | "media";

  const sharer = await getRandomSharer();
  const post = await getRandomPost(postSharedType);
  const oP = getRandomOriginalPostType();

  return await prisma.feed.create({
    data: {
      postType: "gshare",
      toGroupSharePost: {
        create: {
          user:
            sharer?.sharer === "user" && sharer.which.id
              ? {
                  connect: {
                    id: sharer.which.id,
                  },
                }
              : undefined,

          page:
            sharer?.sharer === "page" && sharer.which.id
              ? {
                  connect: {
                    id: sharer.which.id,
                  },
                }
              : undefined,

          shareWhat: postSharedType,
          userPost:
            postSharedType === "user"
              ? {
                  connect: {
                    id: post?.id,
                  },
                }
              : undefined,

          pagePost:
            postSharedType === "page"
              ? {
                  connect: {
                    id: post?.id,
                  },
                }
              : undefined,

          groupPost:
            postSharedType === "group"
              ? {
                  connect: {
                    id: post?.id,
                  },
                }
              : undefined,

          media:
            postSharedType === "media"
              ? {
                  connect: {
                    id: (await getRandomMedia(oP as "user" | "page" | "group"))!
                      .id,
                  },
                }
              : undefined,

          content:
            getRandomAddedContentForShareTypes() === "content"
              ? getRandomAddedContentForShareTypes()
              : null,
          group: {
            connect: {
              id: (await getRandomGroup()).id,
            },
          },
        },
      },
    },
  });
};

export async function _seedFeeds() {
  const feedsCreated = Array.from({ length: 50 }, () => {
    if (getRandomFeedType() === "user") {
      return createUserPost();
    }

    if (getRandomFeedType() === "page") {
      return createPagePost();
    }

    if (getRandomFeedType() === "group") {
      return createGroupPost();
    }

    if (getRandomFeedType() === "ushare") {
      return createUserSharePost();
    }

    if (getRandomFeedType() === "pshare") {
      return createPageSharePost();
    }

    if (getRandomFeedType() === "gshare") {
      return createGroupSharePost();
    }
  });

  return await Promise.all(feedsCreated);
}
