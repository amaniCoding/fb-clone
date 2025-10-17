"use client";
import { login } from "@/app/actions/auth/signin";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction, isPending] = useActionState(login, undefined);
  return (
    <div className="md:mt-36 md:max-w-5xl w-full mx-auto">
      <div className="w-full grid md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-2 justify-center md:m-0 m-4">
          <p className="text-6xl font-bold text-blue-600">Facebook</p>
          <p className="text-3xl">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
        <div className="flex md:justify-center">
          <div className="bg-white shadow-lg p-5 md:w-5/6 w-full rounded-lg">
            <div>
              <p className="my-2 text-sm text-red-700">{state}</p>
              <form action={formAction} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="email"
                  placeholder="Email or phone number"
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-0 focus:border focus:border-blue-500"
                ></input>

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-0 focus:border focus:border-blue-500"
                ></input>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-lg"
                >
                  Login
                </button>
              </form>
              <div className="flex flex-col gap-3 my-2">
                <p className=" text-center">Forgot password?</p>
                <p className="text-center w-full border-b border-b-gray-100"></p>
              </div>
              <div className="flex justify-center">
                <Link
                  href={"/register"}
                  className="hover:bg-green-500 text-center block w-1/2 p-3 bg-green-600 text-white rounded-lg"
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
