"use client";
import Image from "next/image";

import { useState } from "react";
import { FaRegSmile } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import PostModal from "./postmodal";
import { LoggedInUser } from "./types";
import { showAddPostModal } from "@/app/store/slices/addpost/addpost";

export default function AddPost({
  loggedInUser: { profilePicture },
}: {
  loggedInUser: LoggedInUser;
}) {
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.addPost.content);

  const handelShowPostBox = () => {
    setShowPostModal(true);
    dispatch(showAddPostModal(true));
  };

  const handelHidePostBox = () => {
    setShowPostModal(false);
    dispatch(showAddPostModal(false));
  };

  return (
    <>
      <div className=" mb-4 p-3 bg-white rounded-xl">
        <div className="w-full border-b border-b-gray-100 flex md:items-center space-x-3 pb-2.5">
          {
            <Image
              alt="Amanuel Ferede"
              src={profilePicture}
              width={0}
              height={0}
              sizes="100vh"
              className="w-9 h-9 object-cover rounded-full"
            />
          }

          <input
            type="text"
            placeholder="What is on your mind, Amanuel"
            className="w-full outline-none focus:outline-none p-2 bg-gray-50 rounded-3xl placeholder:font-sans pl-5 text-black"
            value={content}
            onChange={() => {}}
            onFocus={() => {
              handelShowPostBox();
            }}
          ></input>
        </div>
        <div className="flex items-center xl:justify-center justify-between space-x-2 my-1.5">
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <Image
              alt="Amanuel Ferede"
              src={`/addpost/video.png`}
              width={0}
              height={0}
              sizes="100vh"
              className="w-8 h-8"
            />{" "}
            <span className="md:block hidden">Live Video</span>
          </button>
          <button
            className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2"
            onClick={() => {
              handelShowPostBox();
            }}
          >
            <Image
              alt="Amanuel Ferede"
              src={`/addpost/photos.png`}
              width={0}
              height={0}
              sizes="100vh"
              className="w-8 h-8"
            />{" "}
            <span className="md:block hidden">Photo / Video</span>
          </button>
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <FaRegSmile className="w-7 h-7 fill-orange-300" />
            <span className="md:block hidden">Photo / Video</span>
          </button>
        </div>
      </div>

      {showPostModal && <PostModal onClose={handelHidePostBox} />}
    </>
  );
}
