"use client";
import Comments from "./comments";
import AddComment from "./addcomment";
import Header from "./header";
import { useSession } from "next-auth/react";
import Content from "./content";
import Medias from "../post/Medias";
import Upper from "./upper";
import Lower from "../post/footer/lower/lower";
import HeadLine from "./headline";

export default function CommentModal() {
  const { data, status } = useSession();

  if (status === "loading") {
    return;
  }
  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl max-w-[700px] mx-auto rounded-xl bg-white my-10 ">
        <Header />
        <HeadLine />
        <Content />
        <Medias />
        <Comments />
        <Upper />
        <div className=" p-1 border-b border-t-gray-300 border-t border-b-gray-300">
          <Lower />
        </div>
        <p className="my-2"></p>
        <AddComment loggedInUser={data?.user} />
      </div>
    </div>
  );
}
