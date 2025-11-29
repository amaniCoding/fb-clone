import { CommentsResponseType } from "@/app/apis/comments/oUserPost/[postid]/[page]/route";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  commentsFetched,
  fetchingComments,
  fetchingCommentsFaild,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import { useEffect } from "react";

export const useFetchReplies = () => {
  const dispatch = useAppDispatch();
  const currentRefId = useAppSelector(
    (state) => state.commentModal.currentReplyRef?.refId
  );

  const repliesShown = useAppSelector(
    (state) => state.commentModal.currentReplyRef!.repliesShown
  );

  const currentRepliesShown = repliesShown!.find((cs) => {
    return cs.refId === currentRefId;
  });

  const starterUrl = useAppSelector(
    (state) => state.commentModal.currentReplyRef!.starterUrl
  );

  const page = currentRepliesShown!.page;

  const fullUrl = `${starterUrl!}/${page!}`;

  useEffect(() => {
    const controller = new AbortController();
    const fetchComments = async () => {
      try {
        dispatch(fetchingComments(true));
        const response = await axios.get(fullUrl, {
          signal: controller.signal,
        });
        dispatch(
          commentsFetched({
            result: response.data.result as CommentsResponseType,
          })
        );
        dispatch(fetchingComments(false));
      } catch {
        dispatch(
          fetchingCommentsFaild({
            hasError: true,
            error: "Error while fetching comments",
          })
        );
      }
    };
    fetchComments();

    return () => {
      controller.abort();
    };
  }, [dispatch, page!, fullUrl]);

  const loading = currentRepliesShown!.loading;
  const error = currentRepliesShown!.error;
  const hasError = currentRepliesShown!.hasError;
  const replies = currentRepliesShown!.replies;
  const totalPages = currentRepliesShown!.totalPages;
  const totalRows = currentRepliesShown!.totalRows;

  return {
    loading,
    page,
    error: {
      hasError: hasError,
      error: error,
    },
    replies,
    totalPages,
    totalRows,
  };
};
