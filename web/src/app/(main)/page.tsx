"use client";

import { useGetBlogsQuery } from "@/store/features/blog";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function Home() {
  let { data: blogs, error, isLoading } = useGetBlogsQuery();
  return (
    <div>
      {blogs?.map((blog) => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
          <p>tags: {blog.tags}</p>
          <p>Likes: {blog.likes}</p>
          <Image src={blog.image} alt={blog.title} width={400} height={400} />
          {/* <p>{blog.updateAt..toDateString()}</p> */}
        </div>
      ))}
    </div>
  );
}
