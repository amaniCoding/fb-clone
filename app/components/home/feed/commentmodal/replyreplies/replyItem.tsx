import Link from "next/link";
import Image from "next/image";
import { ReplyType } from "@/app/api/replyreplies/[refId]/lib";
export default function ReplyItem({ reply }: { reply: ReplyType }) {
  return (
    <div className="flex flex-row space-x-3 bg-yellow-300">
      <Link href={"/#"} className="flex-none">
        {reply!.user.Profile?.profilePicture ? (
          <Image
            unoptimized
            alt={`${reply!.user.firstName.substring(0, 2)}`}
            src={reply!.user.Profile?.profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-4 h-4 object-cover rounded-full"
          />
        ) : null}
      </Link>
      <div className="flex flex-col space-y-1">
        <p>
          {reply!.user.firstName} {reply!.user.lastName}
        </p>
        <div>
          {reply.content && <p>{reply.content}</p>}
          {reply.mediaUrl ? (
            <Image
              alt=""
              src={reply.mediaUrl}
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
