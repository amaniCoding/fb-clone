"use client";
import Image from "next/image";

import StorySliderItem from "./storyslideritem";
import { BsPlus } from "react-icons/bs";
import Link from "next/link";
import { useRef, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { LoggedInUser } from "./types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stories } from "@/app/seed/dummy";
import Slider from "react-slick";

export default function Stories({
  loggedInUser: { profilePicture },
}: {
  loggedInUser: LoggedInUser;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const numSlides = stories.length;

  const slidesToShow = numSlides > 3 ? 3 : numSlides;
  const sliderRef = useRef<Slider>(null);
  const settings = {
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
    dots: false,
    infinite: false,
    initialSlide: 1,
    variableWidth: true,
    centerPadding: "0px",

    speed: 500,
    slidesToShow: slidesToShow,
    //slidesToScroll: slidesToShow,

    arrows: false,
  };

  const handelNext = () => {
    sliderRef?.current?.slickNext();
  };

  const handelPrev = () => {
    sliderRef?.current?.slickPrev();
  };

  return (
    <div className="slider-container h-52 relative w-full mb-5">
      <MdNavigateNext
        onClick={handelNext}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-5 z-10 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      {currentSlide > 0 && (
        <MdNavigateBefore
          onClick={handelPrev}
          className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-5 z-10 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
        />
      )}

      {stories.length > 0 && (
        <Slider {...settings} ref={sliderRef}>
          <div className="group overflow-hidden rounded-xl max-w-28 m-auto h-52">
            <Link href={`#`} className="block h-52 relative rounded-xl">
              <Image
                alt="Amanuel Ferede"
                src={profilePicture}
                width={0}
                height={0}
                sizes="100vh"
                className="w-full h-3/4 object-cover"
              />

              <div className="h-[25%] absolute z-10 bottom-0 flex flex-col w-full bg-white px-2 pb-4">
                <div className="w-10 h-10  bg-white rounded-full scale-[122%] absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2"></div>
                <BsPlus className="w-10 h-10 bg-blue-600 rounded-full absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2 text-white" />
                <p className="text-center mt-8 text-sm">Create A story</p>
              </div>
            </Link>
          </div>
          {stories.map((story) => {
            return (
              <StorySliderItem
                key={story.storyid}
                storyid={story.storyid}
                fname={story.fname}
                lname={story.lname}
                profilepic={story.profilepic}
                post={story.post}
              />
            );
          })}
        </Slider>
      )}
    </div>
  );
}
