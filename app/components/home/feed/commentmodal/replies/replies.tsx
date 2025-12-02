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
import Lower from "./lower";
import Content from "./content";
import Reply from "./reply";

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
      {replies!.map((reply, index) => {
        const gReactions = reply._gReactions
          ? [...reply._gReactions].sort((a, b) => b.count - a.count)
          : [];
        const newGReactions =
          gReactions.length > 3 ? gReactions.slice(0, 3) : gReactions;
        const ref = replies.length === index + 1 ? lastNodeElementRef : null;
        return (
          <Reply
            key={index}
            reply={reply}
            ref={ref}
            gReactions={newGReactions}
            refId={refId}
          />
        );
      })}
      {hasError && <p>{error}</p>}
    </div>
  );
}
