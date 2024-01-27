import SignupForm from "./components/SignupForm";

const SignupPage = () => {
  return (
    <div className="pt-4">
      <div className="mx-auto w-1/3 border border-solid border-blue-600 rounded-2xl">
        <h2 className="text-center text-3xl font-bold mt-5 text-blue-600">
          Sign Up
        </h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
