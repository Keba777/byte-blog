import * as yup from "yup";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
    profilePicture?: string;
  };
  tags: string[];
  likes: number;
  updateAt: Date;
  image: string;
}

export interface BlogForm {
  title: string;
  content: string;
  author: string;
  tags: string[];
  image?: FileList;
}

export const BlogValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters."),
  author: yup.string().required("Author is required"),
  tags: yup
    .array(yup.string().required("Tag is required"))
    .required("Tags are required"),
  image: yup.mixed(),
});
