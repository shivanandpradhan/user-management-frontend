import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const { login, isLoading, error } = useAuth();
  const [showMfa, setShowMfa] = useState(false);
  const [mfaCode, setMfaCode] = useState("");

  const onSubmit = async (data: LoginRequest) => {
    if (showMfa) {
      await login({ ...data, mfaCode });
    } else {
      await login(data);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="usernameOrEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Username or Email
          </label>
          <input
            id="usernameOrEmail"
            type="text"
            {...register("usernameOrEmail", {
              required: "Username or email is required",
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.usernameOrEmail && (
            <p className="mt-1 text-sm text-red-600">
              {errors.usernameOrEmail.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {showMfa && (
          <div className="mb-4">
            <label
              htmlFor="mfaCode"
              className="block text-sm font-medium text-gray-700"
            >
              MFA Code
            </label>
            <input
              id="mfaCode"
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <a href="/signup" className="text-indigo-600 hover:text-indigo-500">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
