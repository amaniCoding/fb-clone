import { prisma } from "@/app/libs/prisma";
import { randomTexts } from "../dummy";
import { Post_USER, User } from "@/generated/prisma/client";

const userPostOption = ["contentonly", "mediasonly", "both"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
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

export function createComment(post: Post_USER) {
  const addition = Math.floor(Math.random() * 3) + 1;

  return Array.from({ length: 5 + addition }, () => {
    const randomPostOptionIndex = Math.floor(Math.random() * 3);
    const randomPostOption: UserPostOption = userPostOption[
      randomPostOptionIndex
    ] as UserPostOption;

    const randomTextIndex = Math.floor(Math.random() * 20);
    const content = randomTexts[randomTextIndex];

    const randomPhotoCount = Math.floor(Math.random() * 6) + 1;
    return prisma.comment_USER.create({
      data: {
        user: {
          connect: { id: randomUser.id },
        },

        post: {
          connect: { id: post.id },
        },
        content:
          randomPostOption === "both" || randomPostOption === "contentonly"
            ? content
            : null,
        mediaUrl:
          randomPostOption === "both" || randomPostOption === "mediasonly"
            ? `/user/${randomPhotoCount}.jpg`
            : null,
      },
    });
  });
}

export function _seedComments() {
  return posts.map((post) => {
    return Promise.all(createComment(post));
  });
}
