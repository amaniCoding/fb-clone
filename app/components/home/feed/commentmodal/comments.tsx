"use client";
import CommentsSkeleton from "@/app/components/skeletons/comment";
import { useFetchComments } from "@/app/hooks/commentsModal/comments";
import { useCommentsLastNodeRef } from "@/app/hooks/commentsModal/lastnoderef/comments";

import Image from "next/image";
import Link from "next/link";

export default function Comments() {
  const {
    post,
    comment: {
      loading,
      comments,
      error: { error, hasError },
      page,
      totalPages,
    },
  } = useFetchComments();
  const hasMore = page! <= totalPages!;
  const lastCommentElementRef = useCommentsLastNodeRef(
    hasMore,
    loading!,
    page!
  );

  return (
    <div className="relative">
      <div className="px-3.5 py-2 ">
        <p className="my-2"> pageTemp {page}</p>
        {comments!.map((co, index) => {
          const newRxn = co._gReactions
            ? [...co._gReactions].sort((a, b) => b.count - a.count)
            : [];
          const newRxn_x = newRxn.length > 3 ? newRxn.slice(0, 3) : newRxn;
          return (
            <div className="flex flex-col">
              <div
                className="flex flex-row space-x-3 bg-yellow-300"
                key={index}
                ref={
                  comments!.length === index + 1 ? lastCommentElementRef : null
                }
              >
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
                  <div className="bg-gray-100 p-2 rounded-xl flex flex-col">
                    <p>
                      {co.user.firstName} {co.user.lastName}
                    </p>
                    {co.content && <p>{co.content}</p>}
                    {co.mediaUrl ? (
                      <Image
                        key={index}
                        alt=""
                        src={co.mediaUrl}
                        width={0}
                        height={0}
                        sizes="100vh"
                        className="cursor-pointer w-52 object-cover block flex-none"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between space-x-5">
                    <div className="flex items-center space-x-2 text-black/40 text-sm font-semibold">
                      <p>2hrs</p>
                      <p>Like</p>
                      <p>Reply</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-500">{co._count.reactions}</p>

                      <div className="flex items-center -space-x-1.5">
                        {newRxn_x.map((rxn, index) =>
                          rxn.reactionType ? (
                            <Image
                              key={index}
                              alt=""
                              src={`/reactions/${rxn.reactionType}.png`}
                              width={0}
                              height={0}
                              sizes="100vh"
                              className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                            />
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="my-1.5 text-gray-500">
                View all {co._count.replies} replies
              </p>
            </div>
          );
        })}
        {loading! && !post.loading! && <CommentsSkeleton />}
        {hasError && <p>{error}</p>}
      </div>
    </div>
  );
}
