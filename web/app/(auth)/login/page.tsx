"use client";
import Link from "next/link";
import Image from "next/image";
import authlogo from "@/public/images/auth.svg";

const LoginPage = () => {
  return (
    <div className="pt-4">
      <div className="mx-auto w-1/3 border border-solid border-blue-600 rounded-2xl">
        <h2 className="text-center text-3xl font-bold mt-5 text-blue-600">
          Login
        </h2>
        <div className="flex justify-center">
          <Image src={authlogo} alt="auth logo" />
        </div>
        <form className="px-14 py-4 text-sm">
          <div className="mb-4">
            <label htmlFor="user" className="block mb-1 font-semibold">
              Username/Email
            </label>
            <input
              type="text"
              id="user"
              placeholder="Enter your username or email"
              className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="mt-8 mb-4">
            <button className="px-5 py-2 w-full border rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700">
              Login
            </button>
          </div>
          <p className=" text-gray-800 ">
            Don&apos;t have an account
            <Link
              href="/signup"
              className="px-2 py-1 ms-2 border rounded-md font-semibold bg-gray-200 text-blue-700 hover:bg-gray-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
