"use server";
import { ReactionType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";

export async function reactAPost(id: string, reactionType: ReactionType) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }

  try {
    const post = await prisma.oUserPost.update({
      where: {
        id: id,
      },
      data: {
        reactions: {
          create: {
            reactionType: reactionType,
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        },
      },
    });

    const gReactionsForThisPost = await prisma.reaction.groupBy({
      by: ["reactionType"],
      _count: {
        reactionType: true,
      },
      where: {
        groupPostId: post.id,
      },
    });

    return {
      success: true,
      _gReactions: gReactionsForThisPost,
      message: "Success ",
    };
  } catch (error) {
    return {
      success: true,
      _gReactions: [],
      message: "Failed ",
    };
  }
}
