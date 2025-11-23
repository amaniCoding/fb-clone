import { MediaOwnerType, MediaType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { dummyTexts, dummyComments, reactionTypes } from "../../dummy";
import OGroup_Post from "@/app/components/home/feed/post/grouppost/original/post";

const sharedPostTypes = ["user", "page", "group", "media"];

const postContentOption = ["contentonly", "mediasonly", "both"];

const feedTypes = ["user", "page", "group"];
const userPostTypes = ["original", "share"];

const postMediaTypes = ["user", "page", "group"];

const toGroupSharerTypes = ["user", "page"];
const addedContentForSharePostTypes = ["content", "nocontent"];

const getRandomNumber = (num: number, from: number) => {
  return Math.floor(Math.random() * num) + from;
};

const getRandomFeedType = () => {
  const rIndex = getRandomNumber(feedTypes.length, 0);
  return feedTypes[rIndex] as "user" | "page" | "group";
};

const getRandomPostType = () => {
  const rIndex = getRandomNumber(userPostTypes.length, 0);
  return userPostTypes[rIndex] as "original" | "share";
};

const getPostMediaType = () => {
  const rIndex = getRandomNumber(postMediaTypes.length, 0);
  return postMediaTypes[rIndex] as "user" | "page" | "group";
};

const getRandomSharedPostType = () => {
  const rIndex = getRandomNumber(3, 0);
  return sharedPostTypes[rIndex];
};

const getRandomSharer = async () => {
  const rIndex = getRandomNumber(2, 0);
  const sharer = toGroupSharerTypes[rIndex] as "user" | "page";
  return sharer;
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

const getRandomPost = async (forWhat: "user" | "page" | "group") => {
  if (forWhat === "user") {
    const userPosts = await prisma.oUserPost.findMany({
      select: {
        id: true,
      },
    });
    if (userPosts.length === 0) {
      const randomPost = getRandomPostText();
      const user = await getRandomUser();
      const newUserPost = await prisma.oUserPost.create({
        data: {
          user: {
            connect: { id: user.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias:
            getRandomPostText() === "both" ||
            getRandomPostText() === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto("user", getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      });
      return newUserPost;
    } else {
      const rIndex = getRandomNumber(userPosts.length, 0);
      return userPosts[rIndex];
    }
  }

  if (forWhat === "page") {
    const pagePosts = await prisma.oPagePost.findMany({
      select: {
        id: true,
      },
    });

    if (pagePosts.length === 0) {
      const page = await getRandomPage();
      const randomPost = getRandomPostText();

      const newPagePost = await prisma.oPagePost.create({
        data: {
          page: {
            connect: { id: page.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias:
            randomPost === "both" || randomPost === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto("page", getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      });
      return newPagePost;
    } else {
      const rIndex = getRandomNumber(pagePosts.length, 0);
      return pagePosts[rIndex];
    }
  }

  if (forWhat === "group") {
    const groupPosts = await prisma.oGroupPost.findMany({
      select: {
        id: true,
      },
    });

    if (groupPosts.length === 0) {
      const user = await getRandomUser();
      const group = await getRandomGroup();
      const randomPost = getRandomPostText();

      const newGroupPost = await prisma.oGroupPost.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          group: {
            connect: { id: group.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias:
            randomPost === "both" || randomPost === "mediasonly"
              ? {
                  createMany: {
                    data: generatePhoto("group", getRandomPhotoCount()),
                  },
                }
              : undefined,
        },
      });
      return newGroupPost;
    } else {
      const rIndex = getRandomNumber(groupPosts.length, 0);
      return groupPosts[rIndex];
    }
  }
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
    if (oUserPosts.length === 0) {
      const user = await getRandomUser();
      const randomPost = getRandomPostText();

      const newUserPostMedia = await prisma.oUserPost.create({
        data: {
          user: {
            connect: { id: user.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias: {
            createMany: {
              data: generatePhoto("user", getRandomPhotoCount()),
            },
          },
        },
        include: {
          medias: {
            select: {
              id: true,
            },
          },
        },
      });
      const rMIndex = getRandomNumber(newUserPostMedia.medias.length, 0);
      return newUserPostMedia.medias[rMIndex];
    } else {
      const rIndex = getRandomNumber(oUserPosts.length, 0);
      const post = oUserPosts[rIndex];
      const rMIndex = getRandomNumber(post.medias.length, 0);
      return post!.medias[rMIndex];
    }
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

    if (oPagePosts.length === 0) {
      const page = await getRandomPage();
      const randomPost = getRandomPostText();

      const newPostPostMedia = await prisma.oPagePost.create({
        data: {
          page: {
            connect: { id: page.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias: {
            createMany: {
              data: generatePhoto("page", getRandomPhotoCount()),
            },
          },
        },
        include: {
          medias: {
            select: {
              id: true,
            },
          },
        },
      });
      const rMIndex = getRandomNumber(newPostPostMedia.medias.length, 0);
      return newPostPostMedia.medias[rMIndex];
    } else {
      const rIndex = getRandomNumber(oPagePosts.length, 0);
      const post = oPagePosts[rIndex];
      const rMIndex = getRandomNumber(post.medias.length, 0);
      return post.medias[rMIndex];
    }
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

    if (OgroupPosts.length === 0) {
      const user = await getRandomUser();
      const group = await getRandomGroup();
      const randomPost = getRandomPostText();

      const newGroupPostMedia = await prisma.oGroupPost.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          group: {
            connect: { id: group.id },
          },

          content:
            randomPost === "contentonly" || randomPost === "both"
              ? getRandomPostText()
              : null,
          medias: {
            createMany: {
              data: generatePhoto("group", getRandomPhotoCount()),
            },
          },
        },
        include: {
          medias: {
            select: {
              id: true,
            },
          },
        },
      });
      const rMIndex = getRandomNumber(newGroupPostMedia.medias.length, 0);
      return newGroupPostMedia.medias[rMIndex];
    } else {
      const rIndex = getRandomNumber(OgroupPosts.length, 0);
      const post = OgroupPosts[rIndex];
      const rMIndex = getRandomNumber(post.medias.length, 0);
      return post.medias[rIndex];
    }
  }
};

const getRandomAddedContentForShareTypes = () => {
  const rIndex = getRandomNumber(2, 0);
  return addedContentForSharePostTypes[rIndex];
};

function generatePhoto(owner: MediaOwnerType, photoCount: number) {
  return Array.from({ length: photoCount }, () => {
    const randomPhoto = getRandomNumber(15, 1);

    return {
      url: `/users/${randomPhoto}.jpg`,
      type: "image" as MediaType,
      owner,
    };
  });
}

const getRandomPostContentOption = () => {
  const rIndex = getRandomNumber(postContentOption.length, 0);
  return postContentOption[rIndex];
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
  const postType = getRandomPostType();
  switch (postType) {
    case "original": {
      const postContentOption = getRandomPostContentOption();
      return prisma.feed.create({
        data: {
          postType: "user",
          userPost: {
            create: {
              postType: "original",
              oUserPost: {
                create: {
                  user: {
                    connect: { id: user.id },
                  },

                  content:
                    postContentOption === "contentonly" ||
                    postContentOption === "both"
                      ? getRandomPostText()
                      : null,
                  medias:
                    postContentOption === "both" ||
                    postContentOption === "mediasonly"
                      ? {
                          createMany: {
                            data: generatePhoto("user", getRandomPhotoCount()),
                          },
                        }
                      : undefined,
                },
              },
            },
          },
        },
      });
    }

    case "share": {
      const user = await getRandomUser();
      const postSharedType = getRandomSharedPostType() as
        | "user"
        | "page"
        | "group"
        | "media";

      const rPostMediaType = getPostMediaType();
      const postOrMedia =
        postSharedType === "user" ||
        postSharedType === "page" ||
        postSharedType === "group"
          ? await getRandomPost(postSharedType)
          : await getRandomMedia(rPostMediaType);
      return prisma.feed.create({
        data: {
          postType: "user",
          userPost: {
            create: {
              postType: "share",
              userSharePost: {
                create: {
                  user: {
                    connect: {
                      id: user.id,
                    },
                  },

                  shareWhat: postSharedType as
                    | "user"
                    | "page"
                    | "group"
                    | "media",
                  oUserPost:
                    postSharedType === "user" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oPagePost:
                    postSharedType === "page" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oGroupPost:
                    postSharedType === "group" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  media:
                    postSharedType === "media" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  content:
                    getRandomAddedContentForShareTypes() === "content"
                      ? getRandomPostText()
                      : null,
                },
              },
            },
          },
        },
      });
    }

    default:
      break;
  }
};

const createPagePost = async () => {
  const page = await getRandomPage();
  const postType = getRandomPostType();
  switch (postType) {
    case "original": {
      const postContentOption = getRandomPostContentOption();
      return prisma.feed.create({
        data: {
          postType: "page",
          pagePost: {
            create: {
              postType: "original",
              oPagePost: {
                create: {
                  page: {
                    connect: { id: page.id },
                  },

                  content:
                    postContentOption === "contentonly" ||
                    postContentOption === "both"
                      ? getRandomPostText()
                      : null,
                  medias:
                    postContentOption === "both" ||
                    postContentOption === "mediasonly"
                      ? {
                          createMany: {
                            data: generatePhoto("page", getRandomPhotoCount()),
                          },
                        }
                      : undefined,
                },
              },
            },
          },
        },
      });
    }

    case "share": {
      const page = await getRandomPage();
      const postSharedType = getRandomSharedPostType() as
        | "user"
        | "page"
        | "group"
        | "media";

      const rPostMediaType = getPostMediaType();
      const postOrMedia =
        postSharedType === "user" ||
        postSharedType === "page" ||
        postSharedType === "group"
          ? await getRandomPost(postSharedType)
          : await getRandomMedia(rPostMediaType);
      return prisma.feed.create({
        data: {
          postType: "page",
          pagePost: {
            create: {
              postType: "share",
              pageSharePost: {
                create: {
                  page: {
                    connect: {
                      id: page.id,
                    },
                  },

                  shareWhat: postSharedType as
                    | "user"
                    | "page"
                    | "group"
                    | "media",
                  oUserPost:
                    postSharedType === "user" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oPagePost:
                    postSharedType === "page" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oGroupPost:
                    postSharedType === "group" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  media:
                    postSharedType === "media" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  content:
                    getRandomAddedContentForShareTypes() === "content"
                      ? getRandomPostText()
                      : null,
                },
              },
            },
          },
        },
      });
    }

    default:
      break;
  }
};

const createGroupPost = async () => {
  const user = await getRandomUser();
  const group = await getRandomGroup();
  const postType = getRandomPostType();
  switch (postType) {
    case "original": {
      const postContentOption = getRandomPostContentOption();
      return prisma.feed.create({
        data: {
          postType: "group",
          groupPost: {
            create: {
              postType: "original",
              oGroupPost: {
                create: {
                  user: {
                    connect: { id: user.id },
                  },
                  group: {
                    connect: { id: group.id },
                  },

                  content:
                    postContentOption === "contentonly" ||
                    postContentOption === "both"
                      ? getRandomPostText()
                      : null,
                  medias:
                    postContentOption === "both" ||
                    postContentOption === "mediasonly"
                      ? {
                          createMany: {
                            data: generatePhoto("group", getRandomPhotoCount()),
                          },
                        }
                      : undefined,
                },
              },
            },
          },
        },
      });
    }

    case "share": {
      const sharer = await getRandomSharer();
      const user = await getRandomUser();
      const page = await getRandomPage();
      const group = await getRandomGroup();
      const postSharedType = getRandomSharedPostType() as
        | "user"
        | "page"
        | "group"
        | "media";

      const rPostMediaType = getPostMediaType();
      const postOrMedia =
        postSharedType === "user" ||
        postSharedType === "page" ||
        postSharedType === "group"
          ? await getRandomPost(postSharedType)
          : await getRandomMedia(rPostMediaType);
      return prisma.feed.create({
        data: {
          postType: "group",
          groupPost: {
            create: {
              postType: "share",
              toGroupSharedPost: {
                create: {
                  sharer: sharer,
                  user:
                    sharer === "user"
                      ? {
                          connect: {
                            id: user.id,
                          },
                        }
                      : undefined,

                  page:
                    sharer === "page"
                      ? {
                          connect: {
                            id: page.id,
                          },
                        }
                      : undefined,
                  group: {
                    connect: {
                      id: group.id,
                    },
                  },

                  shareWhat: postSharedType as
                    | "user"
                    | "page"
                    | "group"
                    | "media",
                  oUserPost:
                    postSharedType === "user" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oPagePost:
                    postSharedType === "page" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  oGroupPost:
                    postSharedType === "group" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  media:
                    postSharedType === "media" && postOrMedia
                      ? {
                          connect: {
                            id: postOrMedia.id,
                          },
                        }
                      : undefined,

                  content:
                    getRandomAddedContentForShareTypes() === "content"
                      ? getRandomPostText()
                      : null,
                },
              },
            },
          },
        },
      });
    }

    default:
      break;
  }
};

export async function _seedFeeds() {
  return await Promise.all(
    Array.from({ length: 100 }, () => {
      if (getRandomFeedType() === "user") {
        return createUserPost();
      }

      if (getRandomFeedType() === "page") {
        return createPagePost();
      }

      if (getRandomFeedType() === "group") {
        return createGroupPost();
      }
    })
  );
}
