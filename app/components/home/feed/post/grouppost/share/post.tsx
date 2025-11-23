"use client";

import { ToGroupSharedPost } from "@/app/apis/feeder/[page]/lib";

import PageHeader from "../../pagepost/header";
import UserHeader from "../../userpost/header";
import GroupHeader from "../header";
import Lower from "./lower";
import Medias from "../../shared/Medias";
import Content from "../../shared/content";
import Upper from "../../shared/upper";

type PropsTypes = {
  post: ToGroupSharedPost;
};

export default function ToGroupShare_Post({ post }: PropsTypes) {
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      {post.sharer === "user" && (
        <GroupHeader
          group={post?.group}
          memeber={post.user}
          date={post?.createdAt?.toString()}
          refFrom="share"
        />
      )}

      {post.sharer === "page" && (
        <PageHeader
          name={post?.page?.name}
          profilePicture={post?.page?.profilePicture}
          date={post?.createdAt?.toString()}
          refFrom="share"
        />
      )}

      {post.sharer === "page" && (
        <GroupHeader
          group={post?.oGroupPost?.group}
          memeber={post.oGroupPost?.user}
          date={post?.createdAt?.toString()}
          refFrom="shared"
        />
      )}
      <Content content={post.content} />
      {post.shareWhat === "user" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <UserHeader
            firstName={post?.oUserPost?.user?.firstName}
            lastName={post?.oUserPost?.user?.lastName}
            profilePicture={post.oUserPost?.user.Profile?.profilePicture}
            date={post?.createdAt?.toString()}
            refFrom="shared"
          />
          <Content content={post?.oUserPost?.content} />
          <Medias medias={post?.oUserPost?.medias} />
        </div>
      )}

      {post.shareWhat === "page" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <PageHeader
            name={post?.oPagePost?.page?.name}
            profilePicture={post?.oPagePost?.page?.profilePicture}
            date={post?.createdAt?.toString()}
            refFrom="shared"
          />
          <Content content={post?.oPagePost?.content} />
          <Medias medias={post?.oPagePost?.medias} />
        </div>
      )}

      {post.shareWhat === "group" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <GroupHeader
            group={post?.oGroupPost?.group}
            memeber={post.oGroupPost?.user}
            date={post?.createdAt?.toString()}
            refFrom="shared"
          />
          <Content content={post?.oGroupPost?.content} />
          <Medias medias={post?.oGroupPost?.medias} />
        </div>
      )}
      {post.shareWhat === "media" && (
        <div className="rounded-xl bg-white mb-4 pb-1.5">
          <div className={`w-full h-[28rem]`}>
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url(" + `${post.media?.url}` + ")",
                backgroundPosition: "top center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
      )}
      <Upper
        commentsCount={post?._count?.comments}
        reactionsCount={post?._count?.reactions}
        groupedReactions={post?._gReactions}
        firstReactions={post?.reactions}
        feedId={post.feedId}
        postId={post.postId}
      />
      <Lower post={post} />
    </div>
  );
}
