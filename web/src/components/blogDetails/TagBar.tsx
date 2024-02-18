import { Blog } from "@/types/blog/blog";

interface Props {
  blog?: Blog;
}

const TagBar = ({ blog }: Props) => {
  return (
    <div>
      <h2 className="text-dark-soft text-xl font-semibold mb-3">Tags</h2>
      {blog?.tags.map((tag) => (
        <p
          key={tag}
          className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 mb-2 text-primary font-semibold"
        >
          {tag}
        </p>
      ))}
    </div>
  );
};

export default TagBar;
