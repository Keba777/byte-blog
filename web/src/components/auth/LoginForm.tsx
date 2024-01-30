"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorAlert from "./ErrorAlert";
import { useLoginUserMutation } from "@/store/features/auth";
import UserCredential, {
  CredentialValidationSchema,
} from "@/types/auth/userCredential";
import { useState } from "react";
import Cookies from "js-cookie";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCredential>({
    resolver: yupResolver(CredentialValidationSchema),
  });
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const onSubmit = async (data: UserCredential) => {
    let res = await loginUser(data);
    if ("error" in res) {
      if ("status" in res.error) {
        let errorData = res.error.data as { message: string };
        setFormError(errorData.message);
      } else {
        setFormError(res.error.message!);
      }
    } else {
      console.log("Login successful.", res.data);
      Cookies.set("user", JSON.stringify(res.data), {
        expires: 7,
        path: "/",
        sameSite: "none",
        secure: true,
      });
      reset();
      router.push("/");
    }
  };

  return (
    <>
      <form className="px-14 py-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="user" className="block mb-1 font-semibold">
            Username/Email
          </label>
          <input
            {...register("identifier")}
            type="text"
            id="user"
            placeholder="Enter your username or email"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.identifier && (
            <p className="text-red-600">{errors.identifier.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="px-5 py-2 w-full border rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
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
      {formError && (
        <ErrorAlert error={formError} onClick={() => setFormError("")} />
      )}
    </>
  );
};

export default LoginForm;
