"use client";

import BlogCard from "@/components/blog/BlogCard";
import BlogCardSkeleton from "@/components/blog/BlogCardSkeleton";
import ErrorMessage from "@/components/blog/ErrorMessage";
import Hero from "@/components/common/Hero";
import { useGetBlogsQuery } from "@/store/features/blog";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  let { data: blogs, error, isLoading } = useGetBlogsQuery();
  return (
    <div>
      <Hero />
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <BlogCardSkeleton
                key={index}
                classes="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : error ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : (
            blogs?.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                classes="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        <button className="mx-auto  font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
          <Link href="/blogs" className="flex items-center gap-x-2 hover:gap-x-3">
            <span>More articles</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </button>
      </section>
    </div>
  );
}
