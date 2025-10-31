import { MediaType } from "../handler";
import { mediaPreparer } from "./libs/media";

export const prepareMedia = async (medias: MediaType[] | undefined) => {
  return (
    medias &&
    medias.map(async (media: MediaType) => {
      return {
        ...media,
        reactions: mediaPreparer.prepareReactions(media!.reactions),
        gReactions: await mediaPreparer.prepareGReactions(media!.id),
        comments: mediaPreparer.prepareComments(media!.comments),
      };
    })
  );
};
