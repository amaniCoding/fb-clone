import {
  Group,
  Media,
  MediaType,
  Page,
  ShareType,
  User,
} from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { dummyTexts } from "../../dummy";
import { number } from "zod";

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

const getRandomUser = async () => {
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

const getRandomSharedPost = async (
  randomSharedPostType: "user" | "page" | "group" | "media"
) => {
  switch (randomSharedPostType) {
    case "user":
      return await getRandomUserPost();
      break;
    case "page":
      return await getRandomPagePost();
      break;
    case "group":
      return await getRandomGroupPost();
      break;

    case "media":
      return await getRandomMedia(
        getRandomSharedPostType() as "user" | "page" | "group" | "media"
      );
      break;
    default:
      break;
  }
};

const getRandomMedia = async (
  randomSharedPostType: "user" | "page" | "group" | "media"
) => {
  switch (randomSharedPostType) {
    case "user": {
      const post = await getRandomUserPostMedia();
      const rIndex = getRandomNumber(post.medias.length, 0);
      return post.medias[rIndex];
      break;
    }

    case "page": {
      const post = await getRandomPagePostMedia();
      const rIndex = getRandomNumber(post.medias.length, 0);
      return post.medias[rIndex];
      break;
    }

    case "group": {
      const post = await getRandomGroupPostMedia();
      const rIndex = getRandomNumber(post.medias.length, 0);
      return post.medias[rIndex];
      break;
    }

    default:
      break;
  }
};

// media

const getRandomUserPostMedia = async () => {
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
};

const getRandomPagePostMedia = async () => {
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
};

const getRandomGroupPostMedia = async () => {
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
};
//

const getRandomUserPost = async () => {
  const userPosts = await prisma.userPost.findMany({
    select: {
      id: true,
      medias: true,
    },
  });
  const rIndex = getRandomNumber(userPosts.length, 0);
  return userPosts[rIndex];
};

const getRandomPagePost = async () => {
  const pagePosts = await prisma.pagePost.findMany({
    select: {
      id: true,
      medias: true,
    },
  });
  const rIndex = getRandomNumber(pagePosts.length, 0);
  return pagePosts[rIndex];
};

const getRandomGroupPost = async () => {
  const groupPosts = await prisma.groupPost.findMany({
    select: {
      id: true,
      medias: true,
    },
  });
  const rIndex = getRandomNumber(groupPosts.length, 0);
  return groupPosts[rIndex];
};

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
      return await getRandomUser();
      break;
    case "page":
      return await getRandomPage();
    default:
      break;
  }
};

const getRandomPostText = () => {
  const rIndex = getRandomNumber(dummyTexts.length, 0);
  return dummyTexts[rIndex];
};

const getRandomPhotoCount = () => {
  return getRandomNumber(6, 1);
};

const createUserPost = async () => {
  const user = await getRandomUser();
  return prisma.feed.create({
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
  return prisma.feed.create({
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
  return prisma.feed.create({
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
  const post = await getRandomSharedPost(postSharedType);
  return prisma.feed.create({
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
  const post = await getRandomSharedPost(postSharedType);
  return prisma.feed.create({
    data: {
      postType: "pshare",
      pageSharePost: {
        create: {
          page: {
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

const createGroupSharePost = async () => {
  const postSharedType = getRandomSharedPostType() as
    | "user"
    | "page"
    | "group"
    | "media";
  const post = await getRandomSharedPost(postSharedType);
  return prisma.feed.create({
    data: {
      postType: "gshare",
      toGroupSharePost: {
        create: {
          user:
            postSharedType === "user" && (await getRandomSharer())!.id
              ? {
                  connect: {
                    id: (await getRandomSharer())!.id,
                  },
                }
              : undefined,

          page:
            postSharedType === "page" && (await getRandomSharer())!.id
              ? {
                  connect: {
                    id: (await getRandomSharer())!.id,
                  },
                }
              : undefined,

          shareWhat: postSharedType,
          userPost:
            postSharedType === "user"
              ? {
                  connect: {
                    id: (await getRandomSharedPost(postSharedType))!.id,
                  },
                }
              : undefined,

          pagePost:
            postSharedType === "page"
              ? {
                  connect: {
                    id: (await getRandomSharedPost(postSharedType))!.id,
                  },
                }
              : undefined,

          groupPost:
            postSharedType === "group"
              ? {
                  connect: {
                    id: (await getRandomSharedPost(postSharedType))!.id,
                  },
                }
              : undefined,

          media:
            postSharedType === "media"
              ? {
                  connect: {
                    id: (await getRandomSharedPost(postSharedType))!.id,
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
  const feedsCreated = Array.from({ length: 50 }, async () => {
    if (getRandomFeedType() === "user") {
      createUserPost();
    } else if (getRandomFeedType() === "page") {
      createPagePost();
    } else if (getRandomFeedType() === "group") {
      createGroupPost();
    } else if (getRandomFeedType() === "ushare") {
      createUserSharePost();
    } else if (getRandomFeedType() === "pshare") {
      createPageSharePost();
    } else if (getRandomFeedType() === "gshare") {
    }
  });
}
