"use client";
import { State } from "@/app/actions/react/types";
import { ReactionType } from "@/app/generated/prisma";
import Image from "next/image";
import { useActionState } from "react";

export default function ReactA({
  actionOn,
}: {
  actionOn: (
    reactionType: ReactionType,
    prevState: State | undefined
  ) => Promise<State> | undefined;
}) {
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
