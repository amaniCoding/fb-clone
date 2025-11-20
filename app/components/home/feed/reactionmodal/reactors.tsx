import { ReactionType } from "@/app/generated/prisma";
import Image from "next/image";
export default function Reactors({
  reactors,
}: {
  reactors:
    | {
        feedId: string;
        postId: string | undefined;
        postType: string;
        user: {
          firstName: string;
          lastName: string;
          Profile: {
            profilePicture: string | null;
          } | null;
        };
        reactionType: ReactionType;
      }[]
    | undefined;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full relative">
        {reactors!.map((r) => {
          return r.user.Profile?.profilePicture ? (
            <>
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
                className="w-full h-full object-cover absolute bottom-1 right-1"
              />
            </>
          ) : null;
        })}

        <div className=""></div>
      </div>
    </div>
  );
}
