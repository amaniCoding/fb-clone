"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchingReplies,
  repliesFetched,
  fetchingRepliesFailed,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import ReplyReplies from "../replyreplies/replies";
import { useReplyLastNodeRef } from "@/app/hooks/commentsModal/replies/uselastnoderef";
import Lower from "../shared/lower";

export default function Replies({
  refId,
  commentId,
  repliesCount,
}: {
  refId: string;
  commentId: string;
  repliesCount: number;
}) {
  const dispatch = useAppDispatch();
  const repliesShown = useAppSelector(
    (state) => state.commentModal.currentReplyRef!.repliesShown
  );
  const currentRepliesShown = repliesShown!.find((cs) => {
    return cs.refId === refId;
  });
  const starterUrl = useAppSelector(
    (state) => state.commentModal.currentReplyRef!.starterUrl
  );

  const page = currentRepliesShown!.page!;
  const totalPages = currentRepliesShown!.totalPages!;
  const loading = currentRepliesShown!.loading!;
  const hasError = currentRepliesShown!.hasError!;
  const error = currentRepliesShown!.error!;
  const replies = currentRepliesShown!.replies!;
  const fullUrl = `${starterUrl!}/${page!}`;

  const hasMore = page! <= totalPages!;

  const lastNodeElementRef = useReplyLastNodeRef(hasMore, loading!, page!);

  const viewAllReplies = async (commentId: string) => {
    try {
      dispatch(
        fetchingReplies({
          loading: true,
          commentId,
        })
      );
      const controller = new AbortController();

      const response = await axios.get(fullUrl, {
        signal: controller.signal,
      });
      dispatch(repliesFetched(response.data.result));
      dispatch(
        fetchingReplies({
          loading: true,
        })
      );
    } catch {
      dispatch(
        fetchingRepliesFailed({
          hasError: true,
          error: "error in fetching replies",
        })
      );
    }
  };
  return (
    <div id="replies">
      <p
        className="my-1.5 text-gray-500"
        onClick={() => {
          viewAllReplies(commentId);
        }}
      >
        View all {repliesCount} replies
      </p>
      <p>{loading && <p>Loading</p>}</p>
      {replies!.map((rep, index) => {
        const newRxn = rep._gReactions
          ? [...rep._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
        return (
          <div
            className="ml-2 flex flex-col"
            ref={replies.length === index + 1 ? lastNodeElementRef : null}
          >
            {rep.content && <p>{rep.content}</p>}
            {rep.mediaUrl ? (
              <Image
                key={index}
                alt=""
                src={rep.mediaUrl}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-52 object-cover block flex-none"
              />
            ) : null}
            <div className="flex items-center justify-between space-x-5">
              <Lower fromWhat="reply" />
              <div className="flex items-center">
                <p className="text-gray-500">{rep._count.reactions}</p>

                <div className="flex items-center -space-x-1.5">
                  {newRxn_x.map((rxn, index) =>
                    rxn.reactionType ? (
                      <Image
                        key={index}
                        alt=""
                        src={`/reactions/${rxn.reactionType}.png`}
                        width={0}
                        height={0}
                        sizes="100vh"
                        className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
            <ReplyReplies
              refId={`${refId}${rep.id}`}
              replyId={rep.id}
              repliesCount={rep._count.replies}
            />
          </div>
        );
      })}
      {hasError && <p>{error}</p>}
    </div>
  );
}
