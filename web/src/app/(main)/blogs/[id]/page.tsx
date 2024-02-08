"use client";

import { useGetBlogByIdQuery } from "@/store/features/blog";
import ErrorMessage from "@/components/blog/ErrorMessage";
import BlogDetail from "@/components/blogDetails/BlogDetail";

interface Props {
  params: { id: string };
}

const BlogDetailsPage = ({ params }: Props) => {
  let { data: blog, error, isLoading } = useGetBlogByIdQuery(params.id);

  return (
    <section className="container mx-auto relative">
      {isLoading && <p>Loading...</p>}
      {error && <ErrorMessage message="Couldn't fetch the posts data" />}
      {blog && <BlogDetail blog={blog} />}
    </section>
  );
};

export default BlogDetailsPage;
