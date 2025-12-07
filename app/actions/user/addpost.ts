"use server";

import { FeedsType } from "@/app/api/feeder/[page]/lib";
import { auth } from "@/app/auth";
import { MediaOwnerType, MediaType } from "@/app/generated/prisma/client";
import prisma from "@/app/libs/prisma";

import { put, PutBlobResult, del } from "@vercel/blob";

const isReacted = async (
  userId: string | undefined,
  type:
    | "oUserPost"
    | "userSharePost"
    | "oPagePost"
    | "pageSharePost"
    | "oGroupPost"
    | "toGroupSharedPost",
  id: string | undefined
) => {
  switch (type) {
    case "oUserPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          userPostId: id,
          userId: userId,
        },
        select: {
          userPostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.userPostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }
    case "userSharePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          userSharePostId: id,
          userId: userId,
        },
        select: {
          userSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.userSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }

    case "oPagePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          pagePostId: id,
          userId: userId,
        },
        select: {
          pagePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.pagePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }

    case "pageSharePost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          pageSharePostId: id,
          userId: userId,
        },
        select: {
          pageSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.pageSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }

    case "oGroupPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          groupPostId: id,
          userId: userId,
        },
        select: {
          groupPostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.groupPostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }

    case "toGroupSharedPost": {
      const isReactedByMe = await prisma.reaction.findFirst({
        where: {
          toGroupSharePostId: id,
          userId: userId,
        },
        select: {
          toGroupSharePostId: true,
          reactionType: true,
        },
      });

      if (isReactedByMe?.toGroupSharePostId) {
        return {
          isReacted: true,
          reactionType: isReactedByMe.reactionType,
        };
      }
      return {
        isReacted: false,
        reactionType: undefined,
      };
    }
    default:
      break;
  }
};
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
      case "oGroupPost": {
        const r = await prisma.reaction.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
          where: {
            groupPostId: id,
          },
        });

        return r.map((rxn) => {
          return {
            reactionType: rxn.reactionType,
            count: rxn._count.reactionType,
          };
        });
      }
      case "toGroupSharedPost": {
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

      default:
        break;
    }
  } catch {}
};

export type State = {
  success: boolean;
  message: string;
  feed: FeedsType | undefined;
};

const upLoadMedias = async (medias: File[]) => {
  if (medias && medias.length > 0) {
    try {
      return await Promise.all(
        medias.map((media) => {
          const name = media.name;
          const file = media;
          return put(name, file, {
            access: "public",
            addRandomSuffix: true,
          });
        })
      );
    } catch {
      throw new Error("Error in uploading medias");
    }
  }
};

const createMediaUrls = (urls: PutBlobResult[] | undefined) => {
  return urls?.map((url) => {
    const regex = /^image\//;
    return {
      type: regex.test(url.contentType) ? "image" : ("video" as MediaType),
      url: url.url,
      owner: "user" as MediaOwnerType,
    };
  });
};

const postToFeed = async (
  content: string,
  userId: string | undefined,
  medias: File[]
) => {
  const uploadedMedias = await upLoadMedias(medias);

  try {
    if (uploadedMedias!.length > 0) {
      const feed = await prisma.feed.create({
        data: {
          postType: "user",

          userPost: {
            create: {
              postType: "original",
              oUserPost: {
                create: {
                  content: content,
                  user: {
                    connect: {
                      id: userId,
                    },
                  },
                  medias: {
                    create: createMediaUrls(uploadedMedias),
                  },
                },
              },
            },
          },
        },
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
            },
          },
        },
      });

      return {
        ...feed,
        feedId: feed.id,
        userPost: {
          ...feed.userPost,
          oUserPost: {
            ...feed.userPost?.oUserPost,
            feedId: feed.id,
            postId: feed.userPost?.oUserPost?.id,
            _gReactions: await prepareGReactions(
              "oUserPost",
              feed.userPost?.oUserPost?.id
            ),
            _isReacted: await isReacted(
              userId,
              "oUserPost",
              feed.userPost?.oUserPost?.id
            ),
          },
        },
      } as FeedsType;
    }
  } catch {
    const urls = uploadedMedias?.map((obj) => {
      return obj.url;
    });
    await del(urls!);
  }
};

export async function createPost(prevState: State, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Un aauthorized request");
    }
    const medias: File[] = formData.getAll("photos") as File[];
    const content = formData.get("post") as string;
    console.log(medias);
    const feed = await postToFeed(content, session.user.id, medias);

    return {
      success: true,
      message: "Success !Temporary ",
      feed: feed,
    };
  } catch {
    return {
      feed: undefined,
      success: false,
      message: "Something went wrong",
    };
  }
}
