import { Blog } from "@/types/blog/blog";
import userAvatar from "../../../public/images/user.png";
import Image from "next/image";
import Markdown from "react-markdown";

interface Props {
  blog: Blog;
}

const BlogDetail = ({ blog }: Props) => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-5">{blog.title}</h1>
      <Image
        src={blog.image}
        alt="Blog cover image"
        height={480}
        width={720}
        className="w-full object-cover object-center h-auto mb-3"
      />
      {blog.content.split("  ").map((paragraph, index) => (
        <Markdown key={index} className="mb-2 text-justify ">
          {paragraph}
        </Markdown>
      ))}
    </div>
  );
};
export default BlogDetail;
