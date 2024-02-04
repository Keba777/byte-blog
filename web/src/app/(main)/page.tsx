"use client";

import BlogCard from "@/components/blog/BlogCard";
import Hero from "@/components/common/Hero";
import { useGetBlogsQuery } from "@/store/features/blog";

export default function Home() {
  let { data: blogs, error, isLoading } = useGetBlogsQuery();
  return (
    <div>
      <Hero />
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {blogs?.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              classes="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
