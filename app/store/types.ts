export type postOption = "textonly" | "textwithphoto" | "showphoto";

export type SetUploadedMediasToAdd = {
  type: "add" | "delete" | "empty";
  media?: {
    type: string;
    url: string;
  };
  mediaToFilter?: string;
};
