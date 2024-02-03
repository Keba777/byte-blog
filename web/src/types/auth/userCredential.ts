import * as yup from "yup";
interface UserCredential {
  identifier: string;
  password: string;
}


export interface UserResponse {
  token: string;
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
}

export const CredentialValidationSchema = yup.object().shape({
  identifier: yup.string().required("Username or Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(26, "Password must be at most 26 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character"
    ),
});

export default UserCredential;
