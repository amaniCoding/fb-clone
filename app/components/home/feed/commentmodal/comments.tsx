"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import { useFetchComments } from "@/app/hooks/commentsModal/comments";
import { useCommentsLastNodeRef } from "@/app/hooks/commentsModal/lastnoderef/comments";

import Image from "next/image";
import Link from "next/link";

export default function Comments() {
  const { loading, comments, error, page, totalPages } = useFetchComments();
  const hasMore = page! <= totalPages!;
  const lastCommentElementRef = useCommentsLastNodeRef(
    hasMore,
    loading!,
    page!
  );

  return (
    <div className="overflow-y-auto socrollabar h-auto relative">
      <div className="px-6 py-2 ">
        <p> {page}</p>
        {comments!.map((co, index) => {
          const newRxn = co._gReactions
            ? [...co._gReactions].sort((a, b) => b.count - a.count)
            : [];
          const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
          return (
            <div
              className="flex flex-row mb-3 space-x-3 pb-2"
              key={index}
              ref={
                comments!.length === index + 1 ? lastCommentElementRef : null
              }
            >
              <p> {co.reactions.length}</p>
              <Link href={"/#"} className="flex-none">
                {co.user.Profile?.profilePicture ? (
                  <Image
                    unoptimized
                    alt={`${co.user.firstName.substring(0, 2)}`}
                    src={co.user.Profile?.profilePicture}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                ) : null}
              </Link>

              <div className="flex flex-col space-y-1">
                <div className="bg-gray-200 p-2 rounded-xl flex flex-col">
                  <p>
                    {co.user.firstName} {co.user.lastName}
                  </p>
                  <p>{co.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-black/40 text-sm font-semibold">
                    <p>2hrs</p>
                    <p>Like</p>
                    <p>Reply</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {co.reactions.length}
                    <div className="flex items-center -space-x-1">
                      {newRxn_x.map((rxn, index) => (
                        <Image
                          key={index}
                          alt=""
                          src={rxn.reactionType}
                          width={0}
                          height={0}
                          sizes="100vh"
                          className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {loading ? loading === true && <CommentsSkeleton /> : null}
        {error && error !== "" && <p>Error loading comments</p>}
      </div>
    </div>
  );
}
