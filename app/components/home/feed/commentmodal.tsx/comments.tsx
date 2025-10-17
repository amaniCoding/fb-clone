"use client";
import Image from "next/image";
import UpperLikeShareComment from "./upper-like-comment-share";
import LikeShareComment from "../post/like-share-comment";
import Link from "next/link";
import { IoMdMore } from "react-icons/io";
export default function Comments() {
  return (
    <div className="overflow-y-auto socrollabar h-96 relative">
      <div className="flex justify-between">
        <div className="flex space-x-3 p-2">
          <Image
            unoptimized
            alt="Amanuel Ferede"
            src={"/users/9.jpg"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
          />
          <div className="flex flex-col space-y-0.5">
            <span> {"Amanuel Ferede"}</span>
            <span className="text-gray-400 text-sm">2 Hours</span>
          </div>
        </div>
        <IoMdMore className="w-8 h-8" />
      </div>

      <p className="px-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio esse
        quaerat corrupti ut asperiores neque modi enim aspernatur culpa,
        excepturi pariatur sit dolor quas adipisci quos, labore iusto autem
        dolorum.
      </p>

      <UpperLikeShareComment />
      <div className=" p-1 border-b border-t-gray-300 border-t border-b-gray-300">
        <LikeShareComment />
      </div>

      <p className="my-2"></p>

      <div className="px-6 py-2 ">
        <div className="flex flex-row mb-3 space-x-3 pb-2">
          <div className="relative group flex-none">
            <Link href={"/profile"}>
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={"/users/7.jpg"}
                width={0}
                height={0}
                sizes="100vh"
                className="w-8 h-8 object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="">
            <div className="p-3 bg-gray-100 rounded-xl ">
              <p className="font-semibold">Amanuel Ferede</p>
              <p>Text comment</p>
            </div>

            <div className="flex space-x-4 pl-3">
              <span className="text-sm"></span>
              <span className="text-sm">Like</span>
              <span className="text-sm">Reply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
