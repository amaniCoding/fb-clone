"use client";
import Image from "next/image";
export default function UpperLikeShareComment() {
  return (
    <div className="px-3">
      <div className="flex items-center justify-between pb-2">
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
          <p className="text-gray-500">12k</p>
        </div>

        <div className="flex items-center space-x-3">
          <p className="text-gray-500">6.7k comments</p>

          <p className="text-gray-500">1k shares</p>
        </div>
      </div>
    </div>
  );
}
