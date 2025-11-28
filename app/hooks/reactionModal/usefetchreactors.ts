import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";

import axios from "axios";
import {
  fetchingGReactions,
  fetchGReactionsSsucceed,
  GReactionsResponseType,
  fetchGReactionsFailed,
} from "@/app/store/slices/modal/reaction/reaction";

export const useFetchReactors = () => {
  const refId = useAppSelector((state) => state.reactionModal.refId);
  const reactionsData = useAppSelector(
    (state) => state.reactionModal.reactionsData
  );
  const tempUrl = useAppSelector((state) => state.reactionModal.starterBodyUrl);
  const currRef = reactionsData.find((rd) => {
    return rd.refId === refId;
  });

  const { isOnline } = useAppSelector((state) => state.app.network);
  const currentReactionType = currRef?.header?.currentReaction;
  const currReactorRef = currRef?.body?.find((b) => {
    return b.reactionType === currentReactionType;
  });
  const loading = currReactorRef?.loading;
  const error = currReactorRef?.error;
  const reactors = currReactorRef?.reactors;
  const page = currReactorRef?.page;
  const totalPages = currReactorRef?.totalPages;
  const totalRows = currReactorRef?.totalRows;
  const fullUrl = `${tempUrl}/${page}`;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const getReactors = async () => {
      try {
        dispatch(fetchingGReactions(true));
        const response = await axios.get(fullUrl, {
          signal: controller.signal,
        });
        dispatch(
          fetchGReactionsSsucceed(
            response.data.result as GReactionsResponseType
          )
        );
        dispatch(fetchingGReactions(false));
      } catch (error) {
        dispatch(fetchGReactionsFailed("Something went wrong"));
        dispatch(fetchingGReactions(false));
      }
    };

    if (isOnline) {
      getReactors();
    }
    return () => {
      controller.abort();
    };
  }, [dispatch, isOnline]);

  return {
    loading,
    error,
    reactors,
    totalPages,
    totalRows,
    page,
  };
};
