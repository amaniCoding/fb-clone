"use client";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/api/feeder/[page]/lib";
import ReactA from "../shared/reacta";

import { State } from "@/app/actions/react/types";
import { ReactionType, PostType } from "@/app/generated/prisma/client";
import { _reactA } from "@/app/actions/react/react";
export default function ReactionBox({
  post,
  keepShowing,
  hideShowing,
}: {
  post?: {
    type: PostType;
    post: unknown;
  };

  keepShowing: () => void;
  hideShowing: () => void;
}) {
  if (post!.type === "oUserPost") {
    const _post = post!.post as OUserPost;
    const x = _reactA("post", "itSelf");

    const z = x!.bind(
      null,
      "oUserPost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }
  if (post!.type === "userSharePost") {
    const _post = post!.post as UserSharePost;
    const x = _reactA("post", "itSelf");
    const z = x!.bind(
      null,
      "userSharePost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }

  if (post!.type === "oPagePost") {
    const _post = post!.post as OPagePost;
    const x = _reactA("post", "itSelf");

    const z = x!.bind(
      null,
      "oPagePost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }

  if (post!.type === "pageSharePost") {
    const _post = post!.post as PageSharePost;
    const x = _reactA("post", "itSelf");

    const z = x!.bind(
      null,
      "pageSharePost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }

  if (post!.type === "oGroupPost") {
    const _post = post!.post as OGroupPost;
    const x = _reactA("post", "itSelf");

    const z = x!.bind(
      null,
      "oGroupPost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }

  if (post!.type === "toGroupSharedPost") {
    const _post = post!.post as ToGroupSharedPost;
    const x = _reactA("post", "itSelf");
    const z = x!.bind(
      null,
      "toGroupSharedPost",
      _post.postId!,
      undefined,
      undefined,
      undefined,
      undefined
    )! as unknown as (
      reactionType: ReactionType,
      prevState: State | undefined
    ) => Promise<State | undefined>;

    return (
      <>
        <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
          <ReactA
            actionOn={z!}
            feedId={_post.feedId}
            postType={_post.postType}
          />
        </div>
      </>
    );
  }
  return null;
}
