"use client";

import { UserSharePost } from "@/app/api/feeder/[page]/lib";
import Content from "../../shared/content";
import Medias from "../../shared/Medias";
import Upper from "../../shared/upper";
import UserHeader from "../header";
import PageHeader from "../../pagepost/header";
import GroupHeader from "../../grouppost/header";
import Lower from "../../shared/lower";

type PropsTypes = {
  post: UserSharePost;
  refFrom: "modal" | "post";
};

export default function UserShare_Post({ refFrom, post }: PropsTypes) {
  const _post = {
    type: post.postType!,
    post,
  };
  return (
    <div className="rounded-xl bg-white mb-4 pb-1.5">
      <UserHeader
        firstName={post?.user?.firstName}
        lastName={post?.user?.lastName}
        profilePicture={post.user?.Profile?.profilePicture}
        date={post?.createdAt?.toString()}
        refFrom="share"
      />
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

          <Content content={post.oUserPost?.content} />
          <Medias medias={post.oUserPost?.medias} />
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
        <div className="rounded-xl bg-white mb-1 pb-1.5">
          {post.media?.owner === "user" && (
            <UserHeader
              firstName={post?.media.userPost?.user.firstName}
              lastName={post?.media.userPost?.user.firstName}
              profilePicture={
                post?.media.userPost?.user.Profile?.profilePicture
              }
              date={post?.createdAt?.toString()}
              refFrom="shared"
            />
          )}
          {post.media?.owner === "page" && (
            <PageHeader
              name={post?.media.pagePost?.page.name}
              profilePicture={post?.media.pagePost?.page.profilePicture}
              date={post?.createdAt?.toString()}
              refFrom="shared"
            />
          )}
          {post.media?.owner === "group" && (
            <GroupHeader
              group={post?.media.groupPost?.group}
              memeber={post?.media.groupPost?.user}
              date={post?.createdAt?.toString()}
              refFrom="shared"
            />
          )}
          <div className={`w-full h-112`}>
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
        post={_post}
        feedId={post.feedId}
        postId={post.postId}
      />
      <Lower post={_post} refFrom={refFrom} />
    </div>
  );
}
