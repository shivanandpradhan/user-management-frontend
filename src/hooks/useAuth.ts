import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { signup, login, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (credentials: {
    usernameOrEmail: string;
    password: string;
    mfaCode?: string;
  }) => {
    try {
      dispatch(login(credentials));
    } catch (err) {
      console.error("Login error:", err);
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
  };
};

// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store/store';
// import { login as loginAction, logout as logoutAction } from '../store/slices/authSlice';
// import { useNavigate } from 'react-router-dom';
// import { useApiMutation } from './useApi';
// import { login, verifyOtp } from '../api/auth';

// export const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

//   const loginMutation = useApiMutation(login, {
//     onSuccess: (data) => {
//       if (data.data.mfaEnabled) {
//         // MFA is enabled, don't dispatch login yet
//         return;
//       }
//       dispatch(loginAction(data.data));
//       navigate('/dashboard');
//     }
//   });

//   const verifyOtpMutation = useApiMutation(verifyOtp, {
//     onSuccess: (data) => {
//       dispatch(loginAction(data.data));
//       navigate('/dashboard');
//     }
//   });

//   const login = async (credentials: { usernameOrEmail: string; password: string; mfaCode?: string }) => {
//     if (credentials.mfaCode) {
//       await verifyOtpMutation.mutateAsync({
//         usernameOrEmail: credentials.usernameOrEmail,
//         otp: credentials.mfaCode
//       });
//     } else {
//       await loginMutation.mutateAsync(credentials);
//     }
//   };

//   const logout = () => {
//     dispatch(logoutAction());
//     navigate('/login');
//   };

//   return {
//     isAuthenticated,
//     user,
//     loading: loading || loginMutation.isLoading || verifyOtpMutation.isLoading,
//     error: error || loginMutation.error || verifyOtpMutation.error,
//     login,
//     logout
//   };
// };
