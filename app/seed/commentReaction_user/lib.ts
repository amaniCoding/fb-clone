import {
  Audinece,
  Comment_USER,
  Post_USER,
  PostType,
  ReactionType,
  SuperAudinece,
  User,
} from "@/app/generated/prisma";
import { randomTexts, reactionTypes } from "../dummy";
import prisma from "@/app/libs/prisma";

const userPostOption = ["contentonly", "mediasonly", "both"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
let users: User[];
let posts: ({
  comments: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string | null;
    postId: string;
    mediaUrl: string | null;
  }[];
} & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  postType: PostType;
  userId: string;
  content: string | null;
  location: string | null;
  doing: string | null;
  doingWhat: string | null;
  audience: Audinece;
  sAudience: SuperAudinece | null;
})[];

async function getPosts(page: number) {
  const skip = (page - 1) * 5;
  const _posts = await prisma.post_USER.findMany({
    take: 5,
    skip: skip,
    include: {
      comments: {
        take: 5,
        skip: skip,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  posts = _posts;
}

async function getRandomUser() {
  users = await prisma.user.findMany({});
}

await getRandomUser();
await getPosts(1);

const createCommentReactions = (
  comments: {
    id: string;
    userId: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    mediaUrl: string | null;
  }[]
) => {
  return Promise.all(
    comments.map((co) => {
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
};

export function createReactions(comments: Comment_USER[], page: number) {
  const offset = (page - 1) * 5;
  const addition = Math.floor(Math.random() * 3) + 1;

  return createCommentReactions(comments);
}

export function _seedCommentReactions() {
  const a = posts.map((post) => {
    return createReactions(post.comments, 1);
  });
  return a;
}
