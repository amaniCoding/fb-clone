"use client";
import Image from "next/image";
import { LoggedInUser } from "./types";
export default function AddComment({
  loggedInUser,
}: {
  loggedInUser: LoggedInUser | undefined;
}) {
  return (
    <div className="sticky rounded-b-xl flex bg-white space-x-2 bottom-0 left-0 right-0 p-2 w-full">
      {loggedInUser?.profilePicture ? (
        <Image
          alt="Amanuel Ferede"
          src={loggedInUser?.profilePicture}
          width={0}
          height={0}
          sizes="100vh"
          className="w-8 h-8 object-cover rounded-full block flex-none"
        />
      ) : null}

      <input
        onChange={() => {}}
        onKeyDown={() => {}}
        value={""}
        type="text"
        className="p-3 block grow focus:outline-none bg-slate-50 rounded-xl"
        placeholder="Write a comment ..."
      ></input>
    </div>
  );
}
