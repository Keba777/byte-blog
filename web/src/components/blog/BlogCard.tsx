import { Blog } from "@/types/blog/blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import userAvatar from "../../../public/images/user.png";

interface Props {
  blog: Blog;
  classes: string;
}

const BlogCard = ({ blog, classes }: Props) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${classes}`}
    >
      <Link href={`/blogs/${blog._id}`}>
        <Image
          src={blog.image}
          alt="title"
          width={520}
          height={480}
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link href={`/blogs/${blog._id}`}>
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            {blog.title}
          </h2>
          {/* <p className="text-dark-light mt-3 text-sm md:text-lg">
            {blog.author.username}
          </p> */}
        </Link>
      </div>
      <div className="flex justify-between flex-nowrap items-center my-5 mx-5">
        <div className="flex items-center gap-x-2 md:gap-x-2.5">
          <Image
            src={blog.author.profilePicture || userAvatar}
            alt="post profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            width={400}
            height={400}
          />

          <div className="flex flex-col mx-2">
            <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
              {blog.author.username}
            </h4>
          </div>
        </div>
        <span className="font-bold text-dark-light italic text-sm md:text-base">
          {new Date(blog.updatedAt).getDate()}{" "}
          {new Date(blog.updatedAt).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      {/* <div className="left-0 right-0 flex justify-center p-3 border-t bg-red-400">
          <Like />
        </div> */}
    </div>
  );
};

export default BlogCard;
