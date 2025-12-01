"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { State } from "../../types";

export async function reactOuserPost(
  id: string,
  reactionType: ReactionType,
  prevState: State
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const isReacted = await prisma.oUserPost.findUnique({
      where: {
        id: id,
      },
      select: {
        reactions: {
          where: {
            userId: session.user.id,
          },
          select: {
            id: true,
            reactionType: true,
          },
        },
      },
    });

    if (isReacted?.reactions[0].id) {
      await prisma.oUserPost.update({
        where: {
          id: id,
        },
        data: {
          reactions: {
            update: {
              where: {
                id: isReacted.reactions[0].id,
              },
              data: {
                reactionType: reactionType,
                user: {
                  connect: {
                    id: session.user.id,
                  },
                },
              },
            },
          },
        },
      });
    } else {
      await prisma.oUserPost.update({
        where: {
          id: id,
        },
        data: {
          reactions: {
            create: {
              reactionType: reactionType!,
              user: {
                connect: {
                  id: session.user.id,
                },
              },
            },
          },
        },
      });
    }

    const gReactions = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        userPostId: id,
      },
    });

    const _gReactions = gReactions.map((rxn) => {
      return {
        reactionType: rxn.reactionType,
        count: rxn._count.reactionType,
      };
    });

    return {
      success: true,
      _gReactions: _gReactions,
      reactionType,
      message: "Success ",
    };
  } catch {
    return {
      success: false,
      _gReactions: undefined,
      reactionType: undefined,
      message: "Failed ",
    };
  }
}
