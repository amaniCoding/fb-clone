import { put } from "@vercel/blob";

export async function createPost(formData: FormData) {
  const medias: File[] = formData.getAll("photos") as File[];
  formData.get("post") as string;
  const photoUrls: { url: string; type: string }[] = [];
  if (medias && medias.length > 0) {
    await Promise.all(
      medias.map(async (media) => {
        const name = media.name;
        const type = media.type;
        const file = media;

        try {
          const blob = await put(name, file, {
            access: "public",
            addRandomSuffix: true,
          });

          const photoUrl = blob.url;
          const mediaData = {
            url: photoUrl,
            type: type,
          };
          photoUrls.push(mediaData);
          return photoUrls;
        } catch {}
      })
    );
  }

  try {
  } catch (error) {
    console.error("Error while trying to upload a file\n", error);
  }
}
