"use client";

import User, { UserValidationSchema } from "@/types/auth/user";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ErrorAlert from "./ErrorAlert";
import { useRegisterUserMutation } from "@/store/features/auth";
import { useState } from "react";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(UserValidationSchema),
  });

  const [registerUser, { isLoading, error, isError }] =
    useRegisterUserMutation();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const onSubmit = async (data: User) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profilePicture && data.profilePicture[0])
      formData.append("profilePicture", data.profilePicture[0]);

    let res = await registerUser(formData);
    if ("error" in res) {
      if ("status" in res.error) {
        let errorData = res.error.data as { message: string };
        setFormError(errorData.message);
      } else {
        setFormError(res.error.message!);
      }
    } else {
      console.log("Registration successful.", res.data);
      reset();
      router.push("/login");
    }
  };

  return (
    <>
      <form className="px-14 py-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-semibold">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
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
        <div className="mb-4">
          <label htmlFor="image" className="block mb-1 font-semibold">
            Profile Picture
          </label>
          <input
            {...register("profilePicture")}
            type="file"
            id="image"
            accept="image/*"
          />
          {errors.profilePicture && (
            <p className="text-red-600">{errors.profilePicture.message}</p>
          )}
        </div>
        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="px-5 py-2 w-full border rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            Signup
          </button>
        </div>
        <p className=" text-gray-800 ">
          Already have an account
          <Link
            href="/login"
            className="px-2 py-1 ms-2 border rounded-md font-semibold bg-gray-200 text-blue-700 hover:bg-gray-300"
          >
            Login
          </Link>
        </p>
      </form>
      {formError && (
        <ErrorAlert error={formError} onClick={() => setFormError("")} />
      )}
    </>
  );
};

export default SignupForm;
