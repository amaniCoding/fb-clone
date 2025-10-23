"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setComments,
  setLoading,
  setPage,
} from "@/app/store/slices/commentmodal/post";
import { setNetWorkError } from "@/app/store/slices/feed/feed";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
export default function Comments() {
  const dispatch = useAppDispatch();
  const networkNotification = useAppSelector(
    (state) => state.feed.network.showNumber
  );
  const postId = useAppSelector((state) => state.commentModal.user.post.id);
  const totalPages = useAppSelector(
    (state) => state.commentModal.user.totalPages
  );
  const commentsData = useAppSelector(
    (state) => state.commentModal.user.comments
  );
  const page = commentsData.find((data) => data.postId === postId)?.page;
  const loading = commentsData.find((data) => data.postId === postId)?.loading;
  const comments = commentsData.find((data) => data.postId === postId)?.data;

  const [hasError, setHasError] = useState<boolean>(false);
  const [isOnLine, setIsOnLine] = useState<boolean>(navigator.onLine);
  const observer = useRef<IntersectionObserver>(null);

  const hasMore = page! >= totalPages;

  const lastCommentElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page! + 1;
          dispatch(
            setPage({
              page: newPage,
              postId: postId,
              postType: "userpost",
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
          setLoading({
            loading: true,
            postId: postId,
            postType: "userpost",
          })
        );
        setHasError(false);
        const response = await axios.get(`/comments/${postId}/${page}`, {
          signal: controller.signal,
        });
        dispatch(
          setComments({
            comments: response.data.comments,
            postId: postId,
            postType: "userpost",
          })
        );
        // dispatch(
        //   updateTotalPagesAndRows({
        //     totalPages: response.data.totalPages,
        //     totalRows: response.data.totalRows,
        //   })
        // );
        dispatch(
          setLoading({
            loading: false,
            postId: postId,
            postType: "userpost",
          })
        );
      } catch (error) {
        setHasError(true);
        dispatch(
          setLoading({
            loading: false,
            postId: postId,
            postType: "userpost",
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
    <div className="overflow-y-auto socrollabar h-96 relative">
      <div className="px-6 py-2 ">
        {comments?.map((comment, index) => (
          <div
            className="flex flex-row mb-3 space-x-3 pb-2"
            key={comment.id}
            ref={comments.length === index + 1 ? lastCommentElementRef : null}
          >
            <div className="relative group flex-none">
              <Link href={"/profile"}>
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
            </div>
            <div className="">
              <div className="p-3 bg-gray-100 rounded-xl ">
                <p className="font-semibold">Amanuel Ferede</p>
                <p>Text comment</p>
              </div>

              <div className="flex space-x-4 pl-3">
                <span className="text-sm"></span>
                <span className="text-sm">Like</span>
                <span className="text-sm">Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
