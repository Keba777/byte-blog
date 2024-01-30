"use client";

import Image from "next/image";
import authlogo from "../../../../public/images/auth.svg";
import LoginForm from "../../../components/auth/LoginForm";

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
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
