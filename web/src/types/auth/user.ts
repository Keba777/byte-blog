import * as yup from "yup";

interface User {
  username: string;
  email: string;
  password: string;
  profilePicture?: FileList;
}

export const UserValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(26, "Password must be at most 26 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character"
    ),
  profilePicture: yup.mixed(),
});

export default User;
