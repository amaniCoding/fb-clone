import {
  rawO_P_PageType,
  rawO_U_GroupType,
} from "@/app/apis/feeder/[page]/lib";
import Content from "./content";
import Medias from "./medias";
import Header from "./header";

type propTypes = {
  post: rawO_U_GroupType;
};
export default function OGroupPost({ post }: propTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        name={post?.group?.name}
        profilePicture={post?.group.profilePicture}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
    </div>
  );
}
