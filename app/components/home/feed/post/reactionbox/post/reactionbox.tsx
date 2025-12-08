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
import { ReactionType } from "@/app/generated/prisma/client";
import { _reactA } from "@/app/actions/react/react";
export default function ReactionBox({
  post,
  keepShowing,
  hideShowing,
}: {
  post:
    | OUserPost
    | UserSharePost
    | OPagePost
    | PageSharePost
    | OGroupPost
    | ToGroupSharedPost;

  keepShowing: () => void;
  hideShowing: () => void;
}) {
  const x = _reactA("post", "itSelf");

  const z = x!.bind(
    null,
    post.postType!,
    post.postId!,
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
      <div
        onMouseEnter={keepShowing}
        onMouseLeave={hideShowing}
        className="bg-white absolute bottom-7 -left-1 rounded-3xl shadow-lg z-20 p-1"
      >
        <ReactA actionOn={z!} feedId={post.feedId} postType={post.postType} />
      </div>
    </>
  );
}
