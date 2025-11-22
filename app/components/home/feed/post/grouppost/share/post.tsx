"use client";

import { ToGroupSharedPost } from "@/app/apis/feeder/[page]/lib";
import Content from "../shared/content";
import Medias from "../shared/Medias";
import Upper from "../shared/upper";
import PageHeader from "../../pagepost/header";
import UserHeader from "../../userpost/header";
import GroupHeader from "../header";
import Lower from "./lower";

type PropsTypes = {
  post: ToGroupSharedPost;
};

export default function ToGroupShare_Post({ post }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <GroupHeader
        group={post?.oGroupPost?.group}
        memeber={post.oGroupPost?.user}
        date={post?.createdAt?.toString()}
      />
      <Content content={post.content} />
      {post.shareWhat === "user" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <UserHeader
            firstName={post?.oUserPost?.user?.firstName}
            lastName={post?.oUserPost?.user?.lastName}
            date={post?.createdAt?.toString()}
          />

          <Content content={post?.oUserPost?.content} />
          <Medias medias={post?.oUserPost?.medias} />
          <Upper
            commentsCount={post?._count?.comments}
            reactionsCount={post?._count?.reactions}
            groupedReactions={post?._gReactions}
            firstReactions={post?.reactions}
          />
        </div>
      )}

      {post.shareWhat === "page" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <PageHeader
            name={post?.oPagePost?.page?.name}
            profilePicture={post?.oPagePost?.page?.profilePicture}
            date={post?.createdAt?.toString()}
          />

          <Content content={post?.oPagePost?.content} />
          <Medias medias={post?.oPagePost?.medias} />
          <Upper
            commentsCount={post?._count?.comments}
            reactionsCount={post?._count?.reactions}
            groupedReactions={post?._gReactions}
            firstReactions={post?.reactions}
          />
        </div>
      )}

      {post.shareWhat === "group" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <GroupHeader
            group={post?.oGroupPost?.group}
            memeber={post.oGroupPost?.user}
            date={post?.createdAt?.toString()}
          />

          <Content content={post?.oGroupPost?.content} />
          <Medias medias={post?.oGroupPost?.medias} />
          <Upper
            commentsCount={post?._count?.comments}
            reactionsCount={post?._count?.reactions}
            groupedReactions={post?._gReactions}
            firstReactions={post?.reactions}
          />
        </div>
      )}
      <Lower post={post} />
    </div>
  );
}
