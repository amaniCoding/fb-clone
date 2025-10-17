"use client";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { CgClose } from "react-icons/cg";

export default function Header({
  firstName,
  lastName,
  date,
}: {
  firstName: string;
  lastName: string;
  date: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 pt-3">
      <div className="flex items-center space-x-3">
        <Image
          unoptimized
          alt="Amanuel Ferede"
          src={"/users/3.jpg"}
          width={0}
          height={0}
          sizes="100vh"
          className="w-8 h-8 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
        />
        <div className="flex flex-col">
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <IoIosMore className="w-7 h-7" />
        <CgClose />
      </div>
    </div>
  );
}
