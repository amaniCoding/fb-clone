import { MediaType, User } from "@/app/generated/prisma";
import { randomTexts } from "../dummy";
import prisma from "@/app/libs/prisma";

const userPostOption = ["contentonly", "mediasonly", "both"];
type UserPostOption = "contentonly" | "mediasonly" | "both";
let users: User[];

async function getRandomUser() {
  const _users = await prisma.user.findMany({});

  users = _users;
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
    const randomPostOptionIndex = Math.floor(
      Math.random() * userPostOption.length
    );
    const randomPostOption: UserPostOption = userPostOption[
      randomPostOptionIndex
    ] as UserPostOption;

    const randomTextIndex = Math.floor(Math.random() * randomTexts.length);
    const content = randomTexts[randomTextIndex];
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];
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
