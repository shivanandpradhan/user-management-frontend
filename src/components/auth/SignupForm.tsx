import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  FormInput,
  PasswordInput,
  ErrorAlert,
  LoadingSpinner,
  Divider,
} from "../common";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  terms?: boolean;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const { signup, error, isLoading } = useAuth();

  const onSubmit = (data: SignupFormData) => {
    const { terms, ...signupData } = data;
    signup(signupData);
  };

  const validation = {
    username: {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="text-indigo-100 mt-2">Join our platform today</p>
        </div>

        <div className="p-8">
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              id="username"
              label="Username"
              type="text"
              placeholder="john_doe"
              register={register}
              name="username"
              validation={validation.username}
              error={errors.username}
            />

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              register={register}
              name="email"
              validation={validation.email}
              error={errors.email}
            />

            <PasswordInput
              id="password"
              label="Password"
              register={register}
              name="password"
              validation={validation.password}
              error={errors.password}
              showRequirements={true}
            />

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 -mt-4">
                {errors.terms.message}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 transform hover:scale-[1.02]"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all`}
              >
                {isLoading ? <LoadingSpinner text="Creating account..." /> : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-4">
            <Divider text="Already have an account?" />

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;