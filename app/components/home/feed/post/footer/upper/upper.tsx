"use client";
import Image from "next/image";
import { UpperFooter } from "./types";
export default function Upper({
  commentsCount,
  reactionsCount,
  reactions,
}: UpperFooter) {
  console.log(reactions);
  const newRxn =
    reactions !== null
      ? [...reactions].sort(
          (a, b) => b._count.reactionType - a._count.reactionType
        )
      : [];
  const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
        {reactionsCount > 0 && (
          <div className="flex items-center space-x-1 fill-gray-500">
            <div className="flex items-center -space-x-1.5">
              {newRxn_x.map((rxn, index) => (
                <Image
                  key={index}
                  alt=""
                  src={`/reactions/${rxn.reactionType}.png`}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                />
              ))}
            </div>
            <p>{reactionsCount}</p>
          </div>
        )}
        <div className="flex items-center space-x-3">
          {commentsCount > 0 && (
            <div className="flex items-center space-x-1  rounded-md ">
              <span>{commentsCount}</span>
              <Image
                alt=""
                src={"/reactions/comment.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 object-cover rounded-full block flex-none opacity-60"
              />
            </div>
          )}

          {/* <div className="flex items-center space-x-1  rounded-md ">
            <span>20</span>
            <Image
              alt=""
              src={"/reactions/share.png"}
              width={0}
              height={0}
              sizes="100vh"
              className=" w-5 h-5 object-cover rounded-full block flex-none opacity-60"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
