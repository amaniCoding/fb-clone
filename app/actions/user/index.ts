"use server";
import { PostsUser } from "@/app/components/home/feed/types";
import { MediaType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { put, PutBlobResult, del } from "@vercel/blob";
export type State = {
  success: boolean;
  message: string;
  feed: PostsUser | undefined;
};

const upLoadMedias = async (medias: File[]) => {
  if (medias && medias.length > 0) {
    try {
      return await Promise.all(
        medias.map((media) => {
          const name = media.name;
          const file = media;
          return put(name, file, {
            access: "public",
            addRandomSuffix: true,
          });
        })
      );
    } catch {}
  }
};

const createMediaUrls = (urls: PutBlobResult[] | undefined) => {
  return urls?.map((url) => {
    const regex = /^image\//;
    return {
      type: regex.test(url.contentType) ? "image" : ("video" as MediaType),
      url: url.url,
    };
  });
};

const postToFeed = async (
  content: string,
  id: string | undefined,
  medias: File[]
) => {
  const uploadedMedias = await upLoadMedias(medias);
  if (uploadedMedias!.length > 0) {
    const urls = uploadedMedias?.map((obj) => {
      return obj.url;
    });
    const post = await prisma.post_USER.create({
      data: {
        content: content,
        medias: {
          create: createMediaUrls(uploadedMedias),
        },
        user: {
          connect: {
            id: id,
          },
        },
      },
      include: {
        medias: true,
        user: true,
      },
    });

    if (!post) {
      await del(urls!);
    } else {
      return post;
    }
  }
};

export async function createPost(prevState: State, formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Un aauthorized request");
  }
  const medias: File[] = formData.getAll("photos") as File[];
  const content = formData.get("post") as string;
  console.log(medias);

  try {
    const feed = await postToFeed(content, session.user.id, medias);

    return {
      success: true,
      message: "Success !Temporary ",
      feed: feed,
    };
  } catch (error) {
    console.log("Error", error);
    return {
      feed: undefined,
      success: false,
      message: "Something went wrong",
    };
  }
}
