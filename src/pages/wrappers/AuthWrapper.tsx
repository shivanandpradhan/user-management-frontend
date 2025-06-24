import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkPath?: string;
}

const AuthWrapper = ({
  children,
  title,
  subtitle,
  footerLinkText,
  footerLinkPath,
}: AuthWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-white">
      {/* Left side - Branding/Illustration */}
      <div className="w-full md:w-1/2 lg:w-3/5 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Link to="/" className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
            <span className="text-2xl font-bold">UserHub</span>
          </Link>

          <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
          <p className="text-lg text-indigo-100 mb-8">
            Streamline your workflow with our powerful user management platform.
          </p>

          <div className="space-y-4">
            {[
              "Secure authentication",
              "Role-based access control",
              "Real-time analytics",
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-white/5"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-white/10"></div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-gray-600">
                {subtitle}{" "}
                {footerLinkText && footerLinkPath && (
                  <Link
                    to={footerLinkPath}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {footerLinkText}
                  </Link>
                )}
              </p>
            )}
          </div>

          {children}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} UserHub. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link to="/privacy" className="hover:text-gray-700">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-gray-700">
                Terms
              </Link>
              <Link to="/contact" className="hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
