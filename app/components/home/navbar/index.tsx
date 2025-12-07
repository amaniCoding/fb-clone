"use client";

import Image from "next/image";
import Link from "next/link";

import { LoggedInUser } from "./types";
import { data } from "./data";
export default function NavBar({
  loggedInUser: { profilePicture },
}: {
  loggedInUser: LoggedInUser;
}) {
  return (
    <nav className="py-1.5 px-4 fixed top-0 left-0 right-0 z-20 bg-white w-full shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <Image
              alt="Amanuel Ferede"
              src={"/brands/fbl.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-9 h-9 object-center rounded-full "
            />
          </Link>
          <input
            className="md:block outline-none border-none bg-gray-100 hidden py-2 px-5 rounded-3xl border-2 border-gray-300"
            placeholder="Search Developers ..."
          ></input>
        </div>
        {data.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-10 py-1.5 relative rounded-lg hover:bg-gray-50"
          >
            <Image
              alt="Amanuel Ferede"
              src={data.icon}
              width={0}
              height={0}
              sizes="100vh"
              className="w-8 h-8 "
            />
          </div>
        ))}
        <div className="flex items-center space-x-3">
          <div className=" bg-gray-100  w-11 h-11 p-1.5 rounded-full flex items-center justify-center">
            <Image
              alt="Amanuel Ferede"
              src={"/navbar/grid.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-5 h-5  "
            />
          </div>

          <div className=" bg-gray-100  w-11 h-11 p-1.5 rounded-full flex items-center justify-center">
            <Image
              alt="Amanuel Ferede"
              src={"/navbar/social.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-11 h-11 object-cover "
            />
          </div>
          <div className=" bg-gray-100  w-11 h-11 p-1.5 rounded-full flex items-center justify-center">
            <Image
              alt="Amanuel Ferede"
              src={"/navbar/bell.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-7 h-7 object-cover "
            />
          </div>

          {
            <Image
              alt="Amanuel Ferede"
              src={profilePicture}
              width={0}
              height={0}
              sizes="100vh"
              className="w-11 h-11 object-cover rounded-full"
            />
          }
        </div>
      </div>
    </nav>
  );
}
