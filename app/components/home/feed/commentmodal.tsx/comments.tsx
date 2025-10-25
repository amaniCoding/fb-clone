"use client";
import { Comment } from "@/app/apis/comments/[posttype]/[postid]/[page]/lib";
import FeedItemSkeleton from "@/app/components/skeletons/feed";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setComment_Comment,
  setError_Comment,
  setLoading_Comment,
  setNetWorkError,
  setPage_Comment,
} from "@/app/store/slices/feed/feed";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
export default function Comments() {
  const dispatch = useAppDispatch();
  const networkNotification = useAppSelector(
    (state) => state.feed.network.showNumber
  );

  const feedToRefer = useAppSelector((state) => state.feed.feeds.feeds);
  const currentPost = useAppSelector((state) => state.feed.commentModal.post);
  const postId = currentPost?.id;
  const postType = currentPost?.postType;

  const tepmFeed = feedToRefer?.find(
    (feed) => feed.id === postId && feed.postType === postType
  );
  const page = tepmFeed?._comments.page;
  const loading = tepmFeed?._comments.loading;
  const error = tepmFeed?._comments.error;
  const totalPages = tepmFeed?._comments.totalPages;
  const comments = tepmFeed?._comments.commentors;

  const [hasError, setHasError] = useState<boolean>(false);
  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);
  const observer = useRef<IntersectionObserver>(null);

  const hasMore = page! <= totalPages!;

  const lastCommentElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page! + 1;
          dispatch(
            setPage_Comment({
              newPage,
              postId: postId,
              postType: postType,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );
  useEffect(() => {
    const controller = new AbortController();
    const getComments = async () => {
      try {
        dispatch(
          setLoading_Comment({
            newLoading: true,
            postId: postId,
            postType: postType,
          })
        );
        const response = await axios.get(
          `/apis/comments/${postType!}/${postId!}/${page!}`,
          {
            signal: controller.signal,
          }
        );
        dispatch(
          setComment_Comment({
            newComments: response.data.result as Comment,
            postId,
            postType,
          })
        );

        dispatch(
          setLoading_Comment({
            newLoading: true,
            postId: postId,
            postType: postType,
          })
        );
      } catch (error) {
        setHasError(true);
        dispatch(
          setError_Comment({
            newError: "Error",
            postId: postId,
            postType: postType,
          })
        );
      }
    };

    if (isOnLine) {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "Your internet connection was restored",
          showNumber: networkNotification + 1,
        })
      );

      getComments();
    } else {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "You are currently offline",
          showNumber: networkNotification + 1,
        })
      );
    }
    window.addEventListener("online", () => {
      setIsOnLine(true);
    });
    window.addEventListener("offline", () => {
      setIsOnLine(false);
    });

    return () => {
      window.removeEventListener("online", () => {
        setIsOnLine(true);
      });
      window.removeEventListener("offline", () => {
        setIsOnLine(false);
      });
      controller.abort();
    };
  }, [dispatch, isOnLine, page]);
  return (
    <div className="overflow-y-auto socrollabar h-auto relative">
      {loading && <FeedItemSkeleton />}
      <div className="px-6 py-2 ">
        {comments!.map((co, index) => (
          <div
            className="flex flex-row mb-3 space-x-3 pb-2"
            key={co.id}
            ref={comments!.length === index + 1 ? lastCommentElementRef : null}
          >
            <Link href={"/#"}>
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={"/users/7.jpg"}
                width={0}
                height={0}
                sizes="100vh"
                className="w-8 h-8 object-cover rounded-full"
              />
            </Link>

            <div className="p-3 bg-gray-100 rounded-xlf flex flex-col space-y-1 ">
              <p className="font-semibold">Amanuel Ferede</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, autem. Ipsam, itaque reprehenderit. Facere dolorum eos
                temporibus sequi minima odit quisquam id, qui laboriosam.
                Inventore dicta nemo odit nostrum cum.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 pl-3">
                  <span className="text-sm">2hrs</span>
                  <span className="text-sm">Like</span>
                  <span className="text-sm">Reply</span>
                </div>
                <div className="-space-x-1">
                  <Image
                    key={index}
                    alt=""
                    src={`/reactions/haha.png`}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                  />
                  <Image
                    key={index}
                    alt=""
                    src={`/reactions/like.png`}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                  />
                  <Image
                    key={index}
                    alt=""
                    src={`/reactions/love.png`}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="cursor-pointer w-6 h-6 object-cover rounded-full block flex-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
