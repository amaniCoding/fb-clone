import { Post_USER, User } from "@/app/generated/prisma";
import { randomTexts } from "../dummy";
import prisma from "@/app/libs/prisma";

const userPostOption = ["contentonly", "mediasonly", "both"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
let users: User[];
let posts: Post_USER[];

async function getPosts(page: number) {
  const skip = (page - 1) * 5;
  const _posts = await prisma.post_USER.findMany({
    take: 5,
    skip: skip,
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

export function createComment(post: Post_USER) {
  const addition = Math.floor(Math.random() * 3) + 1;

  return Promise.all(
    Array.from({ length: 5 + addition }, () => {
      const randomPostOptionIndex = Math.floor(Math.random() * 3);
      const randomPostOption: UserPostOption = userPostOption[
        randomPostOptionIndex
      ] as UserPostOption;

      const randomTextIndex = Math.floor(Math.random() * 20);
      const content = randomTexts[randomTextIndex];

      const randomPhotoCount = Math.floor(Math.random() * 6) + 1;
      const randomUserIndex = Math.floor(Math.random() * users.length);

      const randomUser = users[randomUserIndex];
      return prisma.comment_USER.create({
        data: {
          user: {
            connect: { id: randomUser.id },
          },

          post: {
            connect: { id: post.id },
          },
          content: content,
          mediaUrl:
            randomPostOption === "both" || randomPostOption === "mediasonly"
              ? `/user/${randomPhotoCount}.jpg`
              : null,
        },
      });
    })
  );
}

export function _seedComments() {
  const a = posts.map((post) => {
    return createComment(post);
  });
  return a;
}
