import { Comment_USER, ReactionType, User } from "@/app/generated/prisma";
import { reactionTypes } from "../dummy";
import prisma from "@/app/libs/prisma";

let users: User[];

function getPosts(page: number) {
  const skip = (page - 1) * 5;
  return prisma.post_USER.findMany({
    take: 5,
    skip: skip,
    select: {
      comments: {
        take: 5,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getRandomUser() {
  users = await prisma.user.findMany({});
}

await getRandomUser();

export function createReactions(comments: Comment_USER[]) {
  const a = comments.map((co) => {
    const addition = Math.floor(Math.random() * 3) + 1;

    return Promise.all(
      Array.from({ length: 5 + addition }, () => {
        const randomReactionTypeIndex = Math.floor(Math.random() * 7);

        const randomReactionType = reactionTypes[randomReactionTypeIndex];
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomUserIndex];
        return prisma.commentReactions_USER.create({
          data: {
            user: {
              connect: { id: randomUser.id },
            },

            comment: {
              connect: { id: co.id },
            },
            reactionType: randomReactionType as ReactionType,
          },
        });
      })
    );
  });
  return Promise.all(a);
}

export async function _seedCommentReactions() {
  const a = await getPosts(1);
  const b = a.map((post) => {
    return createReactions(post.comments);
  });
  return await Promise.all(b);
}
