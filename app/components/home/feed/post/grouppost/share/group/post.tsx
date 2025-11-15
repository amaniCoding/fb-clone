import { rawO_TG_GroupType } from "@/app/apis/feeder/[page]/lib";
import Header from "../header/page";
import Content from "./content";
import Medias from "./medias";

type PropTypes = {
  post: rawO_TG_GroupType;
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
