"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchingReplies,
  repliesFetched,
  fetchingRepliesFailed,
  fetchingReplyReplies,
  replyRepliesFetched,
  fetchingReplyRepliesFailed,
} from "@/app/store/slices/modal/comment";
import axios from "axios";

export default function ReplyReplies({
  refId,
  replyId,
  repliesCount,
}: {
  refId: string;
  replyId: string;
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

  const page = currentRepliesShown!.page;
  const fullUrl = `${starterUrl!}/${page!}`;
  const viewAllReplyReplies = async (replyId: string) => {
    try {
      dispatch(
        fetchingReplyReplies({
          loading: true,
          replyId,
        })
      );
      const controller = new AbortController();

      const response = await axios.get(fullUrl, {
        signal: controller.signal,
      });
      dispatch(replyRepliesFetched(response.data.result));
      dispatch(
        fetchingReplyReplies({
          loading: true,
        })
      );
    } catch {
      dispatch(
        fetchingReplyRepliesFailed({
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
          viewAllReplyReplies(replyId);
        }}
      >
        View all {repliesCount} replies
      </p>
      <p>{currentRepliesShown!.loading && <p>Loading</p>}</p>
      {currentRepliesShown!.replies!.map((rep, index) => {
        const newRxn = rep._gReactions
          ? [...rep._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
        return (
          <div className="ml-2 flex flex-col">
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
              <div className="flex items-center space-x-2 text-black/40 text-sm font-semibold">
                <p>2hrs</p>
                <p>Like</p>
                <p>Reply</p>
              </div>
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
          </div>
        );
      })}
      {currentRepliesShown!.hasError && <p>{currentRepliesShown?.error}</p>}
    </div>
  );
}
