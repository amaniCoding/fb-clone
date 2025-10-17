import { prisma } from "@/app/libs/prisma";
import { randomTexts } from "../dummy";
import { MediaType, User } from "@/generated/prisma/client";

const userPostOption = ["contentonly", "mediasonly", "both"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
let randomUser: User;

async function getRandomUser() {
  const users = await prisma.user.findMany({});
  const randomUserIndex = Math.floor(Math.random() * users.length);

  randomUser = users[randomUserIndex];
}

await getRandomUser();

function generatePhoto(photoCount: number) {
  return Array.from({ length: photoCount }, () => {
    const randomPhoto = Math.floor(Math.random() * 15) + 1;

    return {
      url: `/users/${randomPhoto}.jpg`,
      type: "image" as MediaType,
    };
  });
}

export function _seedPosts() {
  return Array.from({ length: 5 }, () => {
    const randomPostOptionIndex = Math.floor(Math.random() * 3);
    const randomPostOption: UserPostOption = userPostOption[
      randomPostOptionIndex
    ] as UserPostOption;

    const randomTextIndex = Math.floor(Math.random() * 20);
    const content = randomTexts[randomTextIndex];

    const randomPhotoCount = Math.floor(Math.random() * 6) + 1;
    return prisma.post_USER.create({
      data: {
        user: {
          connect: { id: randomUser.id },
        },
        content:
          randomPostOption === "contentonly" || randomPostOption === "both"
            ? content
            : null,
        medias:
          randomPostOption === "both" || randomPostOption === "mediasonly"
            ? {
                createMany: {
                  data: generatePhoto(randomPhotoCount),
                },
              }
            : undefined,
      },
    });
  });
}
