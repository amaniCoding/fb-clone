import {
  OGroupPost,
  OPagePost,
  OUserPost,
  PageSharePost,
  ToGroupSharedPost,
  UserSharePost,
} from "@/app/apis/feeder/[page]/lib";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchingPost,
  fetchingPostFaild,
  fetchingPostSucceed,
  FetchingPostSucceedType,
} from "@/app/store/slices/modal/comment";
import axios from "axios";
import { useCallback, useEffect } from "react";

export const useFetchPost = () => {
  const dispatch = useAppDispatch();
  const currentParentRefId = useAppSelector(
    (state) => state.commentModal.currentParentRefId
  );
  const postsShown = useAppSelector(
    (state) => state.commentModal.currentPostRef!.postsShown
  );
  /** the post type is already known */
  const postType = useAppSelector(
    (state) => state.commentModal.currentPostRef!.postType
  );

  const currentPostShown = postsShown!.find((ps) => {
    return ps.refId === currentParentRefId;
  });

  const url = useAppSelector(
    (state) => state.commentModal.currentPostRef!.starterUrl!
  );
  const getAppropriatePost = useCallback(
    (post: unknown): FetchingPostSucceedType | undefined => {
      if (postType === "oUserPost") {
        return {
          postType: "oUserPost",
          oUserPost: post as OUserPost,
        };
      }

      if (postType === "userSharePost") {
        return {
          postType: "userSharePost",
          userSharePost: post as UserSharePost,
        };
      }

      if (postType === "oPagePost") {
        return {
          postType: "oPagePost",
          oPagePost: post as OPagePost,
        };
      }
      if (postType === "pageSharePost") {
        return {
          postType: "pageSharePost",
          pageSharePost: post as PageSharePost,
        };
      }
      if (postType === "oGroupPost") {
        return {
          postType: "oGroupPost",
          oGroupPost: post as OGroupPost,
        };
      }

      if (postType === "toGroupSharedPost") {
        return {
          postType: "toGroupSharedPost",
          toGroupSharedPost: post as ToGroupSharedPost,
        };
      }
    },
    [postType]
  );

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
        });
        dispatch(fetchingPostSucceed(getAppropriatePost(response.data)));
        dispatch(fetchingPost(false));
      } catch {
        dispatch(
          fetchingPostFaild({
            hasError: true,
            error: "Error while fetching posts",
          })
        );
      }
    };
    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [dispatch, url, getAppropriatePost]);

  return {
    loading: currentPostShown!.loading,
    error: {
      hasError: currentPostShown!.hasError,
      error: currentPostShown!.error,
    },

    type: currentPostShown!.postType,
    currentPost: currentPostShown!.post,
  };
};
