import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";

import axios from "axios";
import {
  fetchingGReactions,
  fetchGReactionsSsucceed,
  GReactionsResponseType,
  fetchGReactionsFailed,
} from "@/app/store/slices/modal/reaction";

export const useFetchHeaderGreactions = () => {
  const refId = useAppSelector((state) => state.reactionModal.refId);
  const reactionsData = useAppSelector(
    (state) => state.reactionModal.reactionsData
  );
  const url = useAppSelector((state) => state.reactionModal.starterHeaderUrl);
  const currRef = reactionsData.find((rd) => {
    return rd.refId === refId;
  });

  const { isOnline } = useAppSelector((state) => state.app.network);

  const loading = currRef?.header?.loading;
  const error = currRef?.header?.error;
  const gReactions = currRef?.header?.gReactions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const getGreactions = async () => {
      try {
        dispatch(fetchingGReactions(true));
        const response = await axios.get(url, {
          signal: controller.signal,
        });
        dispatch(
          fetchGReactionsSsucceed(
            response.data.result as GReactionsResponseType
          )
        );
        dispatch(fetchingGReactions(false));
      } catch {
        dispatch(fetchGReactionsFailed("Something went wrong"));
        dispatch(fetchingGReactions(false));
      }
    };

    if (isOnline) {
      getGreactions();
    }
    return () => {
      controller.abort();
    };
  }, [dispatch, isOnline, url]);

  return {
    loading,
    error,
    gReactions,
  };
};
