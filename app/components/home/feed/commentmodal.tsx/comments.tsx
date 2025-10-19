"use client";
import Image from "next/image";
import Link from "next/link";
export default function Comments() {
  return (
    <div className="overflow-y-auto socrollabar h-96 relative">
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
