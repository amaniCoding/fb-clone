"use client";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { CgClose } from "react-icons/cg";

export default function GroupHeader({
  group,
  memeber,
  refFrom,
  date,
}: {
  group:
    | {
        profilePicture: string | null;
        name: string;
      }
    | undefined;

  memeber:
    | {
        firstName: string;
        lastName: string;
        Profile: {
          profilePicture: string | null;
        } | null;
      }
    | undefined
    | null;
  date: string | undefined;
  refFrom: "share" | "original" | "shared";
}) {
  return (
    <div className="flex items-center justify-between px-3 pt-3">
      <div className="flex items-center space-x-3">
        {group?.profilePicture ? (
          <Image
            unoptimized
            alt="Amanuel Ferede"
            src={group?.profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
          />
        ) : null}
        <div className="flex flex-col">
          <p className="font-semibold">{group?.name}</p>
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
