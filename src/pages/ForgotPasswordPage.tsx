import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Header Section */}
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Password Recovery
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Form Container */}
        <div className="py-8 px-6 rounded-lg sm:px-10">
          <ForgotPasswordForm />

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              ← Return to sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          Need help?{" "}
          <span className="text-blue-600 cursor-pointer">Contact support</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
