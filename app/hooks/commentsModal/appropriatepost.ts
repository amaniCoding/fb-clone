import { useAppSelector } from "@/app/store/hooks";

export const useAppropriatePost = () => {
  const currentPost = useAppSelector((state) => state.commentModal.currentPost);

  if (currentPost.postType === "oUserPost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.oUserPost,
    };
  }

  if (currentPost.postType === "userSharePost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.userSharePost,
    };
  }
  if (currentPost.postType === "oPagePost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.oPagePost,
    };
  }
  if (currentPost.postType === "pageSharePost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.pageSharePost,
    };
  }

  if (currentPost.postType === "oGroupPost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.oGroupPost,
    };
  }
  if (currentPost.postType === "toGroupSharedPost") {
    return {
      postType: currentPost.postType,
      currentPost: currentPost.toGroupSharedPost,
    };
  }
  return {
    postType: undefined,
    currentPost: undefined,
  };
};
