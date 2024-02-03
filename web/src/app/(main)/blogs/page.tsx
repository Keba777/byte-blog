import React from "react";
import Link from "next/link";

const BlogPage = () => {
  return (
    <div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2">
        <Link href="/blogs/new">New Blog</Link>
      </button>
    </div>
  );
};

export default BlogPage;
