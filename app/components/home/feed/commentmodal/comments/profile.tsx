import Link from "next/link";
import Image from "next/image";
import { CommentType } from "@/app/api/comments/[refId]/lib";
export default function Profile({ comment }: { comment: CommentType }) {
  return (
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
  );
}
