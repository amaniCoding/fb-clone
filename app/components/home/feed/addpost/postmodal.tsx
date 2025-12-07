"use client";
import { FaLock, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { BsEmojiAstonished } from "react-icons/bs";

import React, { ChangeEvent, useActionState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { createPost, State } from "@/app/actions/user/addpost";

import { useSession } from "next-auth/react";

import { PiPencilSimpleBold } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import UploadedMedias from "./uploadedmedias";
import {
  setPostContent,
  setUploadedMediasToAdd,
} from "@/app/store/slices/addpost/addpost";
import { addFeed } from "@/app/store/slices/feed/feed";

// import { createPost, State } from "@/app/libs/actions"
export default function PostModal(props: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { data, status } = useSession();
  const initialState: State = {
    message: "",
    success: false,
    feed: undefined,
  };

  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
    undefined
  );
  const content = useAppSelector((state) => state.addPost.content);
  const uploadedMedias = useAppSelector(
    (state) => state.addPost.upLoadedMedias
  );
  const input = useRef<HTMLInputElement>(null);

  const textAreaForText = useRef<HTMLTextAreaElement>(null);

  const showDialog = () => {
    input.current?.click();
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (window.FileReader) {
      const files = e.target.files;

      if (files) {
        for (const x in files) {
          const file = files[x];
          if (file) {
            const fr = new FileReader();
            fr.onloadend = () => {
              dispatch(
                setUploadedMediasToAdd({
                  type: "add",
                  media: {
                    type: "image",
                    url: fr.result as string,
                  },
                })
              );
            };
            try {
              fr.readAsDataURL(file);
            } catch {}
          }
        }
      }
      //console.log(files![0]);
    } else {
      alert("file reader not supported");
    }
  };

  const onChangePost = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(setPostContent(e.target.value));
    dispatch(setPostContent(e.target.value));
  };

  useEffect(() => {
    if (state.success) {
      props.onClose();
      dispatch(
        setUploadedMediasToAdd({
          type: "empty",
        })
      );
      dispatch(setPostContent(""));
      dispatch(addFeed(state.feed));
    }
  }, [dispatch, state.success, state.feed, props]);

  return (
    <>
      <section className="bg-gray-100/80 fixed top-0 bottom-0 left-0 right-0 z-20 overflow-hidden">
        <div
          className={`max-w-[517px] mx-auto relative  shadow-2xl rounded-xl bg-white mt-15
            `}
        >
          {isPending && (
            <div className="absolute bg-gray-100 opacity-60 z-10 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <p className="text-2xl font-medium">Posting ...</p>
            </div>
          )}

          <div className="p-3 border-b pb-2 border-b-gray-200 flex items-center justify-between">
            <p className=""></p>
            <p className="font-bold text-xl">Create Post</p>
            <p>{state.message}</p>
            <FaXmark
              className="w-10 h-10 p-2 hover:bg-gray-50 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => {
                dispatch(setPostContent(content));
                props.onClose();
              }}
            />
          </div>
          <form className="p-3 flex flex-col w-full" action={formAction}>
            <div className="flex space-x-3">
              {status === "loading" ? null : data?.user.profilePicture ? (
                <Image
                  alt="Amanuel Ferede"
                  src={data?.user.profilePicture}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : null}

              <div className="flex flex-col pb-3 space-y">
                <p>Amanuel Ferede</p>
                <button className="py-[0.4px] rounded-md bg-gray-200 flex items-center justify-center space-x-1">
                  <FaLock className="w-3 h-3" />
                  <span className="text-sm">Only me</span>
                </button>
              </div>
            </div>

            <div className={`overflow-y-auto max-h-64  mb-4`}>
              <div className="textarea relative mb-4">
                <textarea
                  ref={textAreaForText}
                  placeholder="What's in your mind, Amanuel"
                  className={`${
                    uploadedMedias.length > 0
                      ? "placeholder:text-sm"
                      : "placeholder:text-3xl text-3xl"
                  } placeholder:text-gray-500 auto text-wrap resize-none
                outline-none  block field-sizing-content border-none outline-0 w-full overflow-y-auto ${
                  uploadedMedias.length === 0 ? "pb-20" : "pb-0"
                }`}
                  value={content}
                  onChange={onChangePost}
                  name="post"
                ></textarea>
                {uploadedMedias.length > 0 && (
                  <BsEmojiAstonished className="w-6 h-6 fill-gray-600 absolute z-10 top-0 right-1 bottom-0" />
                )}
              </div>
              {uploadedMedias.length > 0 && (
                <div className="uploadedmedias relative w-full">
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-linear-to-b from-10% to-50% from-black/25 to-black/5"></div>
                  <UploadedMedias uploadedMedias={uploadedMedias} />
                  <div className="flex items-center justify-between absolute z-20 top-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <button className=" py-1.5 px-2.5 rounded-md flex items-center space-x-1 justify-center bg-white cursor-pointer">
                        <PiPencilSimpleBold className="w-5 h-5" />
                        <p className="font-semibold text-sm">Edit All</p>
                      </button>

                      <button className=" py-1.5 px-2.5 rounded-md flex items-center space-x-1 justify-center bg-white cursor-pointer">
                        <GrGallery className="w-5 h-5" />
                        <p
                          className="font-semibold text-sm cursor-pointer"
                          onClick={showDialog}
                        >
                          Add photos/videos
                        </p>
                      </button>
                    </div>
                    <FaXmark
                      className="w-8 h-8 bg-gray-50 rounded-full p-1.5 cursor-pointer"
                      onClick={() => {
                        dispatch(
                          setUploadedMediasToAdd({
                            type: "empty",
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              )}
              {uploadedMedias.length === 0 && (
                <div
                  className={` flex items-center justify-between my-2 px-3 `}
                >
                  <div
                    className={`w-8 h-8 bg-linear-to-bl rounded-lg  from-yellow-400 to-green-500`}
                  ></div>
                  <BsEmojiAstonished className="w-7 h-7 fill-gray-600 " />
                </div>
              )}

              <div className={``}>
                <input
                  ref={input}
                  name="photos"
                  multiple
                  type="file"
                  accept="image/*,video/*"
                  onChange={onChangeFile}
                  className="relative hidden"
                ></input>
              </div>
            </div>

            <div className="mb-4 p-3 border border-gray-300 rounded-lg flex items-center justify-between">
              <p>Add to your post</p>
              <div className="flex items-center space-x-1">
                <div className="p-1 hover:bg-gray-100 rounded-full">
                  <Image
                    onClick={showDialog}
                    alt="Amanuel Ferede"
                    src={"/postmodal/photos.png"}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover cursor-pointer"
                  />
                </div>

                <div className="p-1 hover:bg-gray-100 rounded-full">
                  <Image
                    alt="Amanuel Ferede"
                    src={"/postmodal/facebook.png"}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover"
                  />
                </div>
                <div className="p-1 hover:bg-gray-100 rounded-full">
                  <Image
                    alt="Amanuel Ferede"
                    src={"/postmodal/happy.png"}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover"
                  />
                </div>
                <div className="p-1 hover:bg-gray-100 rounded-full">
                  <Image
                    alt="Amanuel Ferede"
                    src={"/postmodal/location-pin.png"}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover"
                  />
                </div>
                <div className="p-1 hover:bg-gray-100 rounded-full">
                  <Image
                    alt="Amanuel Ferede"
                    src={"/postmodal/gif-symbol.png"}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover"
                  />
                </div>
              </div>
            </div>
            <button
              disabled={!content || uploadedMedias.length === 0}
              type="submit"
              className={`w-full text-center  py-2 cursor-pointer text-white rounded-md ${
                content || uploadedMedias.length > 0
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
