import { rawO_TG_UserType } from "@/app/apis/feeder/[page]/lib";
import Content from "./content";
import Medias from "./medias";
import Header from "./header";

type PropTypes = {
  post: rawO_TG_UserType;
};
export default function OUserPost({ post }: PropTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <Header
        firstName={post?.user?.firstName}
        lastName={post?.user?.lastName}
        date={post?.createdAt?.toISOString()}
      />

      <Content content={post?.content} />
      <Medias medias={post?.medias} />
    </div>
  );
}
