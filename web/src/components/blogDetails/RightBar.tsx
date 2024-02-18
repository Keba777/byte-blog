import { Blog } from "@/types/blog/blog";
import Image from "next/image";

interface Props {
  blogs?: Blog[];
}

const RightBar = ({ blogs }: Props) => {
  return (
    <div className="my-8">
      <h2 className="text-dark-soft text-2xl font-bold mb-3">
        Latest Articles
      </h2>
      {blogs?.map((blog) => (
        <div key={blog._id} className="flex mb-3">
          <Image
            src={blog.image}
            alt="Blog image"
            height={300}
            width={300}
            className="w-10 h-10 rounded mr-2"
          />
          <h2 className="text-dark-light hover:text-dark-soft">{blog.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default RightBar;
