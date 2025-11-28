import { useAppSelector } from "../../store/hooks";

const useReplies = (commentId: string) => {
  // when i request reply the reference will not be changed
  const refId = useAppSelector(
    (state) => state.commentModal.currentReplyRef?.refId
  );

  const repliesShown = useAppSelector(
    (state) => state.commentModal.currentReplyRef!.repliesShown
  );

  const currentReplyRef = repliesShown!.find((cs) => {
    return cs.refId === refId;
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
