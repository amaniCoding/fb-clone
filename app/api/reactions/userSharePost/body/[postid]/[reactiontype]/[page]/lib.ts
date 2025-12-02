import { ReactionType } from "@/app/generated/prisma";
import prisma from "@/app/libs/prisma";

export const getReactors = async (
  postId: string,
  reactionType: ReactionType,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.userSharePost.findUnique({
    where: {
      id: postId,
    },
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
  });

  const post = prisma.userSharePost.findUnique({
    where: {
      id: postId,
    },

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
  });

  const [_count, _post] = await Promise.all([count, post]);
  // result can be undefined

  return {
    result: _post?.reactions,
    count: _count?._count.reactions,
  };
};

const result = await getReactors("Postid", "angry", 1, 7);
const reactors = result.result;
export type ReactorsType = typeof reactors;
