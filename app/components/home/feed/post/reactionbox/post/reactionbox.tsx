"use client";
import { reactOuserPost } from "@/app/actions/react/post/oUserPost/react";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/api/feeder/[page]/lib";
import { PostType } from "@/app/generated/prisma";
import ReactA from "../shared/reacta";
import { reactOPagePost } from "@/app/actions/react/post/oPagePost/react";
import { reactUserSharePost } from "@/app/actions/react/post/userSharePost/react";
import { reactPageSharePost } from "@/app/actions/react/post/pageSharePost/react";
import { reactOGroupPost } from "@/app/actions/react/post/oGroupPost/react";
import { reactToGroupSharePost } from "@/app/actions/react/post/toGroupSharePost/react";
import { State } from "@/app/actions/react/types";
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
  const _reactAPost = () => {
    if (post!.type === "oUserPost") {
      const _post = post!.post as OUserPost;
      const x = reactOuserPost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }
    if (post!.type === "userSharePost") {
      const _post = post!.post as UserSharePost;
      const x = reactUserSharePost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }

    if (post!.type === "oPagePost") {
      const _post = post!.post as OPagePost;
      const x = reactOPagePost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }

    if (post!.type === "pageSharePost") {
      const _post = post!.post as PageSharePost;
      const x = reactPageSharePost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }

    if (post!.type === "oGroupPost") {
      const _post = post!.post as OGroupPost;
      const x = reactOGroupPost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }

    if (post!.type === "toGroupSharedPost") {
      const _post = post!.post as ToGroupSharedPost;
      const x = reactToGroupSharePost.bind(null, _post.postId!);
      return x as unknown as Promise<State>;
    }
  };
  return (
    <div onMouseEnter={keepShowing} onMouseLeave={hideShowing}>
      <ReactA actionOn={_reactAPost} />
    </div>
  );
}
