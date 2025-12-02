"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchingReplyReplies,
  replyRepliesFetched,
  fetchingReplyRepliesFailed,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import { useReplyRepliesLastNodeRef } from "@/app/hooks/commentsModal/replyreplies/uselastnoderef";
import Lower from "../shared/lower";
import Content from "./content";
import Reply from "./reply";

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

  const page = currentRepliesShown!.page!;
  const totalPages = currentRepliesShown!.totalPages!;
  const loading = currentRepliesShown!.loading!;
  const hasError = currentRepliesShown!.hasError!;
  const error = currentRepliesShown!.error!;
  const replies = currentRepliesShown!.replies!;
  const fullUrl = `${starterUrl!}/${page!}`;

  const hasMore = page! <= totalPages!;

  const lastNodeElementRef = useReplyRepliesLastNodeRef(
    hasMore,
    loading!,
    page!
  );
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
      <p>{loading && <p>Loading</p>}</p>
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        const ref = replies.length === index + 1 ? lastNodeElementRef : null;
        return (
          <Reply
            reply={reply}
            key={index}
            ref={ref}
            gReactions={newGReactions}
            reactionsCount={reply._count.reactions}
          />
        );
      })}
      {hasError && <p>{error}</p>}
    </div>
  );
}
