import { rawO_P_GroupType } from "@/app/apis/feeder/[page]/lib";
import Content from "./content";
import Medias from "./medias";
import Header from "./header";

type PropTypes = {
  post: rawO_P_GroupType;
};
export default function OGroupPost({ post }: PropTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        name={post?.group.name}
        profilePicture={post?.group.profilePicture}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
    </div>
  );
}
