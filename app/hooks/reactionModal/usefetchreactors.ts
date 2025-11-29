import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";

import axios from "axios";
import {
  fetchingReactors,
  fetchingReactorsSucceed,
  fetchingReactorsFaild,
  ReactorsResponseType,
} from "@/app/store/slices/modal/reaction";

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
        dispatch(fetchingReactors(true));
        const response = await axios.get(fullUrl, {
          signal: controller.signal,
        });
        dispatch(
          fetchingReactorsSucceed(response.data.result as ReactorsResponseType)
        );
        dispatch(fetchingReactors(false));
      } catch (error) {
        dispatch(fetchingReactorsFaild("Something went wrong"));
        dispatch(fetchingReactors(false));
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
