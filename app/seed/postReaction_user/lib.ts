
import { Post_USER, ReactionType, User } from "@/app/generated/prisma";
import { reactionTypes } from "../dummy";
import prisma from "@/app/libs/prisma";

let randomUser: User;
let posts: Post_USER[];

async function getPosts(page: number) {
  const skip = (page - 1) * 5;
  const _posts = await prisma.post_USER.findMany({
    take: 5,
    skip: skip,
  });
  posts = _posts;
}

async function getRandomUser() {
  const users = await prisma.user.findMany({});
  const randomUserIndex = Math.floor(Math.random() * users.length);

  randomUser = users[randomUserIndex];
}

await getRandomUser();
await getPosts(1);

export function createReaction(post: Post_USER) {
  const addition = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: 5 + addition }, () => {
    const randomReactionTypeIndex = Math.floor(Math.random() * 7);

    const randomReactionType = reactionTypes[randomReactionTypeIndex];

    return prisma.postReactions_USER.create({
      data: {
        user: {
          connect: { id: randomUser.id },
        },

        post: {
          connect: { id: post.id },
        },
        reactionType: randomReactionType as ReactionType,
      },
    });
  });
}

export function _seedReactions() {
  return posts.map((post) => {
    return Promise.all(createReaction(post));
  });
}
