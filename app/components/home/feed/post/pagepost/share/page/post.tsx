import { rawO_P_PageType } from "@/app/apis/feeder/[page]/lib";
import Content from "./content";
import Medias from "./medias";
import Header from "./header";

type PropTypes = {
  post: rawO_P_PageType;
};
export default function OPagePost({ post }: PropTypes) {
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
