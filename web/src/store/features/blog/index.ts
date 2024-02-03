import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, BlogForm } from "@/types/blog/blog";

const blogApi = createApi({
  reducerPath: "blog-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
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
