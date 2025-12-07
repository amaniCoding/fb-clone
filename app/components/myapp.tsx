"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { setNetWorkError } from "@/app/store/slices/app/app";

export default function MyApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPostModalOpened = useAppSelector(
    (state) => state.addPost.toShowAddPostModal
  );
  const isCommentModalOpened = useAppSelector(
    (state) => state.commentModal.isOpen
  );

  const isReactionModalOpened = useAppSelector(
    (state) => state.reactionModal.isOpen
  );

  const { isOnline, status, showNumber } = useAppSelector(
    (state) => state.app.network
  );
  const networkNotification = useAppSelector(
    (state) => state.app.network.showNumber
  );
  const dispatch = useAppDispatch();

  const [showNetWorkError, setshowNetWorkError] = useState<boolean>(false);
  const timeOutId = useRef<string | number | NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    window.addEventListener("online", () => {
      dispatch(
        setNetWorkError({
          isOnline: true,
          status: "Your internet connection was restored",
          showNumber: networkNotification + 1,
        })
      );
    });
    window.addEventListener("offline", () => {
      dispatch(
        setNetWorkError({
          isOnline: false,
          status: "You are currently offline",
          showNumber: networkNotification + 1,
        })
      );
    });

    return () => {
      window.removeEventListener("online", () => {
        dispatch(
          setNetWorkError({
            isOnline: true,
            status: "Your internet connection was restored",
            showNumber: networkNotification + 1,
          })
        );
      });
      window.removeEventListener("offline", () => {
        dispatch(
          setNetWorkError({
            isOnline: false,
            status: "You are currently offline",
            showNumber: networkNotification + 1,
          })
        );
      });
    };
  }, [dispatch, networkNotification]);
  useEffect(() => {
    if (isPostModalOpened || isCommentModalOpened || isReactionModalOpened) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isPostModalOpened, isCommentModalOpened, isReactionModalOpened]);

  const closeNotification = () => {
    clearTimeout(timeOutId.current);
    setshowNetWorkError(false);
  };

  useEffect(() => {
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
      {showNetWorkError && isOnline && status && showNumber > 1 && (
        <div className="fixed bottom-3 z-30 left-3 px-3.5 py-4 bg-slate-800 rounded-lg text-center text-white flex items-center space-x-2">
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

      {showNetWorkError && !isOnline && status && showNumber > 1 && (
        <div className="fixed bottom-3 z-30 left-3 px-3.5 py-4 bg-slate-800 rounded-lg text-center text-white flex items-center space-x-2">
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
