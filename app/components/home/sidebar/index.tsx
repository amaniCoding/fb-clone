"use client";
import Image from "next/image";
import { useState } from "react";
import { data } from "./data";
import { LoggedInUser } from "./types";
export default function SideBar({
  loggedInUser: { firstName, lastName, profilePicture },
}: {
  loggedInUser: LoggedInUser;
}) {
  const [showScrollBar, setShowScrollBar] = useState(false);
  return (
    <div className="xl:w-[30%] lg:[5%] lg:flex hidden pt-12 flex-col space-y-5  fixed left-0 bottom-0 top-0">
      <div
        className={`w-3/4 pt-10 pl-3 h-screen overflow-y-auto [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ${
          showScrollBar
            ? "[&::-webkit-scrollbar]:w-2"
            : "[&::-webkit-scrollbar]:w-0"
        }`}
        onMouseOver={() => setShowScrollBar(true)}
        onMouseOut={() => setShowScrollBar(false)}
      >
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <Image
            alt="Amanuel Ferede"
            src={profilePicture}
            width={0}
            height={0}
            sizes="100vh"
            className="w-10 h-10 object-cover rounded-full "
          />
          <p className="font-semibold">
            {firstName} {lastName}
          </p>
        </div>
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className={`p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full ${
                data.toFixSize ? "mb-3" : ""
              }`}
            >
              <Image
                alt="Amanuel Ferede"
                src={data.icon}
                width={0}
                height={0}
                sizes="100vh"
                className={`${data.toFixSize ? "w-7 h-7" : "w-9 h-9"}`}
              />
              <p className="" style={{ fontWeight: 559 }}>
                {data.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
