import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, BlogForm } from "@/types/blog/blog";
import { RootState } from "@/store";

const blogApi = createApi({
  reducerPath: "blog-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://byte-blog-api.onrender.com/api",
    prepareHeaders: (headers, { getState }) => {
      const state: RootState = getState() as RootState;
      const token = state.auth.user?.token;

      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    postBlog: build.mutation<BlogForm, FormData>({
      query: (body) => ({
        url: "blogs",
        method: "POST",
        body,
      }),
    }),

    getBlogs: build.query<Blog[], void>({
      query: () => "blogs",
    }),

    getBlogById: build.query<Blog, string>({
      query: (id) => `blogs/${id}`,
    }),

    updateBlog: build.mutation<Blog, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteBlog: build.mutation<void, string>({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePostBlogMutation,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

export default blogApi;
