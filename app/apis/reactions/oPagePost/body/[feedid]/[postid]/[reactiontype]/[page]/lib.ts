import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  feedId: string,
  postId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      pagePost: {
        select: {
          oPagePost: {
            select: {
              _count: {
                select: {
                  reactions: {
                    where: {
                      reactionType: reactionType,
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

  const post = prisma.feed.findUnique({
    where: {
      id: feedId,
    },
    select: {
      id: true,
      pagePost: {
        select: {
          oPagePost: {
            select: {
              id: true,
              reactions: {
                take: rowsPerPage,
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
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);
  // result can be undefined

  const updatedReactors = _post?.pagePost?.oPagePost?.reactions.map(
    (reactor) => {
      return {
        ...reactor,
        postId: _post.pagePost?.oPagePost?.id,
        feedId: _post.id,
        postType: "oPagePost",
      };
    }
  );
  return {
    result: updatedReactors,
    count: _count?.pagePost?.oPagePost?._count.reactions,
  };
};
