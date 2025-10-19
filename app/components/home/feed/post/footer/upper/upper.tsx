"use client";
import Image from "next/image";
import { UpperFooter } from "./types";
export default function Upper({
  commentsCount,
  reactionsCount,
  reactions,
}: UpperFooter) {
  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
        <div className="flex items-center space-x-1 fill-gray-500">
          <div className="flex items-center">
            <Image
              alt=""
              src={"/reactions/like.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
            />

            <Image
              alt=""
              src={"/reactions/love.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
            />
          </div>
          <p>{reactionsCount}</p>
        </div>

        <div className="flex items-center space-x-3">
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

          <div className="flex items-center space-x-1  rounded-md ">
            <span>20</span>
            <Image
              alt=""
              src={"/reactions/share.png"}
              width={0}
              height={0}
              sizes="100vh"
              className=" w-5 h-5 object-cover rounded-full block flex-none opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
