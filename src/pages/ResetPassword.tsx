import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md">
        {/* Animated card container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 p-3 rounded-full">
                <svg
                  className="h-8 w-8 text-white"
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
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Create New Password
            </h2>
            <p className="text-blue-100 mt-1">
              Secure your account with a new password
            </p>
          </div>

          {/* Form section */}
          <div className="p-8 space-y-6">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <p className="text-sm text-gray-500 mt-2">
                Your new password must be different from previous used passwords
              </p>
            </div>

            <ResetPasswordForm token={token || ""} />
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Make sure to keep your password safe and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
