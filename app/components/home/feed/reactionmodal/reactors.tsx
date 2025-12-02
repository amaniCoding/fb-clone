import { ReactorsType } from "@/app/api/reactions/oGroupPost/body/[postid]/[reactiontype]/[page]/lib";
import { ReactionType } from "@/app/generated/prisma";
import { useLastReactorNodeRef } from "@/app/hooks/reactionModal/uselastnoderef";
import Image from "next/image";
export default function Reactors({
  reactors,
  lastNodeRef,
}: {
  reactors: ReactorsType;
  lastNodeRef: (node: HTMLDivElement) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-7 h-7 rounded-full relative">
        {reactors!.map((r, index) => {
          return r.user.Profile?.profilePicture ? (
            <div
              key={index}
              ref={reactors?.length === index + 1 ? lastNodeRef : null}
            >
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={r.user.Profile?.profilePicture}
                width={0}
                height={0}
                sizes="100vh"
                className="w-full h-full object-cover"
              />
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={`/reactions/${r.reactionType}.png`}
                width={0}
                height={0}
                sizes="100vh"
                className="w-1.5 h-1.5 object-cover absolute bottom-1 right-1"
              />
            </div>
          ) : null;
        })}

        <div className=""></div>
      </div>
    </div>
  );
}
