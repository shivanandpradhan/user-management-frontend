import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * AuthGuard - Redirects authenticated users away from auth pages
 * Use this for login, signup, forgot-password pages
 */
const AuthGuard = ({ 
  children, 
  redirectTo = "/dashboard" 
}: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard (or specified path)
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If not authenticated, render the children (login/signup pages)
  return <>{children}</>;
};

export default AuthGuard;