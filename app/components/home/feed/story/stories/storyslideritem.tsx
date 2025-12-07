"use client";
import Image from "next/image";
import Link from "next/link";
import { StorySliderProps } from "./types";

export default function StorySliderItem(props: StorySliderProps) {
  return (
    <div className="group overflow-hidden rounded-xl h-55 bg-red-300">
      <Link href={`/story/${props.storyid}`}>
        <div className="relative">
          <Image
            alt="Amanuel Ferede"
            src={props.post}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-55 object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 bg-linear-to-b from-transparent to-black/60"></div>
          <Image
            alt="Amanuel Ferede"
            src={props.profilepic}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 absolute top-2 left-2 object-cover rounded-full ring-1 ring-offset-2 ring-white"
          />
          <p className="absolute text-sm bottom-2 left-2 text-white brightness-100">
            {props.fname} {props.lname}
          </p>
        </div>
      </Link>
    </div>
  );
}
