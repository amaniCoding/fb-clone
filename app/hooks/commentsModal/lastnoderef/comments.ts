import { useCallback, useRef } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { updatePageForComments } from "@/app/store/slices/modal/comment";

export const useCommentsLastNodeRef = (
  hasMore: boolean,
  loading: boolean,
  page: number
) => {
  const observer = useRef<IntersectionObserver>(null);
  const dispatch = useAppDispatch();
  const lastCommentNodeRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          console.log(newPage);
          dispatch(updatePageForComments(newPage));
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );

  return lastCommentNodeRef;
};
