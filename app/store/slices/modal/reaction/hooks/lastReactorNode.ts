import { useCallback, useRef } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { useFetchReactors } from "./body";
import { updatePage } from "../reaction";

export const useLastReactorNodeRef = () => {
  const { loading, page, totalPages } = useFetchReactors();
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
          dispatch(updatePage(newPage));
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );

  return lastCommentNodeRef;
};
