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
  const refId = useAppSelector((state) => state.commentModal.id);

  const commentsShown = useAppSelector(
    (state) => state.commentModal.commentsShown
  );
  const currentPostData = useAppSelector(
    (state) => state.commentModal.currentPost
  );
  const starterUrl = useAppSelector((state) => state.commentModal.starterUrl);
  const currentRef = commentsShown.find((cs) => {
    return cs.id === refId;
  });

  const page = currentRef ? currentRef!.page : 1;

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
      } catch (error) {
        dispatch(fetchingCommentsFaild("Error in fetching comments"));
      }
    };
    fetchComments();

    return () => {
      controller.abort();
    };
  }, [dispatch, page!]);

  const loading = currentRef!.loading;
  const error = currentRef!.error;
  const comments = currentRef!.comments;
  const totalPages = currentRef!.totalPages;
  const totalRows = currentRef!.totalRows;

  return {
    loading,
    page,
    error,
    comments,
    totalPages,
    totalRows,
    currentPostData,
    refId,
    starterUrl,
  };
};
