"use client";

import { useGetBlogByIdQuery } from "@/store/features/blog";
import Image from "next/image";
import Markdown from "react-markdown";
import userAvatar from "../../../../../public/images/user.png";

interface Props {
  params: { id: string };
}

const BlogDetailsPage = ({ params }: Props) => {
  let { data: blog, error, isLoading } = useGetBlogByIdQuery(params.id);

  return (
    <div>
      <section className="container mx-auto relative">
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading blog details </p>}
          {blog && (
            <div className="flex">
              <div className="left-0  fixed px-8 py-10">
                <div className="flex flex-col items-center">
                  <Image
                    src={blog.author.profilePicture || userAvatar}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-2 ml-5"
                    width={520}
                    height={480}
                  />
                  <span className="font-semibold text-blue-900 mt-2">
                    {blog.author.username}
                  </span>
                </div>
              </div>
              <div className="px-12 py-5 my-2 mx-[72px] border-l-2 border-r-2">
                <h1 className="text-4xl font-bold mb-5">{blog.title}</h1>
                <Image
                  src={blog.image}
                  alt="Blog cover image"
                  height={480}
                  width={720}
                  className="w-full object-cover object-center h-auto "
                />
                {blog.content.split("  ").map((paragraph, index) => (
                  <Markdown key={index} className="mb-2 text-justify text-lg">
                    {paragraph}
                  </Markdown>
                ))}
              </div>
              <div className="px-10 py-10 right-0 fixed flex flex-col items-center">
                <h2 className="text-dark-light text-xl font-semibold mb-3">
                  Tags
                </h2>
                {blog.tags.map((tag) => (
                  <p
                    key={tag}
                    className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold"
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
