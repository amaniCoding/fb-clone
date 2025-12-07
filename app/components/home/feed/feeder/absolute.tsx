import { FaFacebookMessenger, FaUserFriends } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import Image from "next/image";
export default function Absolute() {
  return (
    <div
      className={
        "absolute group-hover:block hidden w-96 z-10  -left-32 rounded-lg  p-4  bg-white shadow-lg"
      }
    >
      <div className="flex space-x-3">
        <Image
          unoptimized
          className="w-20 h-20 rounded-full  object-cover"
          alt="Amanuel Ferede"
          src={"/users/2.jpg"}
          width={0}
          height={0}
          sizes="100vh"
        />

        <div className=" flex-col space-y-2 flex-1 mt-3">
          <p className="text-lg font-bold">Amanuel Ferede</p>
          <p className="">Lives in AddisAbaba Ethiopia </p>
          <p>Studid Civil Engineering at BahirDar University</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-3">
        <button className="px-3 grow py-1.5 bg-gray-400 text-white flex space-x-2 items-center justify-center rounded-md">
          <FaUserFriends className="w-4 h-4" />
          <span>Friends</span>
        </button>
        <button className="px-3 grow py-1.5 bg-blue-600 text-white flex space-x-2 items-center justify-center rounded-md">
          <FaFacebookMessenger className="fill-white w-4 h-4" />
          <span>Message</span>
        </button>
        <button className="p-3 bg-gray-400 text-white flex space-x-2 items-center rounded-md">
          <IoIosMore className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
