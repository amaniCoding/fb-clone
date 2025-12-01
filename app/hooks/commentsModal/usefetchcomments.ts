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

  const loading = currentCommentShown!.loading;
  const error = currentCommentShown!.error;
  const hasError = currentCommentShown!.hasError;
  const comments = currentCommentShown!.comments;
  const totalPages = currentCommentShown!.totalPages;
  const totalRows = currentCommentShown!.totalRows;

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
