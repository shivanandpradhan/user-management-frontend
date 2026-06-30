import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequest } from "../../types";
import { Divider, ErrorAlert, FormInput, LoadingSpinner, PasswordInput, RememberMe } from "../common";
import MfaInput from "../common/MfaInput";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const { login, isLoading, error, verifyMfa, verifyOtp } = useAuth();

  const [showMfa, setShowMfa] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [userIdForMfa, setUserIdForMfa] = useState<string | null>(null);
  const [userIdForOtp, setUserIdForOtp] = useState<string | null>(null);
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const validation = {
    usernameOrEmail: {
      required: "Username or email is required",
    },
    password: {
      required: "Password is required",
    },
  };

  const onSubmit = async (data: LoginRequest) => {
    setMfaError(null);
    setOtpError(null);

    if (showMfa && userIdForMfa) {
      try {
        await verifyMfa({ code: mfaCode, userId: userIdForMfa });
      } catch (err: any) {
        setMfaError(err.toString());
      }
    } else if (showOtp && userIdForOtp) {
      try {
        await verifyOtp({ otp: otpCode, userId: userIdForOtp });
      } catch (err: any) {
        setOtpError(err.toString());
      }
    } else {
      try {
        const response = await login(data);
        if (response?.mfaEnabled) {
          setUserIdForMfa(response.userId);
          setShowMfa(true);
        } else if (response?.otpLoginEnabled) {
          setUserIdForOtp(response.userId);
          setShowOtp(true);
        }
      } catch (err: any) {
        // error handled by redux
      }
    }
  };

  const handleBackToLogin = () => {
    setShowMfa(false);
    setShowOtp(false);
    setMfaCode("");
    setOtpCode("");
    setUserIdForMfa(null);
    setUserIdForOtp(null);
    setMfaError(null);
    setOtpError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-indigo-100 mt-2">Sign in to your account</p>
        </div>

        <div className="p-8">
          {/* Error Display */}
          {error && !showMfa && !showOtp && <ErrorAlert message={error} />}
          {mfaError && <ErrorAlert message={mfaError} />}
          {otpError && <ErrorAlert message={otpError} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!showMfa && !showOtp ? (
              <>
                <FormInput
                  id="usernameOrEmail"
                  label="Email or Username"
                  type="text"
                  placeholder="you@example.com"
                  register={register}
                  name="usernameOrEmail"
                  validation={validation.usernameOrEmail}
                  error={errors.usernameOrEmail}
                />

                <PasswordInput
                  id="password"
                  label="Password"
                  register={register}
                  name="password"
                  validation={validation.password}
                  error={errors.password}
                />

                <div className="flex items-center justify-between">
                  <RememberMe />
                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </>
            ) : showMfa ? (
              <>
                <MfaInput
                  value={mfaCode}
                  onChange={setMfaCode}
                  label="Verification Code"
                  placeholder="123456"
                  description="Check your authenticator app for the code"
                  error={mfaError}
                />
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  ← Back to login
                </button>
              </>
            ) : (
              <>
                <MfaInput
                  value={otpCode}
                  onChange={setOtpCode}
                  label="OTP Code"
                  placeholder="Enter the OTP sent to your email"
                  description="Check your email for the OTP code"
                  error={otpError}
                />
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  ← Back to login
                </button>
              </>
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
                {isLoading ? (
                  <LoadingSpinner
                    text={showMfa ? "Verifying..." : showOtp ? "Verifying OTP..." : "Signing in..."} 
                  />
                ) : showMfa ? (
                  "Verify Code"
                ) : showOtp ? (
                  "Verify OTP"
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 space-y-4">
            <Divider text="New to our platform?" />

            <div className="text-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;