"use client";
import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

export default function MyApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPostBoxOpened = useAppSelector(
    (state) => state.feed.addPost.toShowAddPostModal
  );
  const isCommentBoxOpened = useAppSelector(
    (state) => state.feed.currentPostAction.toShowCommentModal
  );

  const { isOnline, status } = useAppSelector((state) => state.feed.network);

  const [showNetWorkError, setshowNetWorkError] = useState<boolean>(false);
  const timeOutId = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );
  useEffect(() => {
    if (isPostBoxOpened || isCommentBoxOpened) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isCommentBoxOpened, isPostBoxOpened]);

  const closeNotification = () => {
    clearTimeout(timeOutId.current);
    setshowNetWorkError(false);
  };

  useEffect(() => {
    setshowNetWorkError(true);
    const id = setTimeout(() => {
      setshowNetWorkError(false);
    }, 6000);

    timeOutId.current = id;

    return () => {
      clearInterval(id);
    };
  }, [isOnline]);
  return (
    <>
      {showNetWorkError && isOnline && status && (
        <div className="fixed bottom-3 left-3 px-3.5 py-4 bg-slate-800 rounded-lg text-center text-white flex items-center space-x-2">
          <Image
            alt="Amanuel Ferede"
            src={"/net/wireless.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-4 h-4 object-cover"
          />
          <p>{status}</p>
          <Link href={`/`}>Refresh</Link>
        </div>
      )}

      {showNetWorkError && !isOnline && status && (
        <div className="fixed bottom-3 left-3 px-3.5 py-4 bg-slate-800 rounded-lg text-center text-white flex items-center space-x-2">
          <Image
            alt="Amanuel Ferede"
            src={"/net/wifi-slash.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-4 h-4 object-cover"
          />
          <p>{status}</p>
          <Link href={`/`} className="hover:underline hover:text-blue-600">
            Refresh
          </Link>
          <FaXmark
            className="w-4 h-4 bg-gray-600 text-white"
            onClick={closeNotification}
          />
        </div>
      )}
      {children}
    </>
  );
}
