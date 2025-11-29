"use client";
import { PostType, ReactionType } from "@/app/generated/prisma";
import { State } from "@/app/hooks/react/usereact";
import Image from "next/image";
import { useActionState, useTransition } from "react";

export default function ReactAPost({
  reactAction,
  feedId,
  postType,
}: {
  reactAction: (reactionType: ReactionType) => Promise<State>;
  postType: PostType;
  feedId: string;
}) {
  const handleClick = (reactionType: ReactionType) => {
    startTransition(async () => {
      const result = await reactAction.bind(null, reactionType)();
    });
  };
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <button
        formAction={() => {
          handleClick("like");
        }}
      >
        <Image
          alt=""
          src={"/reactions/like.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/love.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/care.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/haha.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/wow.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/sad.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
      <button formAction={() => {}}>
        <Image
          alt=""
          src={"/reactions/angry.png"}
          width={0}
          height={0}
          sizes="100vh"
          className="cursor-pointer w-12 h-12 object-cover rounded-full block flex-none"
        />
      </button>
    </div>
  );
}
