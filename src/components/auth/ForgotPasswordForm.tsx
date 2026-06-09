import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useApi";
import { forgotPassword } from "../../api/auth";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const { mutate, isPending, isSuccess, error } =
    useApiMutation(forgotPassword);

  const onSubmit = (data: { email: string }) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Email Sent</h2>
          <p className="text-green-100 mt-2">Check your inbox</p>
        </div>

        <div className="p-8">
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100 flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                If your email exists in our system, we've sent a password reset
                link. Please check your inbox and follow the instructions.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
            >
              ← Return to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-center">
        <h2 className="text-3xl font-bold text-white">Reset Password</h2>
        <p className="text-indigo-100 mt-2">We'll send you a recovery link</p>
      </div>
      <div className="p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {error.message}
              </h3>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`block w-full px-4 py-3 rounded-lg border ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                } shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                isPending
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all`}
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
          >
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
