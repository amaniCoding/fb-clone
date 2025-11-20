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
      userPost: {
        select: {
          oUserPost: {
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
      userPost: {
        select: {
          oUserPost: {
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

  const updatedReactors = _post?.userPost?.oUserPost?.reactions.map(
    (reactor) => {
      return {
        ...reactor,
        feedId: _post.id,
        postId: _post.userPost?.oUserPost?.id,
        postType: "oUserPost",
      };
    }
  );
  return {
    result: updatedReactors,
    count: _count?.userPost?.oUserPost?._count.reactions,
  };
};

const result = await getReactors("feedId", "Postid", "angry", 1, 7);
const reactors = result.result;
export type ReactorsType = typeof reactors;
