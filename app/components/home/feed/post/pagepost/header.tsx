"use client";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { CgClose } from "react-icons/cg";

export default function PageHeader({
  name,
  profilePicture,
  date,
  refFrom,
}: {
  name: string | undefined;
  profilePicture: string | undefined | null;
  date: string | undefined;
  refFrom: "share" | "original" | "shared";
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 ${
        refFrom === "shared" ? "pt-0" : "pt-3"
      } ${refFrom === "shared" ? "pb-3" : "pb-0"}`}
    >
      <div className="flex items-center space-x-3">
        {profilePicture ? (
          <Image
            unoptimized
            alt="Amanuel Ferede"
            src={profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
          />
        ) : null}
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{date}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {refFrom === "original" && (
          <>
            <IoIosMore className="w-7 h-7" />
            <CgClose />
          </>
        )}

        {refFrom === "share" && (
          <>
            <IoIosMore className="w-7 h-7" />
            <CgClose />
          </>
        )}
      </div>
    </div>
  );
}
