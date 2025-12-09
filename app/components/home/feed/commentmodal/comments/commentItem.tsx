import Link from "next/link";
import Image from "next/image";
import { CommentType } from "@/app/api/comments/[refId]/lib";
export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="flex flex-row space-x-3 bg-yellow-300">
      <Link href={"/#"} className="flex-none">
        {comment!.user.Profile?.profilePicture ? (
          <Image
            unoptimized
            alt={`${comment!.user.firstName.substring(0, 2)}`}
            src={comment!.user.Profile?.profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 object-cover rounded-full"
          />
        ) : null}
      </Link>
      <div className="flex flex-col space-y-1">
        <p>
          {comment!.user.firstName} {comment!.user.lastName}
        </p>
        <div>
          {comment.content && <p>{comment.content}</p>}
          {comment.mediaUrl ? (
            <Image
              alt=""
              src={comment.mediaUrl}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-52 object-cover block flex-none"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
