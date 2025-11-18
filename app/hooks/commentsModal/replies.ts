import { useAppSelector } from "../../store/hooks";

const useReplies = (commentId: string) => {
  // when i request reply the reference will not be changed
  const refId = useAppSelector((state) => state.commentModal.id);

  const commentsShown = useAppSelector(
    (state) => state.commentModal.commentsShown
  );

  const currentRef = commentsShown.find((cs) => {
    return cs.id === refId;
  });

  const currentReplyRef = currentRef?.replies?.find((rep) => {
    return rep.commentid === commentId;
  });

  const loading = currentReplyRef?.loading;
  const page = currentReplyRef?.page;
  const error = currentReplyRef?.error;
  const replies = currentReplyRef?.replies;

  return {
    loading,
    page,
    error,
    replies,
  };
};
