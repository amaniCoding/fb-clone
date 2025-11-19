import { useCallback, useRef } from "react";
import { useFetchComments } from "../comments";
import { useAppDispatch } from "@/app/store/hooks";
import { updateRepliesPage } from "@/app/store/slices/modal/comment";

export const useCommentsLastNodeRef = () => {
  const { loading, page, totalPages } = useFetchComments();
  const hasMore = page! <= totalPages!;

  const observer = useRef<IntersectionObserver>(null);
  const dispatch = useAppDispatch();
  const lastCommentNodeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page! + 1;
          dispatch(updateRepliesPage(newPage));
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );

  return lastCommentNodeRef;
};
