"use client";
import Image from "next/image";

export default function ReactionBox({
  keepShowing,
  hideShowing,
}: {
  keepShowing: () => void;
  hideShowing: () => void;
}) {
  return (
    <div
      className="absolute left-0 bottom-12 z-[100] flex items-center p-1.5 bg-white shadow-lg space-x-1 rounded-4xl"
      onMouseEnter={keepShowing}
      onMouseLeave={hideShowing}
    >
      <Image
        alt=""
        src={"/reactions/like.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/love.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/care.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/haha.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/wow.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/sad.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
      <Image
        alt=""
        src={"/reactions/angry.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
      />
    </div>
  );
}
