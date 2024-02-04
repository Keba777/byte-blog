"use client";

import Link from "next/link";
import { useGetBlogsQuery } from "@/store/features/blog";

const BlogPage = () => {
  let { data: blogs, error, isLoading } = useGetBlogsQuery();
  return (
    <div>
      <div>
        {blogs?.map((blog) => (
          <div key={blog._id}>
            <div>
              <h1>{blog.title}</h1>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2">
        <Link href="/blogs/new">New Blog</Link>
      </button>
    </div>
  );
};

export default BlogPage;
