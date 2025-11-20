import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";
import {
  fetchGReactionsFailed,
  fetchGReactionsSsucceed,
  fetchingGReactions,
  GReactionsResponseType,
} from "../reaction";
import axios from "axios";

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
    const getFeeds = async () => {
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
      } catch (error) {
        dispatch(fetchGReactionsFailed("Something went wrong"));
        dispatch(fetchingGReactions(false));
      }
    };

    if (isOnline) {
      getFeeds();
    }
    return () => {
      controller.abort();
    };
  }, [dispatch, isOnline]);

  return {
    loading,
    error,
    gReactions,
  };
};
