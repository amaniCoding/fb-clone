import { CommentsResponseType } from "@/app/apis/comments/oUserPost/[postid]/[page]/route";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  commentsFetched,
  fetchingComments,
  fetchingCommentsFaild,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import { useEffect } from "react";

export const useFetchComments = () => {
  const dispatch = useAppDispatch();
  const currentParentRefId = useAppSelector(
    (state) => state.commentModal.currentCommentRef!.refId
  );

  const commentsShown = useAppSelector(
    (state) => state.commentModal.currentCommentRef!.commentsShown
  );

  const currentCommentShown = commentsShown!.find((cs) => {
    return cs.refId === currentParentRefId;
  });

  const starterUrl = useAppSelector(
    (state) => state.commentModal.currentCommentRef!.starterUrl
  );

  const page = currentCommentShown!.page;

  const fullUrl = `${starterUrl!}/${page!}`;

  const loading = currentCommentShown!.loading
    ? currentCommentShown!.loading
    : undefined;
  const error = currentCommentShown!.error
    ? currentCommentShown!.error
    : undefined;
  const hasError = currentCommentShown!.hasError
    ? currentCommentShown!.hasError
    : undefined;
  const comments = currentCommentShown!.comments
    ? currentCommentShown!.comments
    : undefined;
  const totalPages = currentCommentShown!.totalPages
    ? currentCommentShown!.totalPages
    : undefined;
  const totalRows = currentCommentShown!.totalRows
    ? currentCommentShown!.totalRows
    : undefined;
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
        dispatch(fetchingComments(false));

        // dispatch(
        //   fetchingCommentsFaild({
        //     hasError: true,
        //     error: "Error while fetching comments",
        //   })
        // );
      }
    };
    fetchComments();

    return () => {
      controller.abort();
    };
  }, [dispatch, page!, fullUrl]);

  return {
    loading,
    page,
    error: {
      hasError: hasError,
      error: error,
    },
    comments,
    totalPages,
    totalRows,
  };
};
