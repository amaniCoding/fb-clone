"use client";
import Comments from "./comments";
import AddComment from "./addcomment";
import Header from "./header";
import { useSession } from "next-auth/react";

export default function CommentModal() {
  const { data, status } = useSession();

  if (status === "loading") {
    return;
  }
  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl max-w-[700px] mx-auto rounded-xl bg-white my-10 ">
        <Header />

        <Comments />

        <AddComment loggedInUser={data?.user} />
      </div>
    </div>
  );
}
