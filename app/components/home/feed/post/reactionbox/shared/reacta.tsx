/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { State } from "@/app/actions/react/types";
import { updateFeedWithReact } from "@/app/store/slices/feed/feed";
import { ReactionType, PostType } from "@/app/generated/prisma/client";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ReactA({
  actionOn,
  feedId,
  postType,
}: {
  actionOn: (
    reactionType: ReactionType,
    prevState: State | undefined
  ) => Promise<State | undefined>;
  feedId: string | undefined;
  postType: PostType | undefined;
}) {
  const dispatch = useDispatch();
  const initialState: State = {
    _gReactions: undefined,
    message: undefined,
    reactionType: undefined,
    success: false,
  };

  const reactWithLike = actionOn.bind(null, "like" as ReactionType);
  const [stateLike, formActionLike, isPendingLike] = useActionState(
    reactWithLike,
    initialState,
    undefined
  );

  const reactWithLove = actionOn.bind(null, "love" as ReactionType);
  const [stateLove, formActionLove, isPendingLove] = useActionState(
    reactWithLove,
    initialState,
    undefined
  );

  const reactWithCare = actionOn.bind(null, "care" as ReactionType);
  const [stateCare, formActionCare, isPendingCare] = useActionState(
    reactWithCare,
    initialState,
    undefined
  );

  const reactWithHaha = actionOn.bind(null, "haha" as ReactionType);
  const [stateHaha, formActionHaha, isPendingHaha] = useActionState(
    reactWithHaha,
    initialState,
    undefined
  );

  const reactWithWow = actionOn.bind(null, "wow" as ReactionType);
  const [stateWow, formActionWow, isPendingWow] = useActionState(
    reactWithWow,
    initialState,
    undefined
  );

  const reactWithSad = actionOn.bind(null, "sad" as ReactionType);
  const [stateSad, formActionSad, isPendingSad] = useActionState(
    reactWithSad,
    initialState,
    undefined
  );

  const reactWithAngry = actionOn.bind(null, "angry" as ReactionType);
  const [stateAngry, formActionAngry, isPendingAngry] = useActionState(
    reactWithAngry,
    initialState,
    undefined
  );

  useEffect(() => {
    if (stateLike?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateLike?._gReactions,
          reactionType: stateLike?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateLike?._gReactions,
    stateLike?.reactionType,
    stateLike?.success,
  ]);

  useEffect(() => {
    if (stateLove?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateLove?._gReactions,
          reactionType: stateLove?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateLove?._gReactions,
    stateLove?.reactionType,
    stateLove?.success,
  ]);
  useEffect(() => {
    if (stateCare?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateCare?._gReactions,
          reactionType: stateCare?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateCare?._gReactions,
    stateCare?.reactionType,
    stateCare?.success,
  ]);

  useEffect(() => {
    if (stateHaha?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateHaha?._gReactions,
          reactionType: stateHaha?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateHaha?._gReactions,
    stateHaha?.reactionType,
    stateHaha?.success,
  ]);

  useEffect(() => {
    if (stateWow?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateWow?._gReactions,
          reactionType: stateWow?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateWow?._gReactions,
    stateWow?.reactionType,
    stateWow?.success,
  ]);

  useEffect(() => {
    if (stateSad?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateSad?._gReactions,
          reactionType: stateSad?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateSad?._gReactions,
    stateSad?.reactionType,
    stateSad?.success,
  ]);

  useEffect(() => {
    if (stateAngry?.success) {
      dispatch(
        updateFeedWithReact({
          gReactions: stateAngry?._gReactions,
          reactionType: stateAngry?.reactionType,
          feedId,
          postType,
        })
      );
    }
  }, [
    dispatch,
    feedId,
    postType,
    stateAngry?._gReactions,
    stateAngry?.reactionType,
    stateAngry?.success,
  ]);

  return (
    <form className="flex items-center">
      <button formAction={formActionLike}>
        <Image
          alt=""
          src={"/reactions/like.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionLove}>
        <Image
          alt=""
          src={"/reactions/love.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionCare}>
        <Image
          alt=""
          src={"/reactions/care.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionHaha}>
        <Image
          alt=""
          src={"/reactions/haha.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionWow}>
        <Image
          alt=""
          src={"/reactions/wow.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionSad}>
        <Image
          alt=""
          src={"/reactions/sad.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formActionAngry}>
        <Image
          alt=""
          src={"/reactions/angry.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
    </form>
  );
}
