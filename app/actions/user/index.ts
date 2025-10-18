"use server";
import UploadedMedias from "@/app/components/home/feed/addpost/uploadedmedias";
import { MediaType } from "@/app/generated/prisma";
import { auth } from "@/app/libs/auth/auth";
import prisma from "@/app/libs/prisma";
import { put, PutBlobResult, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
export type State = {
  success: boolean;
  message: string;
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
  if (UploadedMedias.length > 0) {
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
    });

    if (!post) {
      await del(urls!);
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
    await postToFeed(content, session.user.id, medias);

    revalidatePath("/");
    return {
      success: true,
      message: "Success !Temporary ",
    };
  } catch (error) {
    console.log("Error", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
