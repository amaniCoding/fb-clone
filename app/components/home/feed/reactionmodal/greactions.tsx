import { ReactionType } from "@/app/generated/prisma";
import Image from "next/image";
export default function Greactions({
  gReactions,
}: {
  gReactions: {
    reactionType: ReactionType;
    count: number;
  }[];
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full">
        {gReactions.map((gr) => {
          return (
            <Image
              unoptimized
              alt="Amanuel Ferede"
              src={`/reactions/${gr.reactionType}.png`}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover"
            />
          );
        })}
      </div>
    </div>
  );
}
