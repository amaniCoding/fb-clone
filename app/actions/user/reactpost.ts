"use server";

import { PostType, Prisma, ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export type ReactPostState = {
  status: "success" | "error";
  reactionsState:
    | (Prisma.PickEnumerable<
        Prisma.PostReactions_USERGroupByOutputType,
        "reactionType"[]
      > & {
        _count: {
          reactionType: number;
        };
      })[];
};

const reactUserPost = async (
  postId: string,
  userId: string,
  reactionType: ReactionType
) => {
  try {
    const data = await prisma.post_USER.findUnique({
      where: {
        id: postId,
      },
      select: {
        reactions: {
          select: {
            id: true,
            reactionType: true,
          },
          where: {
            userId,
          },
        },
      },
    });
    if (data?.reactions && data.reactions[0].id) {
      // already reacted
      const update = await prisma.post_USER.update({
        where: {
          id: postId,
        },
        data: {
          reactions: {
            update: {
              where: {
                id: data.reactions[0].id,
              },
              data: {
                reactionType,
              },
            },
          },
        },
      });

      if (update) {
        const grouped_reactions = await prisma.postReactions_USER.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
        });
        return grouped_reactions;
      }
    } else {
      //create it
      const create = await prisma.post_USER.update({
        where: {
          id: postId,
        },
        data: {
          reactions: {
            create: {
              user: {
                connect: {
                  id: userId,
                },
              },
              reactionType,
            },
          },
        },
      });

      if (create) {
        const grouped_reactions = await prisma.postReactions_USER.groupBy({
          by: ["reactionType"],
          _count: {
            reactionType: true,
          },
        });
        return grouped_reactions;
      }
    }
  } catch (error) {
    return;
  }
};
export const reactPost = async (
  prevState: ReactPostState,
  postType: PostType,
  postId: string,
  reactionType: ReactionType
) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (postType === "userpost") {
      const result = await reactUserPost(postId, session.user.id, reactionType);
      if (result) {
        return {
          status: "success",
        };
      }
    }
  } catch (error) {}
};
