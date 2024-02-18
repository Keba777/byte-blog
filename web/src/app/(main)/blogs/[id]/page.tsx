"use client";

import { useGetBlogByIdQuery, useGetBlogsQuery } from "@/store/features/blog";
import ErrorMessage from "@/components/blog/ErrorMessage";
import BlogDetail from "@/components/blogDetails/BlogDetail";
import RightBar from "@/components/blogDetails/RightBar";
import TagBar from "@/components/blogDetails/TagBar";

interface Props {
  params: { id: string };
}

const BlogDetailsPage = ({ params }: Props) => {
  let { data: blog, error, isLoading } = useGetBlogByIdQuery(params.id);
  let { data: blogs } = useGetBlogsQuery();

  return (
    <div className="lg:flex container mx-auto px-5 py-4">
      <div className="pr-10">
        {isLoading && <p>Loading...</p>}
        {error && <ErrorMessage message="Couldn't fetch the posts data" />}
        {blog && <BlogDetail blog={blog} />}
      </div>
      <div>
        <RightBar blogs={blogs} />
        <TagBar blog={blog} />
      </div>
    </div>
  );
};

export default BlogDetailsPage;
