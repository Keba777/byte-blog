"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorAlert from "./ErrorAlert";
import { useLoginUserMutation } from "@/store/features/auth";
import { setUser, setError, setLoading } from "@/store/slices/authSlice";
import UserCredential, {
  CredentialValidationSchema,
} from "@/types/auth/userCredential";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const dispatch = useDispatch();

  const [formError, setFormError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    router.push("/");
  }

  const onSubmit = async (data: UserCredential) => {
    try {
      dispatch(setLoading(true));
      const res = await loginUser(data);

      if ("error" in res) {
        if ("status" in res.error) {
          let errorData = res.error.data as { message: string };
          dispatch(setError(errorData.message));
        } else {
          dispatch(setError(res.error.message!));
        }
      } else {
        const user = res.data;
        dispatch(setUser(user));
        console.log("Login successful.", user);

        reset();
        router.push("/");
      }
    } catch (error: any) {
      dispatch(setError(error.message || "An error occurred during login"));
    } finally {
      dispatch(setLoading(false));
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
