import { Blog } from "@/types/blog/blog";
import userAvatar from "../../../public/images/user.png";
import Image from "next/image";
import Markdown from "react-markdown";

interface Props {
  blog: Blog;
}

const BlogDetail = ({ blog }: Props) => {
  return (
    <div className="flex">
      <div className="pr-3 py-10 mt-10 ">
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
        <div className="px-3 py-10  flex flex-col items-center">
          <h2 className="text-dark-light text-xl font-semibold mb-3">Tags</h2>
          {blog.tags.map((tag) => (
            <p
              key={tag}
              className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 mb-2 text-primary font-semibold"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className="my-7 px-5 border-l border-r">
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
    </div>
  );
};
export default BlogDetail;
