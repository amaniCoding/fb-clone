"use client";
import { State } from "@/app/hooks/react/usereact";
import Image from "next/image";
import { useActionState } from "react";

export default function ReactAPost({
  reactAction,
}: {
  reactAction: (prevState: State) => Promise<State>;
}) {
  const initialState: State = {
    _gReactions: undefined,
    message: undefined,
    reactionType: undefined,
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    reactAction,
    initialState
  );

  return (
    <form>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/like.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/love.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/care.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/haha.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/wow.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
        <Image
          alt=""
          src={"/reactions/sad.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={formAction}>
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
