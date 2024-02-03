import User from "@/types/auth/user";
import UserCredential, { LoginResponse } from "@/types/auth/userCredential";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (build) => ({
    registerUser: build.mutation<User, FormData>({
      query: (body) => ({
        url: "users",
        method: "Post",
        body,
      }),
    }),
    loginUser: build.mutation<LoginResponse, UserCredential>({
      query: (body) => ({
        url: "auth",
        method: "Post",
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
export default authApi;
