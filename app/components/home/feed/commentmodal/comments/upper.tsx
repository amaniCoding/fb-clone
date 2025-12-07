import { CommentType } from "@/app/api/comments/[refId]/lib";
import Commentor from "./commentor";
import Content from "./content";

export default function Upper({ comment }: { comment: CommentType }) {
  return (
    <div className="bg-gray-100 p-2 rounded-xl flex flex-col">
      <Commentor
        firstName={comment!.user.firstName}
        lastName={comment!.user.lastName}
      />
      <Content content={comment!.content} mediaUrl={comment!.mediaUrl} />
    </div>
  );
}
