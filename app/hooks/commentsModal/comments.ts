import { CommentsResponseType } from "@/app/apis/comments/oUserPost/[postid]/[page]/route";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  commentsFetched,
  fetchingComments,
  fetchingCommentsFaild,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import { useEffect } from "react";
import { fa } from "zod/v4/locales";

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

  let page = currentRef ? currentRef!.page : 1;
  let loading = currentRef ? currentRef?.loading : false;
  let error = currentRef ? currentRef.error : undefined;
  let comments = currentRef ? currentRef.comments : [];
  let totalPages = currentRef ? currentRef.totalPages : 0;
  let totalRows = currentRef ? currentRef.totalRows : 0;

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
        dispatch(fetchingComments(false));
      }
    };
    fetchComments();

    return () => {
      controller.abort();
    };
  }, [page]);

  page = currentRef ? currentRef!.page : 1;
  loading = currentRef?.loading ? currentRef?.loading : false;
  error = currentRef ? currentRef.error : undefined;
  comments = currentRef ? currentRef.comments : [];
  totalPages = currentRef ? currentRef.totalPages : 0;
  totalRows = currentRef ? currentRef.totalRows : 0;

  return {
    loading,
    page,
    error,
    comments,
    totalPages,
    totalRows,
    currentPostData,
    refId,
  };
};
