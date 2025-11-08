"use client";
import Image from "next/image";
import { IoMdMore } from "react-icons/io";

export default function HeadLine() {
  return (
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
  );
}
