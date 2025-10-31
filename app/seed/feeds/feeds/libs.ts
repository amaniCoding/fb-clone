import {
  Group,
  Media,
  MediaType,
  Page,
  ShareType,
  User,
} from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";
import { randomTexts } from "../../dummy";

const userPostOption = ["contentonly", "mediasonly", "both"];
const postTypes = ["user", "page", "group", "ushare", "pshare", "gshare"];

const originalPostType = ["user", "page", "group"];
type OriginalPostType = "user" | "page" | "group";
const toGroupSharer = ["user", "page"];
type ToGroupSharer = "user" | "page";

const shareWhat = ["user", "group", "page", "media"];
const contentType = ["content", "nocontent"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
type PostType = "user" | "page" | "group" | "ushare" | "pshare" | "gshare";

type ContentType = "content" | "nocontent";

async function getRandoms() {
  const _users = prisma.user.findMany({});
  const _pages = prisma.page.findMany({});
  const _groups = prisma.group.findMany({});

  const _uPosts = prisma.userPost.findMany({});
  const _pPosts = prisma.pagePost.findMany({});
  const _gPosts = prisma.groupPost.findMany({});

  const _uMedias = prisma.userPost.findMany({
    where: {
      NOT: {
        medias: undefined,
      },
    },
    include: {
      medias: true,
    },
  });
  const _pMedias = prisma.pagePost.findMany({
    where: {
      NOT: {
        medias: undefined,
      },
    },
    include: {
      medias: true,
    },
  });
  const _gMedias = prisma.groupPost.findMany({
    where: {
      NOT: {
        medias: undefined,
      },
    },
    include: {
      medias: true,
    },
  });

  const [
    users,
    pages,
    groups,
    uPosts,
    pPosts,
    gPosts,
    uMedias,
    pMedias,
    gMedias,
  ] = await Promise.all([
    _users,
    _pages,
    _groups,
    _uPosts,
    _pPosts,
    _gPosts,
    _uMedias,
    _pMedias,
    _gMedias,
  ]);

  return {
    users,
    pages,
    groups,
    uPosts,
    pPosts,
    gPosts,
    uMedias,
    pMedias,
    gMedias,
  };
}

function generatePhoto(photoCount: number) {
  return Array.from({ length: photoCount }, () => {
    const randomPhoto = Math.floor(Math.random() * 15) + 1;

    return {
      url: `/users/${randomPhoto}.jpg`,
      type: "image" as MediaType,
    };
  });
}

export async function _seedFeeds() {
  const {
    users,
    pages,
    groups,
    uPosts,
    pPosts,
    gPosts,
    uMedias,
    pMedias,
    gMedias,
  } = await getRandoms();
  const feedsCreated = Array.from({ length: 50 }, () => {
    const rPostTypeIndex = Math.floor(Math.random() * 6);
    const rPostType: PostType = postTypes[rPostTypeIndex] as PostType;

    if (rPostType === "user") {
      const rPostOptionIndex = Math.floor(
        Math.random() * userPostOption.length
      );
      const rPostOption: UserPostOption = userPostOption[
        rPostOptionIndex
      ] as UserPostOption;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rcontent = randomTexts[rContentIndex];
      const rUserIndex = Math.floor(Math.random() * users.length);
      const rUser = users[rUserIndex];
      const rPhotoCount = Math.floor(Math.random() * 6) + 1;

      return prisma.feed.create({
        data: {
          postType: "user",
          userPost: {
            create: {
              user: {
                connect: { id: rUser.id },
              },

              content:
                rPostOption === "contentonly" || rPostOption === "both"
                  ? rcontent
                  : null,
              medias:
                rPostOption === "both" || rPostOption === "mediasonly"
                  ? {
                      createMany: {
                        data: generatePhoto(rPhotoCount),
                      },
                    }
                  : undefined,
            },
          },
        },
      });
    } else if (rPostType === "page") {
      const rPostOptionIndex = Math.floor(
        Math.random() * userPostOption.length
      );
      const rPostOption: UserPostOption = userPostOption[
        rPostOptionIndex
      ] as UserPostOption;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rcontent = randomTexts[rContentIndex];
      const rPageIndex = Math.floor(Math.random() * pages.length);
      const rPage = pages[rPageIndex];
      const rPhotoCount = Math.floor(Math.random() * 6) + 1;

      return prisma.feed.create({
        data: {
          postType: "page",
          pagePost: {
            create: {
              page: {
                connect: {
                  id: rPage.id,
                },
              },
              content:
                rPostOption === "contentonly" || rPostOption === "both"
                  ? rcontent
                  : null,
              medias:
                rPostOption === "both" || rPostOption === "mediasonly"
                  ? {
                      createMany: {
                        data: generatePhoto(rPhotoCount),
                      },
                    }
                  : undefined,
            },
          },
        },
      });
    } else if (rPostType === "group") {
      const rPostOptionIndex = Math.floor(
        Math.random() * userPostOption.length
      );
      const rPostOption: UserPostOption = userPostOption[
        rPostOptionIndex
      ] as UserPostOption;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rcontent = randomTexts[rContentIndex];
      const rGroupIndex = Math.floor(Math.random() * groups.length);
      const rGroup = groups[rGroupIndex];

      const rUserIndex = Math.floor(Math.random() * users.length);
      const rUser = users[rUserIndex];
      const rPhotoCount = Math.floor(Math.random() * 6) + 1;

      return prisma.feed.create({
        data: {
          postType: "group",
          groupPost: {
            create: {
              group: {
                connect: {
                  id: rGroup.id,
                },
              },
              user: {
                connect: {
                  id: rUser.id,
                },
              },
              content:
                rPostOption === "contentonly" || rPostOption === "both"
                  ? rcontent
                  : null,
              medias:
                rPostOption === "both" || rPostOption === "mediasonly"
                  ? {
                      createMany: {
                        data: generatePhoto(rPhotoCount),
                      },
                    }
                  : undefined,
            },
          },
        },
      });
    } else if (rPostType === "ushare") {
      const rShareTypeIndex = Math.floor(Math.random() * 4);

      const rShareType: ShareType = shareWhat[rShareTypeIndex] as ShareType;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rContent = randomTexts[rContentIndex];

      const rContentTypeIndex = Math.floor(Math.random() * 1);
      const rContentType: ContentType = contentType[
        rContentTypeIndex
      ] as ContentType;

      const rUserIndex = Math.floor(Math.random() * users.length);
      const rUser = users[rUserIndex];

      // shared post

      const rUSharedPostIndex = Math.floor(Math.random() * uPosts.length);
      const rPSharedPostIndex = Math.floor(Math.random() * pPosts.length);
      const rGSharedPostIndex = Math.floor(Math.random() * gPosts.length);

      const rUSharedPost = uPosts[rUSharedPostIndex];
      const rPSharedPost = uPosts[rPSharedPostIndex];
      const rGSharedPost = uPosts[rGSharedPostIndex];

      // shared media
      const rMediaFromIndex = Math.floor(Math.random() * 3);
      const rMediaFrom: OriginalPostType = originalPostType[
        rMediaFromIndex
      ] as OriginalPostType;

      const rUSharedMediaIndex = Math.floor(Math.random() * uMedias.length);
      const rPSharedMediaIndex = Math.floor(Math.random() * pMedias.length);
      const rGSharedMediaIndex = Math.floor(Math.random() * gMedias.length);

      let media: Media | undefined = undefined;

      if (rMediaFrom === "user") {
        const post = uMedias[rUSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "page") {
        const post = pMedias[rPSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "group") {
        const post = gMedias[rGSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      }

      // sharer

      return prisma.feed.create({
        data: {
          postType: "pshare",
          pageSharePost: {
            create: {
              page: {
                connect: {
                  id: rUser.id,
                },
              },

              shareWhat: rShareType,
              userPost:
                rShareType === "user"
                  ? {
                      connect: {
                        id: rUSharedPost.id,
                      },
                    }
                  : undefined,

              pagePost:
                rShareType === "page"
                  ? {
                      connect: {
                        id: rPSharedPost.id,
                      },
                    }
                  : undefined,

              groupPost:
                rShareType === "group"
                  ? {
                      connect: {
                        id: rGSharedPost.id,
                      },
                    }
                  : undefined,

              media:
                rShareType === "media" && media
                  ? {
                      connect: {
                        id: media.id,
                      },
                    }
                  : undefined,

              content: rContentType === "content" ? rContent : null,
            },
          },
        },
      });
    } else if (rPostType === "pshare") {
      const rShareTypeIndex = Math.floor(Math.random() * 4);

      const rShareType: ShareType = shareWhat[rShareTypeIndex] as ShareType;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rContent = randomTexts[rContentIndex];

      const rContentTypeIndex = Math.floor(Math.random() * 1);
      const rContentType: ContentType = contentType[
        rContentTypeIndex
      ] as ContentType;

      const rPageIndex = Math.floor(Math.random() * pages.length);
      const rPage = pages[rPageIndex];

      // shared post

      const rUSharedPostIndex = Math.floor(Math.random() * uPosts.length);
      const rPSharedPostIndex = Math.floor(Math.random() * pPosts.length);
      const rGSharedPostIndex = Math.floor(Math.random() * gPosts.length);

      const rUSharedPost = uPosts[rUSharedPostIndex];
      const rPSharedPost = uPosts[rPSharedPostIndex];
      const rGSharedPost = uPosts[rGSharedPostIndex];

      // shared media
      const rMediaFromIndex = Math.floor(Math.random() * 3);
      const rMediaFrom: OriginalPostType = originalPostType[
        rMediaFromIndex
      ] as OriginalPostType;

      const rUSharedMediaIndex = Math.floor(Math.random() * uMedias.length);
      const rPSharedMediaIndex = Math.floor(Math.random() * pMedias.length);
      const rGSharedMediaIndex = Math.floor(Math.random() * gMedias.length);

      let media: Media | undefined = undefined;

      if (rMediaFrom === "user") {
        const post = uMedias[rUSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "page") {
        const post = pMedias[rPSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "group") {
        const post = gMedias[rGSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      }

      // sharer

      return prisma.feed.create({
        data: {
          postType: "pshare",
          pageSharePost: {
            create: {
              page: {
                connect: {
                  id: rPage.id,
                },
              },

              shareWhat: rShareType,
              userPost:
                rShareType === "user"
                  ? {
                      connect: {
                        id: rUSharedPost.id,
                      },
                    }
                  : undefined,

              pagePost:
                rShareType === "page"
                  ? {
                      connect: {
                        id: rPSharedPost.id,
                      },
                    }
                  : undefined,

              groupPost:
                rShareType === "group"
                  ? {
                      connect: {
                        id: rGSharedPost.id,
                      },
                    }
                  : undefined,

              media:
                rShareType === "media" && media
                  ? {
                      connect: {
                        id: media.id,
                      },
                    }
                  : undefined,

              content: rContentType === "content" ? rContent : null,
            },
          },
        },
      });
    } else if (rPostType === "gshare") {
      const rShareTypeIndex = Math.floor(Math.random() * 4);

      const rShareType: ShareType = shareWhat[rShareTypeIndex] as ShareType;

      const rContentIndex = Math.floor(Math.random() * randomTexts.length);
      const rContent = randomTexts[rContentIndex];

      const rContentTypeIndex = Math.floor(Math.random() * 1);
      const rContentType: ContentType = contentType[
        rContentTypeIndex
      ] as ContentType;

      // to group

      const rGroupIndex = Math.floor(Math.random() * gPosts.length);
      const rGroup = gPosts[rGroupIndex];

      // shared post

      const rUSharedPostIndex = Math.floor(Math.random() * uPosts.length);
      const rPSharedPostIndex = Math.floor(Math.random() * pPosts.length);
      const rGSharedPostIndex = Math.floor(Math.random() * gPosts.length);

      const rUSharedPost = uPosts[rUSharedPostIndex];
      const rPSharedPost = uPosts[rPSharedPostIndex];
      const rGSharedPost = uPosts[rGSharedPostIndex];

      // shared media
      const rMediaFromIndex = Math.floor(Math.random() * 3);
      const rMediaFrom: OriginalPostType = originalPostType[
        rMediaFromIndex
      ] as OriginalPostType;

      const rUSharedMediaIndex = Math.floor(Math.random() * uMedias.length);
      const rPSharedMediaIndex = Math.floor(Math.random() * pMedias.length);
      const rGSharedMediaIndex = Math.floor(Math.random() * gMedias.length);

      let media: Media | undefined = undefined;

      if (rMediaFrom === "user") {
        const post = uMedias[rUSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "page") {
        const post = pMedias[rPSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      } else if (rMediaFrom === "group") {
        const post = gMedias[rGSharedMediaIndex];
        const rMediaIndex = Math.floor(Math.random() * post.medias.length);
        media = post.medias[rMediaIndex];
      }

      // sharer

      const rSharerIndex = Math.floor(Math.random() * 2);
      const rSharerType: ToGroupSharer = toGroupSharer[
        rSharerIndex
      ] as ToGroupSharer;

      let rSharer: User | Page | undefined;

      const rUser = Math.floor(Math.random() * users.length);
      const rPage = Math.floor(Math.random() * pages.length);
      if (rSharerType === "user") {
        rSharer = users[rUser];
      } else if (rSharerType === "page") {
        rSharer = pages[rPage];
      }

      return prisma.feed.create({
        data: {
          postType: "gshare",
          toGroupSharePost: {
            create: {
              user:
                rSharerType === "user" && rSharer
                  ? {
                      connect: {
                        id: rSharer.id,
                      },
                    }
                  : undefined,

              page:
                rSharerType === "page" && rSharer
                  ? {
                      connect: {
                        id: rSharer.id,
                      },
                    }
                  : undefined,

              shareWhat: rShareType,
              userPost:
                rShareType === "user"
                  ? {
                      connect: {
                        id: rUSharedPost.id,
                      },
                    }
                  : undefined,

              pagePost:
                rShareType === "page"
                  ? {
                      connect: {
                        id: rPSharedPost.id,
                      },
                    }
                  : undefined,

              groupPost:
                rShareType === "group"
                  ? {
                      connect: {
                        id: rGSharedPost.id,
                      },
                    }
                  : undefined,

              media:
                rShareType === "media" && media
                  ? {
                      connect: {
                        id: media.id,
                      },
                    }
                  : undefined,

              content: rContentType === "content" ? rContent : null,
              group: {
                connect: {
                  id: rGroup.id,
                },
              },
            },
          },
        },
      });
    }
  });
}
