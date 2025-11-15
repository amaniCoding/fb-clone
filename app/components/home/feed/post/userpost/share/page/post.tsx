import Content from "./content";
import Medias from "./medias";
import Header from "./header";
import { rawO_U_PageType } from "@/app/apis/feeder/[page]/lib";

type propTypes = {
  post: rawO_U_PageType;
};
export default function OPagePost({ post }: propTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        name={post?.page?.name}
        profilePicture={post?.page.profilePicture}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
    </div>
  );
}
