"use client";

import { useState, useEffect } from "react";
import TagSelect from "./TagSelect";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TagOptions } from "@/data/tags";
import { Controller, useForm } from "react-hook-form";
import { BlogForm as Blog, BlogValidationSchema } from "@/types/blog/blog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { usePostBlogMutation } from "@/store/features/blog";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const BlogForm = () => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Blog>({
    resolver: yupResolver(BlogValidationSchema),
  });

  const [postBlog] = usePostBlogMutation();
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [formError, setFormError] = useState("");

  const handleTagClick = (tag: string) => {
    if (tags.includes(tag)) {
      setTags((prevTags) =>
        prevTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setTags((prevTags) => [...prevTags, tag]);
    }
    setValue("tags", tags);
  };

  useEffect(() => {
    if (user?._id) {
      setValue("author", user._id);
    }
  }, [user?._id, setValue]);

  const onSubmit = async (data: Blog) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (user?._id) formData.append("author", user._id);
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      setFormError("Image is required");
      return;
    }

    let res = await postBlog(formData);
    if ("error" in res) {
      if ("status" in res.error) {
        let errorData = res.error.data as { message: string };
        setFormError(errorData.message);
      } else {
        setFormError(res.error.message!);
      }
    } else {
      console.log("Post successful.", res.data);
      reset();
      router.push("/blogs");
    }
  };

  return (
    <div className="p-4 text-[15px] w-4/5">
      <form
        className="border border-blue-800 px-10 py-6 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("title")}
            type="text"
            placeholder="Enter your blog title..."
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-600 mb-3"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Write your content here" {...field} />
          )}
        />
        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}

        <h1 className="font-semibold mb-1">Select Tag</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          {TagOptions.map((tag) => (
            <TagSelect
              key={tag}
              tag={tag}
              isSelected={tags.includes(tag)}
              onClick={handleTagClick}
            />
          ))}
        </div>
        {errors.tags && <p className="text-red-600">{errors.tags.message}</p>}
        <div className="mb-3">
          <label htmlFor="image" className="block  font-semibold">
            Attach a Cover Image
          </label>
          <input
            {...register("image")}
            type="file"
            id="image"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.image && (
            <p className="text-red-600">{errors.image.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-md"
          >
            + POST
          </button>
        </div>
        {formError && <p className="text-red-600">{formError}</p>}
      </form>
    </div>
  );
};

export default BlogForm;
