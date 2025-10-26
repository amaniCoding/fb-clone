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
import { PostsUser } from "../types";
import { FeedsType } from "@/app/apis/feeder/[page]/libs/user";
import { useAppDispatch } from "@/app/store/hooks";
import { openCommentModal } from "@/app/store/slices/feed/feed";

export default function CommentModal({
  post,
}: {
  post: FeedsType | undefined;
}) {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  const closeCommentModal = () => {
    dispatch(
      openCommentModal({
        isOpen: false,
        post: undefined,
      })
    );
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="shadow-2xl  max-w-[650px] mx-auto rounded-xl bg-white my-10 ">
        <Header
          poster={`${post?.user.firstName} ${post?.user.lastName}`}
          onClose={closeCommentModal}
        />
        <div className="max-h-96 overflow-y-auto">
          <HeadLine />
          <Content content={post!.content} />
          <Medias medias={post!.medias} />

          <Upper
            comments={post!._count.comments}
            reactions={post!._count.reactions}
            groupedReactions={post!._groupedReactions}
            firtReactions={post!.reactions}
          />
          <div className=" p-1 border-b border-t-gray-300 border-t border-b-gray-300">
            <Lower post={post} refFrom="commentModal" />
          </div>
          <Comments />
        </div>
        <p className="my-2"></p>
        <AddComment loggedInUser={data?.user} />
      </div>
    </div>
  );
}
