import Link from "next/link";
import useUsers from "@/hooks/useUsers";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Credential } from "@/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorAlert from "./ErrorAlert";

const validationSchema = yup.object().shape({
  identifier: yup.string().required("Username or Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character"
    ),
});

const LoginForm = () => {
  const router = useRouter();
  const { loginUser, error, setError } = useUsers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Credential>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: Credential) => {
    loginUser(data)
      .then(() => {
        reset();
        router.push("/");
      })
      .catch((err) => {
        console.error("Error during  logging in", err);
      });
  };

  return (
    <>
      <form className="px-14 py-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="user" className="block mb-1 font-semibold">
            Username/Email
          </label>
          <input
            {...register("identifier")}
            type="text"
            id="user"
            placeholder="Enter your username or email"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.identifier && (
            <p className="text-red-600">{errors.identifier.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-200 rounded-md w-full focus:outline-none focus:border-blue-600"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="px-5 py-2 w-full border rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            Login
          </button>
        </div>
        <p className=" text-gray-800 ">
          Don&apos;t have an account
          <Link
            href="/signup"
            className="px-2 py-1 ms-2 border rounded-md font-semibold bg-gray-200 text-blue-700 hover:bg-gray-300"
          >
            Sign Up
          </Link>
        </p>
      </form>
      {error && <ErrorAlert error={error} onClick={() => setError("")} />}
    </>
  );
};

export default LoginForm;
