import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { signup, login, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: {
    usernameOrEmail: string;
    password: string;
  }) => {
    try {
      const resultAction = await dispatch(login(credentials));
      if (login.fulfilled.match(resultAction)) {
        return resultAction.payload; // Contains mfaEnabled, userId, etc.
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleVerifyMfa = async ({
    code,
    userId,
  }: {
    code: string;
    userId: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/mfa/verify",
        { code },
        { headers: { "x-user-id": userId } }
      );
      // Save token and user to localStorage, update redux state
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          accessToken: response.data.accessToken,
          userId: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
          mfaEnabled: response.data.mfaEnabled,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || error.message || "MFA failed";
    }
  };

  const handleSignup = async (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(signup(formData));
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // In useAuth.js or useAuth.ts
  const handleVerifyOtp = async ({
    otp,
    userId,
  }: {
    otp: string;
    userId: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/verify-otp",
        { otp },
        { headers: { "x-user-id": userId } }
      );
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          accessToken: response.data.accessToken,
          userId: response.data.userId,
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
          mfaEnabled: response.data.mfaEnabled,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || error.message || "OTP failed";
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated]);

  return {
    isAuthenticated,
    user,
    isLoading: loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    verifyMfa: handleVerifyMfa,
    verifyOtp: handleVerifyOtp,
  };
};
