"use client";
import Image from "next/image";
import { useAppDispatch } from "@/app/store/hooks";
import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/api/feeder/[page]/lib";
import { showReactionModal } from "@/app/store/slices/modal/reaction";
import { ReactionType, PostType } from "@/app/generated/prisma/client";
type PropTypes = {
  commentsCount: number | undefined;
  reactionsCount: number | undefined;
  groupedReactions:
    | {
        reactionType: ReactionType;
        count: number;
      }[]
    | undefined;
  firstReactions:
    | {
        user: {
          firstName: string;
          lastName: string;
          Profile: {
            profilePicture: string | null;
          } | null;
        };
      }[]
    | undefined;
  feedId: string | undefined;
  postId: string | undefined;
  post: {
    type: PostType;
    post: unknown;
  };
};
export default function Upper({
  commentsCount,
  reactionsCount,
  groupedReactions,

  post,
}: PropTypes) {
  const dispatch = useAppDispatch();
  const newRxn = groupedReactions
    ? [...groupedReactions].sort((a, b) => b.count - a.count)
    : [];
  const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;

  const _showReactionModal = (currentReactionType: ReactionType) => {
    if (post.type === "oUserPost") {
      const _post = post.post as OUserPost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "oUserPost",
            oUserPost: _post,
          },
        })
      );
    }
    if (post.type === "userSharePost") {
      const _post = post.post as UserSharePost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "userSharePost",
            userSharePost: _post,
          },
        })
      );
    }

    if (post.type === "oPagePost") {
      const _post = post.post as OPagePost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "oPagePost",
            oPagePost: _post,
          },
        })
      );
    }

    if (post.type === "pageSharePost") {
      const _post = post.post as PageSharePost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "pageSharePost",
            pageSharePost: _post,
          },
        })
      );
    }

    if (post.type === "oGroupPost") {
      const _post = post.post as OGroupPost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "oGroupPost",
            oGroupPost: _post,
          },
        })
      );
    }

    if (post.type === "toGroupSharedPost") {
      const _post = post.post as ToGroupSharedPost;
      dispatch(
        showReactionModal({
          currentReactionType,
          isOpen: true,
          currentPost: {
            postType: "toGroupSharedPost",
            toGroupSharedPost: _post,
          },
        })
      );
    }
  };
  return (
    <div className="px-3 py-2">
      <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
        {reactionsCount && reactionsCount > 0 && (
          <div className="flex items-center space-x-1 fill-gray-500">
            <div className="flex items-center -space-x-1.5">
              {newRxn_x.map((rxn, index) => (
                <Image
                  onClick={() => {
                    _showReactionModal(rxn.reactionType);
                  }}
                  key={index}
                  alt=""
                  src={`/reactions/${rxn.reactionType}.png`}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                />
              ))}
            </div>
            <p>{reactionsCount}</p>
          </div>
        )}
        <div className="flex items-center space-x-3">
          {commentsCount && commentsCount > 0 && (
            <div className="flex items-center space-x-1  rounded-md ">
              <span>{commentsCount}</span>
              <Image
                alt=""
                src={"/reactions/comment.png"}
                width={0}
                height={0}
                sizes="100vh"
                className=" w-5 h-5 object-cover rounded-full block flex-none opacity-60"
              />
            </div>
          )}

          {/* <div className="flex items-center space-x-1  rounded-md ">
            <span>20</span>
            <Image
              alt=""
              src={"/reactions/share.png"}
              width={0}
              height={0}
              sizes="100vh"
              className=" w-5 h-5 object-cover rounded-full block flex-none opacity-60"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
